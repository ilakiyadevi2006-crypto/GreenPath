import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath } from '../types';
import {
  TrendingUp, CheckCircle2, Circle, Award, BookOpen, Clock, ArrowRight,
  ShieldCheck, FileCheck, AlertCircle
} from 'lucide-react';

interface ProgressPageProps {
  onExploreCourses: () => void;
  onOpenStudy: (course: LearningPath) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  onExploreCourses,
  onOpenStudy
}) => {
  const { user, enrollments, metrics } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#123e2b]/15 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#65a30d]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b291b] font-display">
            Sign In to View Your Learning Progress
          </h2>
          <p className="text-sm text-[#486352] max-w-md mx-auto leading-relaxed">
            Your progress report calculates completion from actual verified database records.
          </p>
        </div>
      </div>
    );
  }

  const enrolledCourses = enrollments
    .map(enr => {
      const course = LEARNING_PATHS.find(p => p.id === enr.courseId);
      return course ? { ...course, enrollment: enr } : null;
    })
    .filter((c): c is (LearningPath & { enrollment: typeof enrollments[0] }) => c !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-[#65a30d]" />
          <span>Real-Time Progress Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b291b] font-display">
          My Learning Progress
        </h1>
        <p className="text-sm sm:text-base text-[#486352]">
          Auditable record of your completed chapters, assessment attempts, and earned credentials.
        </p>
      </div>

      {/* Aggregate Metrics Bar (Real Data Only) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Enrolled Tracks</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1 tabular-nums">{metrics.enrolledCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Lessons Completed</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1 tabular-nums">{metrics.completedLessonsCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Quizzes Passed</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1 tabular-nums">{metrics.passedQuizzesCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Certificates Earned</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1 tabular-nums">{metrics.certificatesCount}</div>
        </div>
      </div>

      {/* Detailed Enrolled Courses Progress */}
      {enrolledCourses.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white border-2 border-dashed border-[#123e2b]/15 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0b291b] font-display">
              Zero Completed Chapters
            </h3>
            <p className="text-xs text-[#5b7b68] max-w-md mx-auto">
              Your progress record is empty. Enroll in a green skills learning path to start logging completed chapters and quiz scores.
            </p>
          </div>
          <button
            onClick={onExploreCourses}
            className="px-6 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white font-semibold text-xs transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Learning Paths</span>
            <ArrowRight className="w-4 h-4 text-[#a3e635]" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {enrolledCourses.map((course) => {
            const allLessons = course.syllabus.flatMap(m => m.lessons);
            const totalCount = allLessons.length;
            const completedCount = course.enrollment.completedLessons.length;
            const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const quizResult = course.enrollment.quizResult;

            return (
              <div
                key={course.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-6"
              >
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-[#184e34] uppercase tracking-wider mb-1">
                      {course.category} · Enrolled {new Date(course.enrollment.enrolledAt).toLocaleDateString()}
                    </div>
                    <h2 className="text-xl font-bold text-[#0b291b] font-display">
                      {course.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => onOpenStudy(course)}
                    className="px-5 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Open Study Studio</span>
                    <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#2d4737] font-semibold">
                    <span>Overall Course Completion</span>
                    <span className="font-mono">{completedCount} of {totalCount} Lessons ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#eef4ef] overflow-hidden">
                    <div
                      className="h-full bg-[#184e34] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 space-y-1">
                    <div className="text-[#5b7b68] font-medium">Assessment Quiz Performance</div>
                    {quizResult ? (
                      <div className="flex items-center gap-2">
                        <span className={`font-bold font-mono text-sm ${quizResult.passed ? 'text-[#184e34]' : 'text-amber-700'}`}>
                          {quizResult.scorePercent}% Score
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          quizResult.passed ? 'bg-[#eef4ef] text-[#184e34]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {quizResult.passed ? 'Passed (≥80%)' : 'Retake Recommended'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#5b7b68]">Not yet attempted</span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 space-y-1">
                    <div className="text-[#5b7b68] font-medium">Accredited Credential</div>
                    {course.enrollment.certificateClaimedId ? (
                      <div className="flex items-center gap-1.5 text-[#184e34] font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                        <span className="font-mono">{course.enrollment.certificateClaimedId}</span>
                      </div>
                    ) : progressPercent === 100 && quizResult?.passed ? (
                      <span className="text-[#184e34] font-semibold">Ready to claim in Study Studio</span>
                    ) : (
                      <span className="text-[#5b7b68]">Requires 100% completion & passed quiz</span>
                    )}
                  </div>
                </div>

                {/* Chapter-by-Chapter Completion Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-[#0b291b] uppercase tracking-wider">
                    Chapter-by-Chapter Checklist
                  </div>

                  <div className="space-y-2">
                    {course.syllabus.map((mod) => (
                      <div key={mod.id} className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/5 space-y-2">
                        <div className="text-xs font-bold text-[#0b291b]">
                          Module 0{mod.moduleNumber}: {mod.title}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {mod.lessons.map((lesson) => {
                            const done = course.enrollment.completedLessons.includes(lesson.id);
                            return (
                              <div
                                key={lesson.id}
                                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                                  done
                                    ? 'bg-[#eef4ef] border-[#184e34]/20 text-[#184e34]'
                                    : 'bg-white border-[#123e2b]/10 text-[#486352]'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate pr-2">
                                  {done ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#65a30d] shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 opacity-40 shrink-0" />
                                  )}
                                  <span className="truncate font-medium">{lesson.title}</span>
                                </div>
                                <span className="text-[10px] font-mono shrink-0">
                                  {done ? 'Done' : `${lesson.durationMinutes}m`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
