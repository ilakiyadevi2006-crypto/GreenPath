import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { db, StoredUser, StoredCertificate, StoredEnrollment } from './src/db/storage';
import { COURSE_QUIZZES } from './src/data/quizzes';
import { LEARNING_PATHS } from './src/data/courses';
import {
  GREEN_IT_FINAL_ASSESSMENT_META,
  GREEN_IT_FINAL_ASSESSMENT_SERVER_QUESTIONS,
  getClientAssessmentQuestions
} from './src/data/greenItFinalAssessmentData';
import { GREEN_IT_CHAPTERS } from './src/data/greenItChapters';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Helper to extract authenticated user from Bearer token
function getAuthUser(req: express.Request): StoredUser | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7).trim();
  const userId = db.getUserIdByToken(token);
  if (!userId) {
    return null;
  }
  const user = db.getUserById(userId);
  return user || null;
}

// -------------------------------------------------------------
// Authentication Endpoints (Real Data Only)
// -------------------------------------------------------------

app.post('/api/auth/register', (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email address already exists.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const userId = `usr_${crypto.randomBytes(8).toString('hex')}`;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  const newUser: StoredUser = {
    id: userId,
    email: email.trim().toLowerCase(),
    passwordHash,
    fullName: fullName.trim(),
    createdAt: new Date().toISOString()
  };

  db.createUser(newUser);

  const token = crypto.randomBytes(32).toString('hex');
  db.createSession(token, newUser.id);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      createdAt: newUser.createdAt
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
  }

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  if (user.passwordHash !== passwordHash) {
    return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  db.createSession(token, user.id);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    db.deleteSession(token);
  }
  res.json({ success: true });
});

// -------------------------------------------------------------
// Real User Learning Enrollments & Progress Endpoints
// -------------------------------------------------------------

app.get('/api/user/dashboard', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required to view learning dashboard.' });
  }

  const enrollments = db.getEnrollmentsByUser(user.id);
  const certificates = db.getCertificatesByUser(user.id);
  const activities = db.getActivitiesByUser(user.id);

  let totalCompletedLessons = 0;
  let totalPassedQuizzes = 0;
  for (const enr of enrollments) {
    totalCompletedLessons += enr.completedLessons.length;
    if (enr.quizResult && enr.quizResult.passed) {
      totalPassedQuizzes += 1;
    }
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt
    },
    enrollments,
    certificates,
    activities,
    metrics: {
      enrolledCount: enrollments.length,
      completedLessonsCount: totalCompletedLessons,
      passedQuizzesCount: totalPassedQuizzes,
      certificatesCount: certificates.length
    }
  });
});

app.get('/api/user/enrollments', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required to view learning progress.' });
  }

  const enrollments = db.getEnrollmentsByUser(user.id);
  const certificates = db.getCertificatesByUser(user.id);
  const activities = db.getActivitiesByUser(user.id);

  res.json({
    enrollments,
    certificates,
    activities
  });
});

app.post('/api/user/enroll', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Please sign in or create an account to enroll.' });
  }

  const { courseId, courseTitle } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: 'Course ID is required.' });
  }

  const existing = db.getEnrollment(user.id, courseId);
  if (existing) {
    return res.json({ enrollment: existing, message: 'Already enrolled.' });
  }

  const newEnrollment: StoredEnrollment = {
    id: `enr_${crypto.randomBytes(8).toString('hex')}`,
    userId: user.id,
    courseId,
    enrolledAt: new Date().toISOString(),
    completedLessons: []
  };

  db.saveEnrollment(newEnrollment);

  db.addActivity({
    id: `act_${crypto.randomBytes(8).toString('hex')}`,
    userId: user.id,
    courseId,
    courseTitle: courseTitle || courseId,
    type: 'enrolled',
    title: `Enrolled in ${courseTitle || courseId}`,
    description: 'Began new learning path',
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ enrollment: newEnrollment });
});

