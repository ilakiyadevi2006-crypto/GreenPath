import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserEnrollment, UserActivity, UserNote, UserBookmark, LearningGoal } from '../types';

export interface DashboardMetrics {
  enrolledCount: number;
  completedLessonsCount: number;
  passedQuizzesCount: number;
  certificatesCount: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  enrollments: UserEnrollment[];
  certificates: any[];
  activities: UserActivity[];
  metrics: DashboardMetrics;
  notes: UserNote[];
  bookmarks: UserBookmark[];
  goal: LearningGoal | null;
  adminKey: string | null;
  setAdminKey: (key: string | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  enrollCourse: (courseId: string, courseTitle?: string) => Promise<{ success: boolean; error?: string }>;
  markLessonComplete: (courseId: string, lessonId: string, lessonTitle?: string, courseTitle?: string) => Promise<boolean>;
  submitCourseQuiz: (courseId: string, answers: Record<string, number>, courseTitle?: string) => Promise<{
    passed: boolean;
    scorePercent: number;
    correctCount: number;
    totalQuestions: number;
    resultsDetail: { questionId: string; correct: boolean; correctAnswerIndex: number; explanation: string }[];
  } | null>;
  submitChapterQuiz: (
    courseId: string,
    chapterId: string,
    chapterTitle: string,
    passed: boolean,
    scorePercent: number,
    correctCount: number,
    totalQuestions: number
  ) => Promise<boolean>;
  fetchFinalAssessment: (courseId: string) => Promise<{
    locked: boolean;
    reason?: string;
    assessment?: any;
    previousAttempts?: any[];
    bestScoreMarks?: number;
    bestScorePercent?: number;
    passed?: boolean;
    completedCount?: number;
    requiredCount?: number;
  }>;
  submitFinalAssessment: (courseId: string, answers: Record<string, number>) => Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }>;
  claimCourseCertificate: (courseId: string, courseTitle: string, totalLessonsCount: number) => Promise<{
    success: boolean;
    certificate?: any;
    error?: string;
  }>;
  saveNote: (courseId: string, lessonId: string, content: string) => Promise<boolean>;
  deleteNote: (courseId: string, lessonId: string) => Promise<boolean>;
  toggleBookmark: (courseId: string, lessonId: string, lessonTitle: string) => Promise<boolean>;
  saveGoal: (weeklyHours: number, targetTrackId?: string, targetDate?: string) => Promise<boolean>;
  refreshUserData: () => Promise<void>;
}

