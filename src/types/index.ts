export type LearningCategory =
  | 'Sustainability Fundamentals'
  | 'Green IT'
  | 'Waste Management'
  | 'Energy Efficiency'
  | 'Water Conservation'
  | 'Climate Awareness'
  | 'Sustainable Transportation'
  | 'Sustainable Agriculture';

export interface SyllabusLesson {
  id: string;
  title: string;
  durationMinutes: number;
  format: 'Lecture' | 'Case Study' | 'Interactive Lab' | 'Data Simulation';
  videoUrl?: string; // Only valid if verified video exists
  videoStatus?: 'available' | 'in_production' | 'interactive_lab';
  content?: {
    summary: string;
    keyStandards: string[];
    technicalPoints: string[];
    practicalExercise: string;
  };
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseQuiz {
  courseId: string;
  title: string;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface UserEnrollment {
  id: string;
  courseId: string;
  enrolledAt: string;
  completedLessons: string[];
  currentLessonId?: string;
  chapterQuizResults?: Record<string, {
    passed: boolean;
    scorePercent: number;
    correctCount: number;
    totalQuestions: number;
    completedAt: string;
  }>;
  quizResult?: {
    passed: boolean;
    scorePercent: number;
    correctCount: number;
    totalQuestions: number;
    completedAt: string;
  };
  certificateClaimedId?: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  type: 'enrolled' | 'lesson_completed' | 'quiz_passed' | 'quiz_attempted' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: string;
}

export interface ChapterPracticalExample {
  title: string;
  description: string;
}

export interface ChapterActivity {
  title: string;
  instruction: string;
  prompt?: string;
}

export interface ChapterVideo {
  status: 'verified' | 'in_preparation';
  url?: string;
  title?: string;
  duration?: string;
  sourceNote?: string;
}

export interface CourseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  learningObjectives: string[];
  lessonContent: string[];
  practicalExamples: ChapterPracticalExample[];
  activityTask: ChapterActivity;
  video?: ChapterVideo;
  quiz: {
    passingScorePercent: number;
    questions: QuizQuestion[];
  };
}

export interface SyllabusModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  durationHours: number;
  lessons: SyllabusLesson[];
  practicalProject: string;
}

export interface LearningPath {
  id: string;
  title: string;
  tagline: string;
  category: LearningCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  moduleCount: number;
  featured: boolean;
  isAvailable: boolean; // false for "Coming Soon"
  comingSoonMessage?: string;
  image: string;
  imageAlt: string;
  summary: string;
  learningObjectives: string[];
  outcomes: string[];
  toolsAndStandards: string[];
  targetRoles: string[];
  learningMaterials: string[];
  finalAssessmentRequirements: string[];
  syllabus: SyllabusModule[];
  chapters?: CourseChapter[];
  standardAlignment: string;
  customVideoUrl?: string;
}

export interface UserNote {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  content: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: string;
}

export interface LearningGoal {
  userId?: string;
  weeklyHours: number;
  targetTrackId?: string;
  targetDate?: string;
  updatedAt?: string;
}

export interface SkillCompetency {
  name: string;
  category: LearningCategory;
  standard: string;
  isAssessed: boolean;
  courseTitle: string;
  courseId: string;
  scorePercent?: number;
  assessedAt?: string;
}

export interface EcoMentorMessage {
  id: string;
  sender: 'mentor' | 'user';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  recommendedPathId?: string;
  codeSnippet?: string;
}

export interface VerifiedCredential {
  credentialId: string;
  studentName: string;
  trackTitle: string;
  issueDate: string;
  standardsVerified: string[];
  accreditationAuthority: string;
  status: 'Active' | 'Verified';
  competencies: string[];
}