app.post('/api/user/progress/lesson', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { courseId, lessonId, lessonTitle, courseTitle } = req.body;
  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'Both courseId and lessonId are required.' });
  }

  let enrollment = db.getEnrollment(user.id, courseId);
  const isNewCompletion = !enrollment || !enrollment.completedLessons.includes(lessonId);

  if (!enrollment) {
    enrollment = {
      id: `enr_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessons: [lessonId]
    };
  } else {
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }
  }

  db.saveEnrollment(enrollment);

  if (isNewCompletion) {
    db.addActivity({
      id: `act_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      courseTitle: courseTitle || courseId,
      type: 'lesson_completed',
      title: `Completed: ${lessonTitle || lessonId}`,
      description: 'Finished chapter study materials & exercises',
      timestamp: new Date().toISOString()
    });
  }

  res.json({ enrollment });
});

app.post('/api/user/progress/quiz', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { courseId, answers, courseTitle } = req.body;
  if (!courseId || !answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid quiz submission data.' });
  }

  const quiz = COURSE_QUIZZES[courseId];
  if (!quiz) {
    return res.status(404).json({ error: 'No verified quiz exists for this course.' });
  }

  let correctCount = 0;
  const totalQuestions = quiz.questions.length;
  const resultsDetail = quiz.questions.map(q => {
    const userAnswerIndex = answers[q.id];
    const isCorrect = userAnswerIndex === q.correctAnswerIndex;
    if (isCorrect) correctCount++;
    return {
      questionId: q.id,
      correct: isCorrect,
      correctAnswerIndex: q.correctAnswerIndex,
      explanation: q.explanation
    };
  });

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScorePercent;

  let enrollment = db.getEnrollment(user.id, courseId);
  if (!enrollment) {
    enrollment = {
      id: `enr_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessons: []
    };
  }

  enrollment.quizResult = {
    passed,
    scorePercent,
    correctCount,
    totalQuestions,
    completedAt: new Date().toISOString()
  };

  db.saveEnrollment(enrollment);

  db.addActivity({
    id: `act_${crypto.randomBytes(8).toString('hex')}`,
    userId: user.id,
    courseId,
    courseTitle: courseTitle || quiz.title,
    type: passed ? 'quiz_passed' : 'quiz_attempted',
    title: passed ? `Passed Assessment: ${quiz.title}` : `Attempted Assessment: ${quiz.title}`,
    description: passed ? `Scored ${scorePercent}% (Passed)` : `Scored ${scorePercent}% (80% needed to pass)`,
    timestamp: new Date().toISOString()
  });

  res.json({
    passed,
    scorePercent,
    correctCount,
    totalQuestions,
    passingScorePercent: quiz.passingScorePercent,
    resultsDetail
  });
});

app.post('/api/user/progress/chapter-quiz', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { courseId, chapterId, chapterTitle, passed, scorePercent, correctCount, totalQuestions } = req.body;
  if (!courseId || !chapterId) {
    return res.status(400).json({ error: 'courseId and chapterId are required.' });
  }

  let enrollment = db.getEnrollment(user.id, courseId);
  if (!enrollment) {
    enrollment = {
      id: `enr_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessons: [],
      chapterQuizResults: {}
    };
  }

  if (!enrollment.chapterQuizResults) {
    enrollment.chapterQuizResults = {};
  }

  enrollment.chapterQuizResults[chapterId] = {
    passed: Boolean(passed),
    scorePercent: Number(scorePercent) || 0,
    correctCount: Number(correctCount) || 0,
    totalQuestions: Number(totalQuestions) || 0,
    completedAt: new Date().toISOString()
  };

  db.saveEnrollment(enrollment);

  if (passed) {
    db.addActivity({
      id: `act_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      courseTitle: courseId,
      type: 'quiz_passed',
      title: `Passed Chapter Quiz: ${chapterTitle || chapterId}`,
      description: `Scored ${scorePercent}% on chapter assessment`,
      timestamp: new Date().toISOString()
    });
  }

  res.json({ enrollment });
});

// -------------------------------------------------------------
// Final Assessment: Green IT Fundamentals (60 Marks)
// -------------------------------------------------------------

app.get('/api/courses/:courseId/final-assessment', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required to access final assessment.' });
  }

  const { courseId } = req.params;
  const enrollment = db.getEnrollment(user.id, courseId);
  if (!enrollment) {
    return res.status(403).json({ error: 'You are not enrolled in this course.' });
  }

  if (courseId === 'green-it' || courseId === 'green-it-fundamentals') {
    const requiredChapterIds = GREEN_IT_CHAPTERS.map(ch => ch.id);
    const completedChapters = requiredChapterIds.filter(id => enrollment.completedLessons.includes(id));
    const allQuizzesPassed = requiredChapterIds.every(id => enrollment.chapterQuizResults?.[id]?.passed);

    if (completedChapters.length < requiredChapterIds.length || !allQuizzesPassed) {
      return res.status(403).json({
        locked: true,
        reason: 'The Final Assessment remains locked until all six chapters have been completed and their chapter quizzes passed with at least 80%.',
        completedCount: completedChapters.length,
        requiredCount: requiredChapterIds.length,
        allQuizzesPassed
      });
    }

    return res.json({
      locked: false,
      assessment: {
        ...GREEN_IT_FINAL_ASSESSMENT_META,
        questions: getClientAssessmentQuestions()
      },
      previousAttempts: enrollment.finalAssessment?.attempts || [],
      bestScoreMarks: enrollment.finalAssessment?.bestScoreMarks || 0,
      bestScorePercent: enrollment.finalAssessment?.bestScorePercent || 0,
      passed: Boolean(enrollment.finalAssessment?.passed)
    });
  }

  res.status(404).json({ error: 'Final assessment not available for this course.' });
});

app.post('/api/courses/:courseId/final-assessment/submit', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { courseId } = req.params;
  const { answers } = req.body;

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid assessment submission data.' });
  }

  let enrollment = db.getEnrollment(user.id, courseId);
  if (!enrollment) {
    return res.status(403).json({ error: 'You are not enrolled in this course.' });
  }

  if (courseId === 'green-it' || courseId === 'green-it-fundamentals') {
    const requiredChapterIds = GREEN_IT_CHAPTERS.map(ch => ch.id);
    const completedChapters = requiredChapterIds.filter(id => enrollment.completedLessons.includes(id));
    const allQuizzesPassed = requiredChapterIds.every(id => enrollment.chapterQuizResults?.[id]?.passed);

    if (completedChapters.length < requiredChapterIds.length || !allQuizzesPassed) {
      return res.status(403).json({
        error: 'Final assessment is locked. You must complete all six chapters and pass their quizzes before submitting the final assessment.'
      });
    }

    const questions = GREEN_IT_FINAL_ASSESSMENT_SERVER_QUESTIONS;
    let correctCount = 0;
    const totalQuestions = questions.length; // 30
    const marksPerQuestion = 2;
    const maxMarks = 60;

    // Track chapter performance
    const chapterStats: Record<number, { chapterTitle: string; correct: number; total: number }> = {};
    for (let i = 1; i <= 6; i++) {
      const ch = GREEN_IT_CHAPTERS.find(c => c.chapterNumber === i);
      chapterStats[i] = {
        chapterTitle: ch ? ch.title : `Chapter ${i}`,
        correct: 0,
        total: 0
      };
    }

    const resultsDetail = questions.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      if (chapterStats[q.chapterNumber]) {
        chapterStats[q.chapterNumber].total++;
        if (isCorrect) chapterStats[q.chapterNumber].correct++;
      }

      return {
        questionId: q.id,
        userAnswerIndex: userAnswer !== undefined ? userAnswer : null,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        chapterNumber: q.chapterNumber,
        chapterTitle: q.chapterTitle,
        explanation: q.explanation
      };
    });

    const scoreMarks = correctCount * marksPerQuestion; // out of 60
    const scorePercent = Math.round((scoreMarks / maxMarks) * 100);
    const passed = scoreMarks >= 48; // minimum 48 marks out of 60 (80%)

    // Topic improvement explanations
    const chapterFeedback = Object.entries(chapterStats).map(([chNum, stat]) => {
      const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      const needsImprovement = pct < 80;
      return {
        chapterNumber: Number(chNum),
        chapterTitle: stat.chapterTitle,
        correct: stat.correct,
        total: stat.total,
        percentage: pct,
        needsImprovement,
        recommendation: needsImprovement
          ? `Review ${stat.chapterTitle} study material to strengthen understanding.`
          : `Demonstrated strong proficiency in ${stat.chapterTitle}.`
      };
    });

    // Save attempt record
    if (!enrollment.finalAssessment) {
      enrollment.finalAssessment = {
        attemptsCount: 0,
        bestScoreMarks: 0,
        bestScorePercent: 0,
        passed: false,
        lastAttemptAt: new Date().toISOString(),
        attempts: []
      };
    }

    enrollment.finalAssessment.attemptsCount = (enrollment.finalAssessment.attemptsCount || 0) + 1;
    enrollment.finalAssessment.lastAttemptAt = new Date().toISOString();
    enrollment.finalAssessment.bestScoreMarks = Math.max(enrollment.finalAssessment.bestScoreMarks || 0, scoreMarks);
    enrollment.finalAssessment.bestScorePercent = Math.max(enrollment.finalAssessment.bestScorePercent || 0, scorePercent);
    if (passed) {
      enrollment.finalAssessment.passed = true;
    }

    if (!enrollment.finalAssessment.attempts) {
      enrollment.finalAssessment.attempts = [];
    }
    enrollment.finalAssessment.attempts.push({
      attemptNumber: enrollment.finalAssessment.attemptsCount,
      scoreMarks,
      totalMarks: maxMarks,
      scorePercent,
      passed,
      completedAt: new Date().toISOString()
    });

    // Update overall course quizResult if passed
    if (passed) {
      enrollment.quizResult = {
        passed: true,
        scorePercent,
        scoreMarks,
        totalMarks: maxMarks,
        correctCount,
        totalQuestions,
        completedAt: new Date().toISOString()
      };
    }

    db.saveEnrollment(enrollment);

    db.addActivity({
      id: `act_${crypto.randomBytes(8).toString('hex')}`,
      userId: user.id,
      courseId,
      courseTitle: 'Green IT Fundamentals',
      type: passed ? 'quiz_passed' : 'quiz_attempted',
      title: passed ? 'Passed Green IT Final Assessment' : 'Attempted Green IT Final Assessment',
      description: passed
        ? `Achieved ${scoreMarks}/60 marks (${scorePercent}%) - Passed`
        : `Scored ${scoreMarks}/60 marks (${scorePercent}%) - 48/60 required to pass`,
      timestamp: new Date().toISOString()
    });

    return res.json({
      passed,
      scoreMarks,
      maxMarks,
      scorePercent,
      minPassingMarks: 48,
      correctCount,
      totalQuestions,
      resultsDetail,
      chapterFeedback,
      attemptsCount: enrollment.finalAssessment.attemptsCount,
      bestScoreMarks: enrollment.finalAssessment.bestScoreMarks
    });
  }

  res.status(400).json({ error: 'Final assessment not available for this course.' });
});

// -------------------------------------------------------------
// Real Verifiable Certificate Generation & Verification Endpoints
// -------------------------------------------------------------

app.post('/api/user/certificate/claim', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { courseId, courseTitle, totalLessonsCount } = req.body;
  if (!courseId || !courseTitle || typeof totalLessonsCount !== 'number') {
    return res.status(400).json({ error: 'Invalid certificate claim request.' });
  }

  const enrollment = db.getEnrollment(user.id, courseId);
  if (!enrollment) {
    return res.status(400).json({ error: 'You are not enrolled in this course.' });
  }

  // Verify that all lessons / chapters were actually completed
  if (enrollment.completedLessons.length < totalLessonsCount) {
    return res.status(400).json({
      error: `Course incomplete. You have finished ${enrollment.completedLessons.length} of ${totalLessonsCount} required chapters.`
    });
  }

  // Verify that final assessment or quiz was passed with at least 80% (>= 48/60)
  if (!enrollment.quizResult || !enrollment.quizResult.passed || enrollment.quizResult.scorePercent < 80) {
    return res.status(400).json({
      error: 'You must pass the comprehensive course final assessment with at least 80% (minimum 48/60 marks) to claim this certificate.'
    });
  }

  if (enrollment.certificateClaimedId) {
    const existingCert = db.getCertificateById(enrollment.certificateClaimedId);
    if (existingCert) {
      // Ensure existing certificate matches current user
      if (existingCert.userId === user.id) {
        return res.json({ certificate: existingCert, message: 'Certificate already issued.' });
      }
    }
  }

  // Issue real verifiable certificate with cryptographic identifier and authenticated learner full name
  const isGreenIt = courseId === 'green-it' || courseId === 'green-it-fundamentals';
  const prefix = isGreenIt ? 'GP-2026-GIT' : 'GP-2026';
  const certId = `${prefix}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  const scoreMarks = enrollment.quizResult.scoreMarks !== undefined
    ? enrollment.quizResult.scoreMarks
    : Math.round((enrollment.quizResult.scorePercent / 100) * 60);

  const standards = isGreenIt
    ? [
        'Green Software Foundation SCI Specification (ISO/IEC 21031)',
        'Energy Star 8.0 & 80 PLUS Power Supply Efficiency Standards',
        'e-Stewards & R2v3 IT Asset Disposition Circular Standards',
        'The Green Grid PUE Data Center Metric (ISO/IEC 30134-2)'
      ]
    : [
        'GHG Protocol Corporate Standard (WRI / WBCSD)',
        'ISO 14064-1:2018 Specification for GHG Quantifications',
        'GreenPath Technical Assessment Defense Verification'
      ];

  const newCertificate: StoredCertificate = {
    id: certId,
    userId: user.id,
    learnerName: user.fullName, // MUST be registered full name from user profile
    courseId,
    courseTitle: isGreenIt ? 'Green IT Fundamentals' : courseTitle,
    issuedAt: new Date().toISOString(),
    scorePercent: enrollment.quizResult.scorePercent,
    scoreMarks,
    totalMarks: enrollment.quizResult.totalMarks || 60,
    standardsVerified: standards
  };

  db.saveCertificate(newCertificate);
  enrollment.certificateClaimedId = certId;
  db.saveEnrollment(enrollment);

  db.addActivity({
    id: `act_${crypto.randomBytes(8).toString('hex')}`,
    userId: user.id,
    courseId,
    courseTitle: isGreenIt ? 'Green IT Fundamentals' : courseTitle,
    type: 'certificate_earned',
    title: `Earned Credential: ${isGreenIt ? 'Green IT Fundamentals' : courseTitle}`,
    description: `Credential ID: ${certId} verified and recorded with score ${scoreMarks}/60 (${enrollment.quizResult.scorePercent}%)`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ certificate: newCertificate });
});

// Verification lookup for public audit (rejection of fake credentials; no private info leak)
app.get('/api/certificates/:id', (req, res) => {
  const { id } = req.params;
  const cert = db.getCertificateById(id);
  if (!cert) {
    return res.status(404).json({
      found: false,
      error: `No authentic credential found for ID: ${id}. Only certificates earned through actual completed coursework and passed assessments are valid.`
    });
  }

  // Return public credential verification without exposing private email or user ID
  res.json({
    found: true,
    certificate: {
      id: cert.id,
      learnerName: cert.learnerName,
      courseId: cert.courseId,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt,
      scorePercent: cert.scorePercent,
      scoreMarks: cert.scoreMarks,
      totalMarks: cert.totalMarks,
      standardsVerified: cert.standardsVerified
    }
  });
});

// -------------------------------------------------------------
// Real User Notes & Bookmarks Endpoints
// -------------------------------------------------------------

app.get('/api/user/notes', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const courseId = req.query.courseId as string | undefined;
  const notes = db.getNotes(user.id, courseId);
  res.json({ notes });
});

app.post('/api/user/notes', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const { courseId, lessonId, content } = req.body;
  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'Missing courseId or lessonId' });
  }
  const note = {
    id: `note_${crypto.randomBytes(6).toString('hex')}`,
    userId: user.id,
    courseId,
    lessonId,
    content: content || '',
    updatedAt: new Date().toISOString()
  };
  db.saveNote(note);
  res.json({ success: true, note });
});

