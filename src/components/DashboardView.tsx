import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath } from '../types';
import {
  BookOpen, Award, CheckCircle2, Clock, Sparkles, ArrowRight,
  ShieldCheck, AlertCircle, PlayCircle, Calendar, FileText, ChevronRight,
  TrendingUp, Compass, Cpu
} from 'lucide-react';

interface DashboardViewProps {
  onOpenStudy: (course: LearningPath) => void;
  onExploreCourses: () => void;
  onOpenMentor: () => void;
  onOpenCertificates: () => void;
  onSelectCourseDetails: (course: LearningPath) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenStudy,
  onExploreCourses,
  onOpenMentor,
  onOpenCertificates,
  onSelectCourseDetails
}) => {
  const { user, enrollments, certificates, activities, metrics, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[#486352]">
          <div className="w-5 h-5 border-2 border-[#184e34] border-t-transparent rounded-full animate-spin" />
          <span>Loading verified learner dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#123e2b]/15 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[#65a30d]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b291b] font-display">
            Sign In to Access Your Dashboard
          </h2>
          <p className="text-sm text-[#486352] max-w-md mx-auto leading-relaxed">
            Your personalized learning dashboard stores your actual completed chapters, verified quiz attempts, and authentic certificates.
          </p>
        </div>
      </div>
    );
  }

  // Get enrolled learning paths
  const enrolledCourses = enrollments
    .map(enr => {
      const course = LEARNING_PATHS.find(p => p.id === enr.courseId);
      return course ? { ...course, enrollment: enr } : null;
    })
    .filter((c): c is (LearningPath & { enrollment: typeof enrollments[0] }) => c !== null);

  // Identify latest enrolled course for "Continue Learning"
  const activeCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;

  // Calculate actual completed chapters list across all enrollments
  const completedChaptersList: { courseTitle: string; lessonTitle: string }[] = [];
  enrolledCourses.forEach(c => {
    const allLessons = c.syllabus.flatMap(m => m.lessons);
    c.enrollment.completedLessons.forEach(lessonId => {
      const lesson = allLessons.find(l => l.id === lessonId);
      if (lesson) {
        completedChaptersList.push({
          courseTitle: c.title,
          lessonTitle: lesson.title
        });
      }
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* 1. Welcome Section */}
      <div className="rounded-3xl bg-[#0b291b] text-white p-6 sm:p-10 border border-[#164e34] relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#a3e635] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated Learner Account</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            {enrolledCourses.length === 0
              ? 'Welcome to GreenPath!'
              : `Welcome back, ${user.fullName}`}
          </h1>

          <p className="text-sm sm:text-base text-[#cadbce] leading-relaxed">
            {enrolledCourses.length === 0
              ? 'Start your learning journey by choosing a Green Skills learning path.'
              : 'Track your actual completed chapters, review assessment scores, and continue your climate engineering studies.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onExploreCourses}
              className="px-5 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#0b291b] font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Learning Paths</span>
              <ArrowRight className="w-4 h-4 text-[#0b291b]" />
            </button>

            <button
              onClick={onOpenMentor}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#a3e635]" />
              <span>Ask EcoMentor AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Overall Learning Progress Metrics Bar (Real Data Only) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">
              My Learning Paths
            </span>
            <BookOpen className="w-4 h-4 text-[#184e34]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {metrics.enrolledCount}
          </div>
          <p className="text-xs text-[#5b7b68] mt-1">
            {metrics.enrolledCount === 1 ? 'Active enrolled track' : 'Active enrolled tracks'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">
              Completed Lessons
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {metrics.completedLessonsCount}
          </div>
          <p className="text-xs text-[#5b7b68] mt-1">
            Verified chapter completions
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">
              Quizzes Passed
            </span>
            <TrendingUp className="w-4 h-4 text-[#184e34]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {metrics.passedQuizzesCount}
          </div>
          <p className="text-xs text-[#5b7b68] mt-1">
            Technical assessments passed (≥80%)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">
              Earned Certificates
            </span>
            <Award className="w-4 h-4 text-[#184e34]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {metrics.certificatesCount}
          </div>
          <p className="text-xs text-[#5b7b68] mt-1">
            Verifiable digital credentials
          </p>
        </div>
      </div>

      {/* Main Grid: Left Column (Learning Paths & Continue Learning) + Right Column (Progress, Activity & AI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Continue Learning Section (if enrolled in any course) */}
          {activeCourse && (
            <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
                  <PlayCircle className="w-4 h-4 text-[#65a30d]" />
                  <span>Continue Learning</span>
                </div>
                <span className="text-xs text-[#5b7b68]">
                  Enrolled {new Date(activeCourse.enrollment.enrolledAt).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0b291b] font-display">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-[#486352] mt-1 line-clamp-2">
                  {activeCourse.tagline}
                </p>
              </div>

              {/* Progress calculation */}
              {(() => {
                const totalLessons = activeCourse.syllabus.flatMap(m => m.lessons).length;
                const doneCount = activeCourse.enrollment.completedLessons.length;
                const percent = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

                return (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs text-[#2d4737] font-medium">
                      <span>Progress</span>
                      <span className="font-mono">{doneCount} of {totalLessons} lessons completed ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#eef4ef] overflow-hidden">
                      <div
                        className="h-full bg-[#184e34] transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })()}

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectCourseDetails(activeCourse)}
                  className="text-xs font-semibold text-[#184e34] hover:underline cursor-pointer"
                >
                  View Full Syllabus & Requirements
                </button>

                <button
                  onClick={() => onOpenStudy(activeCourse)}
                  className="px-5 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Resume Course</span>
                  <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                </button>
              </div>
            </div>
          )}

          {/* My Learning Paths Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0b291b] font-display">
                  My Learning Paths
                </h2>
                <p className="text-xs text-[#5b7b68]">
                  Courses you have enrolled in with actual progress tracking.
                </p>
              </div>

              <button
                onClick={onExploreCourses}
                className="text-xs font-semibold text-[#184e34] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All Paths</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Empty state for new users */}
            {enrolledCourses.length === 0 ? (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-dashed border-[#123e2b]/15 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0b291b] font-display">
                    Welcome to GreenPath! Start your learning journey by choosing a Green Skills learning path.
                  </h3>
                  <p className="text-xs text-[#5b7b68] max-w-md mx-auto">
                    You have not enrolled in any learning paths yet. Browse our verified curriculums across Sustainability Fundamentals, Green IT, Energy Efficiency, and Waste Management.
                  </p>
                </div>
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white font-semibold text-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Learning Paths</span>
                  <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.map((course) => {
                  const allLessons = course.syllabus.flatMap(m => m.lessons);
                  const total = allLessons.length;
                  const done = course.enrollment.completedLessons.length;
                  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
                  const quizPassed = course.enrollment.quizResult?.passed;

                  return (
                    <div
                      key={course.id}
                      className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs hover:border-[#184e34]/30 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#5b7b68] mb-1.5">
                          <span className="font-semibold text-[#184e34] uppercase tracking-wider">
                            {course.category}
                          </span>
                          <span>{course.level}</span>
                        </div>

                        <h3 className="text-base font-bold text-[#0b291b] font-display mb-1 line-clamp-1">
                          {course.title}
                        </h3>

                        <p className="text-xs text-[#486352] line-clamp-2 leading-relaxed">
                          {course.summary}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-[#2d4737] font-medium">
                          <span>Progress</span>
                          <span className="font-mono">{done} / {total} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#eef4ef] overflow-hidden">
                          <div
                            className="h-full bg-[#184e34]"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Status row & Action */}
                      <div className="pt-2 border-t border-[#123e2b]/5 flex items-center justify-between text-xs">
                        <div className="text-[11px]">
                          {quizPassed ? (
                            <span className="text-[#184e34] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
                              Quiz Passed
                            </span>
                          ) : (
                            <span className="text-[#5b7b68]">Quiz Pending</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onSelectCourseDetails(course)}
                            className="px-2.5 py-1.5 text-xs text-[#5b7b68] hover:text-[#0b291b] cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onOpenStudy(course)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all cursor-pointer"
                          >
                            Study
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Chapters Section */}
          <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0b291b] font-display">
                  Completed Chapters & Lessons
                </h3>
                <p className="text-xs text-[#5b7b68]">
                  Verified records of study materials you have successfully completed.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[#184e34] bg-[#eef4ef] px-2.5 py-1 rounded-lg">
                {completedChaptersList.length} Total Completed
              </span>
            </div>

            {completedChaptersList.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center text-xs text-[#5b7b68]">
                No completed chapters recorded yet. Select an enrolled path and mark lessons complete as you study.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {completedChaptersList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#65a30d] shrink-0" />
                      <div>
                        <div className="font-semibold text-[#0b291b]">{item.lessonTitle}</div>
                        <div className="text-[11px] text-[#5b7b68]">{item.courseTitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#184e34] font-medium bg-[#eef4ef] px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* EcoMentor AI Assistant Entry Point */}
          <div className="p-6 rounded-3xl bg-[#0b291b] text-white border border-[#164e34] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#a3e635] text-[#0b291b] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  EcoMentor AI Assistant
                </h3>
                <span className="text-[11px] text-[#cadbce]">
                  Powered by Gemini 3.8 Flash
                </span>
              </div>
            </div>

            <p className="text-xs text-[#cadbce] leading-relaxed">
              Ask technical questions about your enrolled coursework, international carbon accounting standards, or request study roadmaps.
            </p>

            <button
              onClick={onOpenMentor}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open EcoMentor Assistant</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a3e635]" />
            </button>
          </div>

          {/* Earned Certificates Section */}
          <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#184e34]" />
                <h3 className="text-base font-bold text-[#0b291b] font-display">
                  Earned Certificates
                </h3>
              </div>
              <button
                onClick={onOpenCertificates}
                className="text-[11px] font-semibold text-[#184e34] hover:underline cursor-pointer"
              >
                Verification Tool
              </button>
            </div>

            {certificates.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#5b7b68] mx-auto opacity-50" />
                <div className="text-xs font-semibold text-[#0b291b]">
                  Zero Certificates Earned
                </div>
                <p className="text-[11px] text-[#5b7b68] leading-relaxed">
                  Certificates are unlocked when you complete 100% of course lessons and pass the final technical assessment with 80% or higher.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl bg-[#eef4ef] border border-[#184e34]/20 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0b291b]">{cert.id}</span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#184e34] font-semibold">
                        Score: {cert.scorePercent}%
                      </span>
                    </div>
                    <div className="font-semibold text-[#184e34]">{cert.courseTitle}</div>
                    <div className="text-[10px] text-[#5b7b68]">
                      Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Learning Activity Log (Real Data Only) */}
          <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#184e34]" />
                <h3 className="text-base font-bold text-[#0b291b] font-display">
                  Recent Activity
                </h3>
              </div>
              <span className="text-[11px] text-[#5b7b68]">Audit Log</span>
            </div>

            {activities.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center text-xs text-[#5b7b68]">
                No recent activity logged. Activity timestamps will appear as you enroll, study chapters, and complete quizzes.
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {activities.slice(0, 8).map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0b291b] truncate pr-2">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-[#5b7b68] shrink-0 font-mono">
                        {new Date(act.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5b7b68] leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
