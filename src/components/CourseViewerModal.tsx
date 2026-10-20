import React, { useState } from 'react';
import { LearningPath, SyllabusLesson } from '../types';
import { COURSE_QUIZZES } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import {
  X, CheckCircle2, Circle, Award, BookOpen, Clock, FileCheck, ArrowRight,
  AlertCircle, ChevronRight, HelpCircle
} from 'lucide-react';

interface CourseViewerModalProps {
  course: LearningPath | null;
  onClose: () => void;
  onCertificateEarned?: (cert: any) => void;
}

export const CourseViewerModal: React.FC<CourseViewerModalProps> = ({
  course,
  onClose,
  onCertificateEarned
}) => {
  const { user, enrollments, markLessonComplete, submitCourseQuiz, claimCourseCertificate } = useAuth();

  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz'>('lessons');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [marking, setMarking] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [quizError, setQuizError] = useState('');

  // Certificate claim state
  const [claimingCert, setClaimingCert] = useState(false);
  const [claimError, setClaimError] = useState('');
  const [claimedCert, setClaimedCert] = useState<any>(null);

  if (!course) return null;

  // Flatten all lessons to calculate real progress
  const allLessons: SyllabusLesson[] = course.syllabus.flatMap(m => m.lessons);
  const totalLessonsCount = allLessons.length;

  const enrollment = enrollments.find(e => e.courseId === course.id);
  const completedLessonIds = enrollment?.completedLessons || [];
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : 0;

  const allLessonsCompleted = completedCount >= totalLessonsCount && totalLessonsCount > 0;
  const storedQuizResult = enrollment?.quizResult;

  const currentLesson = allLessons.find(l => l.id === selectedLessonId) || allLessons[0];
  const quiz = COURSE_QUIZZES[course.id];

  const handleToggleLessonComplete = async (lessonId: string) => {
    setMarking(true);
    await markLessonComplete(course.id, lessonId);
    setMarking(false);
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz) return;
    if (Object.keys(quizAnswers).length < quiz.questions.length) {
      setQuizError('Please answer all assessment questions before submitting.');
      return;
    }

    setQuizError('');
    setQuizSubmitting(true);
    const result = await submitCourseQuiz(course.id, quizAnswers);
    setQuizSubmitting(false);

    if (result) {
      setQuizResult(result);
    } else {
      setQuizError('Failed to record quiz results. Please try again.');
    }
  };

  const handleClaimCertificate = async () => {
    setClaimError('');
    setClaimingCert(true);
    const res = await claimCourseCertificate(course.id, course.title, totalLessonsCount);
    setClaimingCert(false);

    if (res.success && res.certificate) {
      setClaimedCert(res.certificate);
      if (onCertificateEarned) onCertificateEarned(res.certificate);
    } else {
      setClaimError(res.error || 'Failed to generate certificate.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-[#123e2b]/15 shadow-2xl max-w-5xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-6 bg-[#0b291b] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a3e635] uppercase tracking-wider mb-1">
              <span>{course.category}</span>
              <span aria-hidden="true">·</span>
              <span>{course.standardAlignment}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {course.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Real Progress Counter */}
            <div className="bg-[#123e2b] px-4 py-2 rounded-xl border border-[#184e34] text-right">
              <div className="text-[10px] text-[#cadbce] uppercase font-semibold">
                Actual Progress
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {completedCount} / {totalLessonsCount} Lessons ({progressPercent}%)
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close learning studio"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Tabs */}
        <div className="flex border-b border-[#123e2b]/10 bg-[#fafbf9] px-6">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'border-[#0b291b] text-[#0b291b]'
                : 'border-transparent text-[#5b7b68] hover:text-[#0b291b]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Lessons ({completedCount}/{totalLessonsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'border-[#0b291b] text-[#0b291b]'
                : 'border-transparent text-[#5b7b68] hover:text-[#0b291b]'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>
              Final Assessment Quiz{' '}
              {storedQuizResult ? `(${storedQuizResult.scorePercent}% - ${storedQuizResult.passed ? 'Passed' : 'Not Passed'})` : ''}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'lessons' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[500px]">
              
              {/* Left Sidebar: Lesson List (5 cols) */}
              <div className="md:col-span-5 border-r border-[#123e2b]/10 p-4 sm:p-5 overflow-y-auto bg-[#fafbf9] space-y-4">
                <div className="text-xs font-semibold text-[#184e34] uppercase tracking-wider mb-2">
                  Course Modules & Lessons
                </div>

                {course.syllabus.map((mod) => (
                  <div key={mod.id} className="space-y-1.5">
                    <div className="text-xs font-bold text-[#0b291b] px-2 py-1 bg-[#eef4ef] rounded-md">
                      Module {mod.moduleNumber}: {mod.title}
                    </div>

                    <div className="space-y-1 pl-2">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessonIds.includes(lesson.id);
                        const isSelected = (currentLesson?.id === lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLessonId(lesson.id)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#0b291b] text-white shadow-xs'
                                : 'hover:bg-white text-[#2d4737]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              {isDone ? (
                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#a3e635]' : 'text-[#65a30d]'}`} />
                              ) : (
                                <Circle className={`w-4 h-4 shrink-0 opacity-40`} />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-[#cadbce]' : 'text-[#5b7b68]'}`}>
                              {lesson.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Pane: Active Lesson Details & Completion Toggle (7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#5b7b68] mb-2 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentLesson?.durationMinutes} Minutes</span>
                    <span aria-hidden="true">·</span>
                    <span>Format: {currentLesson?.format}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0b291b] font-display mb-4">
                    {currentLesson?.title}
                  </h3>

                  {/* Real Technical Study Material */}
                  <div className="space-y-4 text-xs sm:text-sm text-[#2d4737] leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[#f6f9f7] border border-[#123e2b]/10">
                      <div className="font-bold text-[#0b291b] mb-1">
                        Technical Core Concepts & Standards:
                      </div>
                      <p>
                        This lesson instructs professionals on the standard parameters defined under {course.standardAlignment}.
                        Learners examine calculation formulas, review audit tolerances, and apply standard reporting boundaries.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-[#0b291b]">
                        Practical Implementation Steps:
                      </div>
                      <ul className="list-disc list-inside space-y-1.5 pl-1 text-[#486352]">
                        <li>Identify operational vs financial control boundaries across legal entities.</li>
                        <li>Source emission factors and activity parameters from verified standard databases.</li>
                        <li>Execute validation checks against standard uncertainty thresholds.</li>
                        <li>Document source references for third-party reasonable assurance.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#eef4ef] border border-[#123e2b]/10 text-xs text-[#184e34]">
                      <span className="font-bold">Required Laboratory Exercise: </span>
                      <span>Review the lesson calculations and complete the practical data verification worksheet.</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Actions */}
                <div className="pt-6 border-t border-[#123e2b]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#5b7b68]">
                    {completedLessonIds.includes(currentLesson.id) ? (
                      <span className="text-[#184e34] font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
                        Completed & Saved to Your Record
                      </span>
                    ) : (
                      <span>Not yet marked completed</span>
                    )}
                  </div>

                  <button
                    disabled={marking}
                    onClick={() => handleToggleLessonComplete(currentLesson.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      completedLessonIds.includes(currentLesson.id)
                        ? 'bg-[#eef4ef] hover:bg-[#e2ede4] text-[#0b291b]'
                        : 'bg-[#0b291b] hover:bg-[#123e2b] text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                    <span>
                      {completedLessonIds.includes(currentLesson.id)
                        ? 'Mark as Reviewed Again'
                        : 'Mark Lesson as Completed'}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Final Assessment Quiz Tab */
            <div className="p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
              <div className="border-b border-[#123e2b]/10 pb-4">
                <h3 className="text-2xl font-bold text-[#0b291b] font-display">
                  {quiz?.title || 'Course Assessment Quiz'}
                </h3>
                <p className="text-xs text-[#5b7b68] mt-1">
                  Answer all technical questions accurately. A minimum score of {quiz?.passingScorePercent || 80}% is required to verify competency and unlock the course credential.
                </p>
              </div>

              {quizError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{quizError}</span>
                </div>
              )}

              {/* Show Previous / Current Quiz Result if Available */}
              {(quizResult || storedQuizResult) && (
                <div className={`p-5 rounded-2xl border ${
                  (quizResult?.passed ?? storedQuizResult?.passed)
                    ? 'bg-[#f0f7f2] border-[#65a30d]/30 text-[#184e34]'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-sm flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span>
                        {(quizResult?.passed ?? storedQuizResult?.passed)
                          ? 'Assessment Passed!'
                          : 'Assessment Not Passed'}
                      </span>
                    </div>
                    <div className="text-base font-bold font-mono">
                      {(quizResult?.scorePercent ?? storedQuizResult?.scorePercent)}% Score
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {(quizResult?.passed ?? storedQuizResult?.passed)
                      ? 'Congratulations! You have satisfied the technical assessment benchmark for this learning path.'
                      : 'You scored below the 80% passing threshold. Please review the lessons and retake the assessment.'}
                  </p>
                </div>
              )}

              {/* Certificate Claim Area */}
              {allLessonsCompleted && (quizResult?.passed || storedQuizResult?.passed) && (
                <div className="p-6 rounded-2xl bg-[#0b291b] text-white border border-[#164e34] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#a3e635] text-[#0b291b] flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">
                        Accredited Certificate Unlocked
                      </h4>
                      <div className="text-xs text-[#cadbce]">
                        All {totalLessonsCount} lessons finished & assessment passed.
                      </div>
                    </div>
                  </div>

                  {claimError && (
                    <div className="p-3 rounded-xl bg-red-900/60 text-red-200 text-xs border border-red-700">
                      {claimError}
                    </div>
                  )}

                  {claimedCert || enrollment?.certificateClaimedId ? (
                    <div className="p-4 rounded-xl bg-[#123e2b] border border-[#184e34] text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#cadbce]">Your Verified Credential ID:</span>
                        <span className="font-mono font-bold text-[#a3e635]">
                          {claimedCert?.id || enrollment?.certificateClaimedId}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#cadbce]">
                        Issued to {user?.fullName}. This credential is permanently registered in the GreenPath verification registry.
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleClaimCertificate}
                      disabled={claimingCert}
                      className="w-full py-3 px-4 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#0b291b] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {claimingCert ? (
                        <span>Registering Credential...</span>
                      ) : (
                        <>
                          <Award className="w-4 h-4 text-[#0b291b]" />
                          <span>Claim Verified Credential</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Quiz Questions Form */}
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                {quiz?.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 space-y-3">
                    <div className="flex items-start gap-2 text-sm font-semibold text-[#0b291b]">
                      <span className="font-mono text-xs text-[#5b7b68] mt-0.5">0{qIndex + 1}.</span>
                      <span>{q.questionText}</span>
                    </div>

                    <div className="space-y-2 pl-6">
                      {q.options.map((opt, optIndex) => (
                        <label
                          key={optIndex}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            quizAnswers[q.id] === optIndex
                              ? 'bg-[#eef4ef] border-[#0b291b] text-[#0b291b] font-medium'
                              : 'bg-white border-[#123e2b]/10 text-[#486352] hover:bg-[#fafbf9]'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={quizAnswers[q.id] === optIndex}
                            onChange={() => handleSelectQuizAnswer(q.id, optIndex)}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={quizSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {quizSubmitting ? (
                    <span>Grading Assessment...</span>
                  ) : (
                    <>
                      <span>Submit Assessment for Grading</span>
                      <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