app.delete('/api/user/notes', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const { courseId, lessonId } = req.body;
  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'Missing courseId or lessonId' });
  }
  db.deleteNote(user.id, courseId, lessonId);
  res.json({ success: true });
});

app.get('/api/user/bookmarks', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const bookmarks = db.getBookmarks(user.id);
  res.json({ bookmarks });
});

app.post('/api/user/bookmarks/toggle', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const { courseId, lessonId, lessonTitle } = req.body;
  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'Missing courseId or lessonId' });
  }
  const isBookmarked = db.toggleBookmark({
    id: `bm_${crypto.randomBytes(6).toString('hex')}`,
    userId: user.id,
    courseId,
    lessonId,
    lessonTitle: lessonTitle || lessonId,
    createdAt: new Date().toISOString()
  });
  res.json({ success: true, isBookmarked });
});

// -------------------------------------------------------------
// Real User Learning Goals
// -------------------------------------------------------------

app.get('/api/user/goals', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const goal = db.getLearningGoal(user.id) || {
    userId: user.id,
    weeklyHours: 4,
    targetTrackId: '',
    targetDate: '',
    updatedAt: new Date().toISOString()
  };
  res.json({ goal });
});

app.post('/api/user/goals', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const { weeklyHours, targetTrackId, targetDate } = req.body;
  const goal = {
    userId: user.id,
    weeklyHours: Number(weeklyHours) || 4,
    targetTrackId: targetTrackId || '',
    targetDate: targetDate || '',
    updatedAt: new Date().toISOString()
  };
  db.saveLearningGoal(goal);
  res.json({ success: true, goal });
});

