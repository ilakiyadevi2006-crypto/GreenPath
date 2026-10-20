import fs from 'fs';
import path from 'path';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  createdAt: string;
}

export interface StoredLessonProgress {
  lessonId: string;
  completedAt: string;
}

export interface StoredQuizResult {
  passed: boolean;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
}

export interface StoredEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedLessons: string[];
  currentLessonId?: string;
  chapterQuizResults?: Record<string, StoredQuizResult>;
  quizResult?: StoredQuizResult;
  certificateClaimedId?: string;
}

export interface StoredCertificate {
  id: string;
  userId: string;
  learnerName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  scorePercent: number;
  standardsVerified: string[];
}

export interface StoredActivity {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  type: 'enrolled' | 'lesson_completed' | 'quiz_passed' | 'quiz_attempted' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: string;
}

export interface StoredNote {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  content: string;
  updatedAt: string;
}

export interface StoredBookmark {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: string;
}

export interface StoredLearningGoal {
  userId: string;
  weeklyHours: number;
  targetTrackId?: string;
  targetDate?: string;
  updatedAt: string;
}

export interface StoredCourseOverride {
  courseId: string;
  isAvailable?: boolean;
  comingSoonMessage?: string;
  summary?: string;
  customVideoUrl?: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  users: StoredUser[];
  sessions: { token: string; userId: string; createdAt: string }[];
  enrollments: StoredEnrollment[];
  certificates: StoredCertificate[];
  activities: StoredActivity[];
  notes: StoredNote[];
  bookmarks: StoredBookmark[];
  learningGoals: StoredLearningGoal[];
  courseOverrides: StoredCourseOverride[];
  quizOverrides: Record<string, any>;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_DB: DatabaseSchema = {
  users: [],
  sessions: [],
  enrollments: [],
  certificates: [],
  activities: [],
  notes: [],
  bookmarks: [],
  learningGoals: [],
  courseOverrides: [],
  quizOverrides: {}
};

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.activities) parsed.activities = [];
    if (!parsed.notes) parsed.notes = [];
    if (!parsed.bookmarks) parsed.bookmarks = [];
    if (!parsed.learningGoals) parsed.learningGoals = [];
    if (!parsed.courseOverrides) parsed.courseOverrides = [];
    if (!parsed.quizOverrides) parsed.quizOverrides = {};
    return parsed;
  } catch (err) {
    console.error('Error reading database file, restoring empty database structure:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
}

function writeDb(data: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getUserByEmail(email: string): StoredUser | undefined {
    const data = ensureDbFile();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  getUserById(id: string): StoredUser | undefined {
    const data = ensureDbFile();
    return data.users.find(u => u.id === id);
  },
  createUser(user: StoredUser) {
    const data = ensureDbFile();
    data.users.push(user);
    writeDb(data);
  },
  createSession(token: string, userId: string) {
    const data = ensureDbFile();
    data.sessions.push({ token, userId, createdAt: new Date().toISOString() });
    writeDb(data);
  },
  getUserIdByToken(token: string): string | undefined {
    const data = ensureDbFile();
    const session = data.sessions.find(s => s.token === token);
    return session?.userId;
  },
  deleteSession(token: string) {
    const data = ensureDbFile();
    data.sessions = data.sessions.filter(s => s.token !== token);
    writeDb(data);
  },
  getEnrollmentsByUser(userId: string): StoredEnrollment[] {
    const data = ensureDbFile();
    return data.enrollments.filter(e => e.userId === userId);
  },
  getEnrollment(userId: string, courseId: string): StoredEnrollment | undefined {
    const data = ensureDbFile();
    return data.enrollments.find(e => e.userId === userId && e.courseId === courseId);
  },
  saveEnrollment(enrollment: StoredEnrollment) {
    const data = ensureDbFile();
    const index = data.enrollments.findIndex(e => e.id === enrollment.id);
    if (index >= 0) {
      data.enrollments[index] = enrollment;
    } else {
      data.enrollments.push(enrollment);
    }
    writeDb(data);
  },
  saveCertificate(cert: StoredCertificate) {
    const data = ensureDbFile();
    data.certificates.push(cert);
    writeDb(data);
  },
  getCertificateById(id: string): StoredCertificate | undefined {
    const data = ensureDbFile();
    return data.certificates.find(c => c.id.toLowerCase() === id.toLowerCase());
  },
  getCertificatesByUser(userId: string): StoredCertificate[] {
    const data = ensureDbFile();
    return data.certificates.filter(c => c.userId === userId);
  },
  addActivity(activity: StoredActivity) {
    const data = ensureDbFile();
    data.activities.unshift(activity);
    if (data.activities.length > 200) {
      data.activities = data.activities.slice(0, 200);
    }
    writeDb(data);
  },
  getActivitiesByUser(userId: string): StoredActivity[] {
    const data = ensureDbFile();
    return data.activities.filter(a => a.userId === userId);
  },
  // Notes
  getNotes(userId: string, courseId?: string): StoredNote[] {
    const data = ensureDbFile();
    return data.notes.filter(n => n.userId === userId && (!courseId || n.courseId === courseId));
  },
  saveNote(note: StoredNote) {
    const data = ensureDbFile();
    const existingIndex = data.notes.findIndex(n => n.userId === note.userId && n.courseId === note.courseId && n.lessonId === note.lessonId);
    if (existingIndex >= 0) {
      data.notes[existingIndex] = note;
    } else {
      data.notes.push(note);
    }
    writeDb(data);
  },
  deleteNote(userId: string, courseId: string, lessonId: string) {
    const data = ensureDbFile();
    data.notes = data.notes.filter(n => !(n.userId === userId && n.courseId === courseId && n.lessonId === lessonId));
    writeDb(data);
  },
  // Bookmarks
  getBookmarks(userId: string): StoredBookmark[] {
    const data = ensureDbFile();
    return data.bookmarks.filter(b => b.userId === userId);
  },
  toggleBookmark(bookmark: StoredBookmark): boolean {
    const data = ensureDbFile();
    const idx = data.bookmarks.findIndex(b => b.userId === bookmark.userId && b.courseId === bookmark.courseId && b.lessonId === bookmark.lessonId);
    if (idx >= 0) {
      data.bookmarks.splice(idx, 1);
      writeDb(data);
      return false; // removed
    } else {
      data.bookmarks.push(bookmark);
      writeDb(data);
      return true; // added
    }
  },
  // Learning Goals
  getLearningGoal(userId: string): StoredLearningGoal | undefined {
    const data = ensureDbFile();
    return data.learningGoals.find(g => g.userId === userId);
  },
  saveLearningGoal(goal: StoredLearningGoal) {
    const data = ensureDbFile();
    const idx = data.learningGoals.findIndex(g => g.userId === goal.userId);
    if (idx >= 0) {
      data.learningGoals[idx] = goal;
    } else {
      data.learningGoals.push(goal);
    }
    writeDb(data);
  },
  // Course and Quiz Overrides (Admin)
  getCourseOverrides(): StoredCourseOverride[] {
    const data = ensureDbFile();
    return data.courseOverrides || [];
  },
  saveCourseOverride(override: StoredCourseOverride) {
    const data = ensureDbFile();
    if (!data.courseOverrides) data.courseOverrides = [];
    const idx = data.courseOverrides.findIndex(c => c.courseId === override.courseId);
    if (idx >= 0) {
      data.courseOverrides[idx] = { ...data.courseOverrides[idx], ...override };
    } else {
      data.courseOverrides.push(override);
    }
    writeDb(data);
  },
  getQuizOverrides(): Record<string, any> {
    const data = ensureDbFile();
    return data.quizOverrides || {};
  },
  saveQuizOverride(courseId: string, quizData: any) {
    const data = ensureDbFile();
    if (!data.quizOverrides) data.quizOverrides = {};
    data.quizOverrides[courseId] = quizData;
    writeDb(data);
  },
  // Admin view: Real platform records
  getAllUsers(): { id: string; email: string; fullName: string; createdAt: string }[] {
    const data = ensureDbFile();
    return data.users.map(u => ({ id: u.id, email: u.email, fullName: u.fullName, createdAt: u.createdAt }));
  },
  getAllCertificates(): StoredCertificate[] {
    const data = ensureDbFile();
    return data.certificates;
  },
  getAllEnrollments(): StoredEnrollment[] {
    const data = ensureDbFile();
    return data.enrollments;
  }
};