const DEFAULT_METRICS: DashboardMetrics = {
  enrolledCount: 0,
  completedLessonsCount: 0,
  passedQuizzesCount: 0,
  certificatesCount: 0
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<UserEnrollment[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [goal, setGoal] = useState<LearningGoal | null>(null);
  const [adminKey, setAdminKey] = useState<string | null>(() => localStorage.getItem('gp_admin_key'));
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [loading, setLoading] = useState(true);

  const updateAdminKey = (key: string | null) => {
    setAdminKey(key);
    if (key) {
      localStorage.setItem('gp_admin_key', key);
    } else {
      localStorage.removeItem('gp_admin_key');
    }
  };

  const getHeaders = () => {
    const token = localStorage.getItem('gp_auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('gp_auth_token');
    if (!token) {
      setUser(null);
      setEnrollments([]);
      setCertificates([]);
      setActivities([]);
      setNotes([]);
      setBookmarks([]);
      setGoal(null);
      setMetrics(DEFAULT_METRICS);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/user/dashboard', {
        headers: getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setEnrollments(data.enrollments || []);
        setCertificates(data.certificates || []);
        setActivities(data.activities || []);
        setMetrics(data.metrics || DEFAULT_METRICS);
      } else {
        localStorage.removeItem('gp_auth_token');
        setUser(null);
        setEnrollments([]);
        setCertificates([]);
        setActivities([]);
        setNotes([]);
        setBookmarks([]);
        setGoal(null);
        setMetrics(DEFAULT_METRICS);
        setLoading(false);
        return;
      }

      // Fetch user notes
      try {
        const notesRes = await fetch('/api/user/notes', { headers: getHeaders() });
        if (notesRes.ok) {
          const notesData = await notesRes.json();
          setNotes(notesData.notes || []);
        }
      } catch {
        // silent fallback
      }

      // Fetch user bookmarks
      try {
        const bmRes = await fetch('/api/user/bookmarks', { headers: getHeaders() });
        if (bmRes.ok) {
          const bmData = await bmRes.json();
          setBookmarks(bmData.bookmarks || []);
        }
      } catch {
        // silent fallback
      }

      // Fetch user learning goal
      try {
        const goalRes = await fetch('/api/user/goals', { headers: getHeaders() });
        if (goalRes.ok) {
          const goalData = await goalRes.json();
          setGoal(goalData.goal || null);
        }
      } catch {
        // silent fallback
      }
    } catch (err) {
      console.error('Error fetching user dashboard status:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    refreshUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to sign in.' };
      }
      localStorage.setItem('gp_auth_token', data.token);
      setUser(data.user);
      await refreshUserData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error while signing in.' };
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }
      localStorage.setItem('gp_auth_token', data.token);
      setUser(data.user);
      await refreshUserData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during registration.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getHeaders()
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('gp_auth_token');
    setUser(null);
    setEnrollments([]);
    setCertificates([]);
    setActivities([]);
    setMetrics(DEFAULT_METRICS);
  };

  const enrollCourse = async (courseId: string, courseTitle?: string) => {
    if (!user) {
      return { success: false, error: 'Authentication required. Please sign in or register.' };
    }
    try {
      const res = await fetch('/api/user/enroll', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, courseTitle })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to enroll.' };
      }
      await refreshUserData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during enrollment.' };
    }
  };

  const markLessonComplete = async (
    courseId: string,
    lessonId: string,
    lessonTitle?: string,
    courseTitle?: string
  ) => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/progress/lesson', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, lessonId, lessonTitle, courseTitle })
      });
      if (res.ok) {
        await refreshUserData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const submitCourseQuiz = async (
    courseId: string,
    answers: Record<string, number>,
    courseTitle?: string
  ) => {
    if (!user) return null;
    try {
      const res = await fetch('/api/user/progress/quiz', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, answers, courseTitle })
      });
      if (res.ok) {
        const data = await res.json();
        await refreshUserData();
        return data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const submitChapterQuiz = async (
    courseId: string,
    chapterId: string,
    chapterTitle: string,
    passed: boolean,
    scorePercent: number,
    correctCount: number,
    totalQuestions: number
  ) => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/progress/chapter-quiz', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          courseId,
          chapterId,
          chapterTitle,
          passed,
          scorePercent,
          correctCount,
          totalQuestions
        })
      });
      if (res.ok) {
        await refreshUserData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const fetchFinalAssessment = async (courseId: string) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/final-assessment`, {
        headers: getHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { locked: true, reason: err.message || 'Error fetching final assessment.' };
    }
  };

  const submitFinalAssessment = async (courseId: string, answers: Record<string, number>) => {
    if (!user) {
      return { success: false, error: 'Authentication required. Please sign in.' };
    }
    try {
      const res = await fetch(`/api/courses/${courseId}/final-assessment/submit`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to evaluate assessment submission.' };
      }
      await refreshUserData();
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error evaluating assessment.' };
    }
  };

  const claimCourseCertificate = async (
    courseId: string,
    courseTitle: string,
    totalLessonsCount: number
  ) => {
    if (!user) {
      return { success: false, error: 'Authentication required.' };
    }
    try {
      const res = await fetch('/api/user/certificate/claim', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, courseTitle, totalLessonsCount })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to claim certificate.' };
      }
      await refreshUserData();
      return { success: true, certificate: data.certificate };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error claiming certificate.' };
    }
  };

  const saveNote = async (courseId: string, lessonId: string, content: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/notes', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, lessonId, content })
      });
      if (res.ok) {
        const data = await res.json();
        setNotes(prev => {
          const idx = prev.findIndex(n => n.courseId === courseId && n.lessonId === lessonId);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.note;
            return next;
          }
          return [...prev, data.note];
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteNote = async (courseId: string, lessonId: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/notes', {
        method: 'DELETE',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, lessonId })
      });
      if (res.ok) {
        setNotes(prev => prev.filter(n => !(n.courseId === courseId && n.lessonId === lessonId)));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const toggleBookmark = async (courseId: string, lessonId: string, lessonTitle: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/bookmarks/toggle', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ courseId, lessonId, lessonTitle })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isBookmarked) {
          setBookmarks(prev => [...prev, {
            id: `bm_${Date.now()}`,
            userId: user.id,
            courseId,
            lessonId,
            lessonTitle,
            createdAt: new Date().toISOString()
          }]);
        } else {
          setBookmarks(prev => prev.filter(b => !(b.courseId === courseId && b.lessonId === lessonId)));
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveGoal = async (weeklyHours: number, targetTrackId?: string, targetDate?: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const res = await fetch('/api/user/goals', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ weeklyHours, targetTrackId, targetDate })
      });
      if (res.ok) {
        const data = await res.json();
        setGoal(data.goal);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        enrollments,
        certificates,
        activities,
        metrics,
        notes,
        bookmarks,
        goal,
        adminKey,
        setAdminKey: updateAdminKey,
        login,
        register,
        logout,
        enrollCourse,
        markLessonComplete,
        submitCourseQuiz,
        submitChapterQuiz,
        fetchFinalAssessment,
        submitFinalAssessment,
        claimCourseCertificate,
        saveNote,
        deleteNote,
        toggleBookmark,
        saveGoal,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
