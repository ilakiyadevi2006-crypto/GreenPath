import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath, CourseChapter } from '../types';
import { CertificateModal } from './CertificateModal';
import { GreenItFinalAssessmentModal } from './GreenItFinalAssessmentModal';
import {
  TrendingUp, CheckCircle2, Circle, Award, BookOpen, Clock, ArrowRight,
  ShieldCheck, FileCheck, AlertCircle, Lock, PlayCircle, RotateCcw,
  Check, HelpCircle, Sparkles
} from 'lucide-react';

interface ProgressPageProps {
  onExploreCourses: () => void;
  onOpenStudy: (course: LearningPath, lessonId?: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  onExploreCourses,
  onOpenStudy
}) => {
  const { user, enrollments, certificates, metrics } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);
  const [showFinalAssessmentModal, setShowFinalAssessmentModal] = useState(false);

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
          Auditable record of your completed chapters, chapter quiz results, final assessment scores, and accredited credentials.
        </p>
      </div>

      {/* Aggregate Metrics Bar (Real Data Only) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Enrolled Tracks</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1 tabular-nums">{metrics.enrolledCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Lessons / Chapters</span>
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
        <div className="space-y-8">
          {enrolledCourses.map((course) => {
            const isChapterCourse = Boolean(course.chapters && course.chapters.length > 0);
            const chapters: CourseChapter[] = course.chapters || [];
            const totalChapters = chapters.length || course.syllabus.flatMap(m => m.lessons).length;
            const completedLessons = course.enrollment.completedLessons || [];
            const completedCount = completedLessons.length;
            const progressPercent = totalChapters > 0 ? Math.min(100, Math.round((completedCount / totalChapters) * 100)) : 0;
            const chapterQuizResults = course.enrollment.chapterQuizResults || {};
            const finalAssessment = course.enrollment.finalAssessment;
            const certClaimedId = course.enrollment.certificateClaimedId;
            const matchingCert = certificates.find(c => c.courseId === course.id || c.id === certClaimedId);

            // Determine each chapter's status: Completed, Current, or Locked
            const chapterStatuses = isChapterCourse ? chapters.map((ch, idx) => {
              const isCompleted = completedLessons.includes(ch.id);
              const quizRes = chapterQuizResults[ch.id];
              const isPassed = quizRes?.passed || false;
              
              // Locked rule: Chapter 0 unlocked; subsequent unlock only when previous is complete & quiz passed
              let isUnlocked = false;
              if (idx === 0) {
                isUnlocked = true;
              } else {
                const prev = chapters[idx - 1];
                const prevDone = completedLessons.includes(prev.id);
                const prevPassed = chapterQuizResults[prev.id]?.passed || false;
                isUnlocked = prevDone && prevPassed;
              }

              let statusText: 'Completed' | 'Current' | 'Locked' = 'Locked';
              if (isCompleted && isPassed) {
                statusText = 'Completed';
              } else if (isUnlocked) {
                statusText = 'Current';
              } else {
                statusText = 'Locked';
              }

              return {
                chapter: ch,
                index: idx,
                isCompleted,
                quizRes,
                isPassed,
                isUnlocked,
                statusText
              };
            }) : [];

            const allChaptersCompletedAndPassed = isChapterCourse &&
              chapters.length > 0 &&
              chapters.every(ch => completedLessons.includes(ch.id) && chapterQuizResults[ch.id]?.passed);

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
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0b291b] font-display">
                      {course.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {matchingCert && (
                      <button
                        onClick={() => setSelectedCertificate(matchingCert)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-50 text-[#184e34] border border-[#184e34]/30 hover:bg-emerald-100 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                        <span>View Certificate</span>
                      </button>
                    )}
                    <button
                      onClick={() => onOpenStudy(course)}
                      className="px-5 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <PlayCircle className="w-4 h-4 text-[#a3e635]" />
                      <span>{progressPercent === 100 ? 'Review Lessons' : 'Continue Course'}</span>
                    </button>
                  </div>
                </div>

                {/* Overall Course Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#2d4737] font-semibold">
                    <span>Overall Course Completion</span>
                    <span className="font-mono">{completedCount} of {totalChapters} Chapters ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#eef4ef] overflow-hidden">
                    <div
                      className="h-full bg-[#184e34] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Progress Indicators Summary Pill Bar */}
                {isChapterCourse && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#fafbf9] border border-[#123e2b]/10">
                      <span className="text-[11px] text-[#5b7b68] block">Completed Chapters</span>
                      <strong className="text-base text-[#184e34] font-mono">
                        {chapterStatuses.filter(s => s.statusText === 'Completed').length} / {totalChapters}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#fafbf9] border border-[#123e2b]/10">
                      <span className="text-[11px] text-[#5b7b68] block">Current Chapter</span>
                      <strong className="text-base text-[#252925] font-mono">
                        {chapterStatuses.find(s => s.statusText === 'Current')?.chapter.chapterNumber
                          ? `Chapter ${chapterStatuses.find(s => s.statusText === 'Current')?.chapter.chapterNumber}`
                          : allChaptersCompletedAndPassed ? 'All Complete' : 'None'}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#fafbf9] border border-[#123e2b]/10">
                      <span className="text-[11px] text-[#5b7b68] block">Locked Chapters</span>
                      <strong className="text-base text-gray-500 font-mono">
                        {chapterStatuses.filter(s => s.statusText === 'Locked').length}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#fafbf9] border border-[#123e2b]/10">
                      <span className="text-[11px] text-[#5b7b68] block">Final Exam Status</span>
                      <strong className="text-base font-mono">
                        {finalAssessment?.passed ? (
                          <span className="text-[#184e34]">Passed ({finalAssessment.bestScoreMarks}/60)</span>
                        ) : allChaptersCompletedAndPassed ? (
                          <span className="text-amber-700">Unlocked & Ready</span>
                        ) : (
                          <span className="text-gray-400">Locked</span>
                        )}
                      </strong>
                    </div>
                  </div>
                )}

                {/* Chapter-by-Chapter Sequential Progress List */}
                {isChapterCourse ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-[#0b291b] uppercase tracking-wider">
                        Curriculum Chapters & Quiz Progression
                      </div>
                      <span className="text-[11px] text-[#5b7b68]">
                        Next chapter unlocks only after completing lesson & passing quiz with ≥80%
                      </span>
                    </div>

                    <div className="space-y-2">
                      {chapterStatuses.map(({ chapter, index, isCompleted, quizRes, isPassed, isUnlocked, statusText }) => (
                        <div
                          key={chapter.id}
                          className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                            statusText === 'Completed'
                              ? 'bg-[#eef4ef]/60 border-[#184e34]/25'
                              : statusText === 'Current'
                              ? 'bg-white border-[#246B45] shadow-xs ring-1 ring-[#246B45]/20'
                              : 'bg-gray-50/70 border-gray-200 text-gray-400'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="mt-0.5 sm:mt-0 shrink-0">
                              {statusText === 'Completed' ? (
                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                </div>
                              ) : statusText === 'Current' ? (
                                <div className="w-7 h-7 rounded-full bg-[#E8F0E8] text-[#246B45] flex items-center justify-center font-bold text-xs">
                                  {index + 1}
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold font-mono">
                                  Chapter {chapter.chapterNumber}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                                  statusText === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : statusText === 'Current'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-200 text-gray-500'
                                }`}>
                                  {statusText}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold text-[#252925]">
                                {chapter.title}
                              </h4>
                            </div>
                          </div>

                          {/* Right Side: Quiz Score & Study Action */}
                          <div className="flex items-center gap-3 self-end sm:self-center">
                            {quizRes ? (
                              <div className="text-right">
                                <div className="text-[10px] text-[#5b7b68] uppercase font-semibold">Quiz Score</div>
                                <div className={`font-mono font-bold text-xs ${quizRes.passed ? 'text-[#184e34]' : 'text-amber-700'}`}>
                                  {quizRes.scorePercent}% ({quizRes.correctCount}/{quizRes.totalQuestions})
                                </div>
                              </div>
                            ) : (
                              <div className="text-right">
                                <div className="text-[10px] text-gray-400 uppercase font-semibold">Quiz</div>
                                <div className="text-xs text-gray-400 font-mono">Not Started</div>
                              </div>
                            )}

                            <button
                              onClick={() => onOpenStudy(course, chapter.id)}
                              disabled={!isUnlocked}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                                isUnlocked
                                  ? 'bg-[#0b291b] hover:bg-[#123e2b] text-white shadow-xs'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <span>{statusText === 'Completed' ? 'Review' : statusText === 'Current' ? 'Study' : 'Locked'}</span>
                              {isUnlocked && <ArrowRight className="w-3 h-3 text-[#a3e635]" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Syllabus Modules for other courses */
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-[#0b291b] uppercase tracking-wider">
                      Module Checklist
                    </div>
                    <div className="space-y-2">
                      {course.syllabus.map((mod) => (
                        <div key={mod.id} className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/5 space-y-2">
                          <div className="text-xs font-bold text-[#0b291b]">
                            Module 0{mod.moduleNumber}: {mod.title}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {mod.lessons.map((lesson) => {
                              const done = completedLessons.includes(lesson.id);
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
                )}

                {/* Final Assessment Card (60 Marks) */}
                {course.id === 'green-it' && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-[#eef4ef] to-[#fafbf9] border border-[#184e34]/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#184e34] uppercase tracking-wider">
                          <Award className="w-4 h-4 text-[#65a30d]" />
                          <span>Final Comprehensive Examination (60 Marks)</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0b291b] mt-0.5">
                          Green IT Fundamentals – Final Assessment
                        </h3>
                        <p className="text-xs text-[#5b7b68] mt-0.5">
                          30 questions (2 marks each) · Passing score: 48 out of 60 marks (80%)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {finalAssessment?.passed ? (
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Passed ({finalAssessment.bestScoreMarks}/60 · {finalAssessment.bestScorePercent}%)
                            </span>
                            <button
                              onClick={() => setShowFinalAssessmentModal(true)}
                              className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium hover:bg-white cursor-pointer"
                            >
                              Review / Retake
                            </button>
                          </div>
                        ) : allChaptersCompletedAndPassed ? (
                          <button
                            onClick={() => setShowFinalAssessmentModal(true)}
                            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer ring-2 ring-amber-300/50"
                          >
                            <Award className="w-4 h-4" />
                            <span>Take Final Assessment (60M)</span>
                          </button>
                        ) : (
                          <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-500 text-xs font-medium flex items-center gap-2 border border-gray-200">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Complete all 6 chapters to unlock</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Attempt History / Diagnostics if attempted */}
                    {finalAssessment && finalAssessment.attemptsCount > 0 && (
                      <div className="pt-3 border-t border-[#184e34]/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-gray-200">
                          <span className="text-[11px] text-[#5b7b68] block">Attempts Recorded</span>
                          <strong className="text-sm font-mono text-[#252925]">{finalAssessment.attemptsCount}</strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-gray-200">
                          <span className="text-[11px] text-[#5b7b68] block">Best Score Achieved</span>
                          <strong className="text-sm font-mono text-[#184e34]">
                            {finalAssessment.bestScoreMarks} / 60 ({finalAssessment.bestScorePercent}%)
                          </strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-gray-200">
                          <span className="text-[11px] text-[#5b7b68] block">Result Status</span>
                          <strong className={`text-sm font-semibold ${finalAssessment.passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {finalAssessment.passed ? '✓ Credential Unlocked' : '✗ Not Passed (<48 Marks)'}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Final Assessment Modal */}
      {showFinalAssessmentModal && (
        <GreenItFinalAssessmentModal
          onClose={() => setShowFinalAssessmentModal(false)}
          onClaimCertificateSuccess={(cert) => {
            setSelectedCertificate(cert);
          }}
        />
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

    </div>
  );
};