// -------------------------------------------------------------
// Course Catalog with Admin Overrides
// -------------------------------------------------------------

app.get('/api/courses/catalog', (_req, res) => {
  const overrides = db.getCourseOverrides();
  const courses = LEARNING_PATHS.map(c => {
    const override = overrides.find(o => o.courseId === c.id);
    if (!override) return c;
    return {
      ...c,
      isAvailable: override.isAvailable !== undefined ? override.isAvailable : c.isAvailable,
      summary: override.summary || c.summary,
      comingSoonMessage: override.comingSoonMessage || c.comingSoonMessage,
      customVideoUrl: override.customVideoUrl || (c as any).customVideoUrl
    };
  });
  res.json({ courses });
});

// -------------------------------------------------------------
// Admin Workspace Endpoints (Protected)
// -------------------------------------------------------------

function isAdminAuthorized(req: express.Request): boolean {
  const configuredAdminKey = process.env.ADMIN_SECRET_KEY;
  const adminKey = req.headers['x-admin-key'];
  if (configuredAdminKey && adminKey && adminKey === configuredAdminKey) return true;
  const user = getAuthUser(req);
  if (user && user.email.toLowerCase().endsWith('@greenpath.org')) {
    return true;
  }
  return false;
}

app.get('/api/admin/overview', (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized: Admin passkey or administrative credentials required.' });
  }

  const users = db.getAllUsers();
  const certificates = db.getAllCertificates();
  const enrollments = db.getAllEnrollments();
  const overrides = db.getCourseOverrides();

  res.json({
    authorized: true,
    stats: {
      registeredLearnersCount: users.length,
      activeEnrollmentsCount: enrollments.length,
      issuedCertificatesCount: certificates.length,
      totalCourseTracks: LEARNING_PATHS.length
    },
    users,
    certificates,
    enrollments,
    overrides
  });
});

app.patch('/api/admin/courses/:id', (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized: Admin passkey required.' });
  }

  const { id } = req.params;
  const { isAvailable, comingSoonMessage, summary, customVideoUrl } = req.body;

  db.saveCourseOverride({
    courseId: id,
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : undefined,
    comingSoonMessage,
    summary,
    customVideoUrl,
    updatedAt: new Date().toISOString()
  });

  res.json({ success: true, message: `Course ${id} configuration updated successfully.` });
});

app.put('/api/admin/quizzes/:courseId', (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized: Admin passkey required.' });
  }

  const { courseId } = req.params;
  const { passingScorePercent, questions } = req.body;

  if (typeof passingScorePercent !== 'number' || passingScorePercent < 50 || passingScorePercent > 100) {
    return res.status(400).json({ error: 'Passing score percent must be between 50 and 100.' });
  }

  db.saveQuizOverride(courseId, { passingScorePercent, questions });
  res.json({ success: true, message: `Assessment parameters for ${courseId} updated.` });
});

// -------------------------------------------------------------
// Real EcoMentor AI Endpoint with Honest Service Handling
// -------------------------------------------------------------

app.post('/api/ai/chat', async (req, res) => {
  const { prompt, userContext, currentLesson, action } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.json({
      configured: false,
      error: 'EcoMentor AI service is currently not configured with a valid Gemini API key in the environment. Set GEMINI_API_KEY to enable live real-time climate AI tutoring.'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    let contextSnippet = '';
    if (userContext && typeof userContext === 'object') {
      contextSnippet += `\nLearner Active Context: Enrolled Course: ${userContext.activeCourse || 'None'}, Completed Lessons: ${userContext.completedLessonsCount || 0}.`;
    }

    if (currentLesson && typeof currentLesson === 'object') {
      contextSnippet += `\nCurrent Active Lesson: "${currentLesson.title}".\nSummary: ${currentLesson.summary || 'N/A'}.\nRelevant Standards: ${(currentLesson.keyStandards || []).join(', ')}.\nTechnical Focus: ${(currentLesson.technicalPoints || []).join('; ')}.`;
    }

    if (action === 'simplify') {
      contextSnippet += `\nInstruction: Explain this concept in clear, accessible language using intuitive engineering analogies, while keeping international standards accurate.`;
    } else if (action === 'practice_question') {
      contextSnippet += `\nInstruction: Generate a single rigorous, realistic practice multiple-choice question testing the current lesson concepts, with 4 options (A-D), specify the correct option, and provide a clear explanation.`;
    }

    const systemInstruction = `You are EcoMentor AI, the dedicated climate engineering and sustainability advisor on the GreenPath learning platform.
You adhere strictly to verified climate science, the GHG Protocol Corporate Standard, ISO 14064, IEEE 1547 clean grid standards, CSRD ESRS, and circular economy principles.
DO NOT invent citations, fake statistics, or unverified claims.
Provide accurate, step-by-step engineering explanations and calculations.
Keep responses focused, rigorous, and professional.${contextSnippet}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    res.json({
      configured: true,
      text: response.text
    });
  } catch (err: any) {
    console.error('Gemini API Error in EcoMentor:', err);
    res.status(500).json({
      configured: true,
      error: `AI Service Error: ${err.message || 'Unable to generate response from Gemini API.'}`
    });
  }
});


// -------------------------------------------------------------
// Dev & Production Server Handling
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GreenPath Full-Stack server running on port ${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
