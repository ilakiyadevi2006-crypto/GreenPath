import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FinalAssessmentQuestion } from '../types';
import {
  Award, CheckCircle2, AlertCircle, Clock, ChevronRight, ChevronLeft,
  X, HelpCircle, Check, RotateCcw, ShieldCheck, ListOrdered
} from 'lucide-react';

interface GreenItFinalAssessmentModalProps {
  onClose: () => void;
  onClaimCertificateSuccess?: (certificate: any) => void;
}

export const GreenItFinalAssessmentModal: React.FC<GreenItFinalAssessmentModalProps> = ({
  onClose,
  onClaimCertificateSuccess
}) => {
  const { user, fetchFinalAssessment, submitFinalAssessment, claimCourseCertificate } = useAuth();

  const [loading, setLoading] = useState(true);
  const [lockedData, setLockedData] = useState<{
    locked: boolean;
    reason?: string;
    completedCount?: number;
    requiredCount?: number;
  } | null>(null);

  const [assessmentMeta, setAssessmentMeta] = useState<any>(null);
  const [questions, setQuestions] = useState<FinalAssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // Review confirmation modal before submission
  const [showReviewConfirm, setShowReviewConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Result state
  const [evaluationResult, setEvaluationResult] = useState<{
    passed: boolean;
    scoreMarks: number;
    maxMarks: number;
    scorePercent: number;
    minPassingMarks: number;
    correctCount: number;
    totalQuestions: number;
    resultsDetail: {
      questionId: string;
      userAnswerIndex: number | null;
      correctAnswerIndex: number;
      isCorrect: boolean;
      chapterNumber: number;
      chapterTitle: string;
      explanation: string;
    }[];
    chapterFeedback: {
      chapterNumber: number;
      chapterTitle: string;
      correct: number;
      total: number;
      percentage: number;
      needsImprovement: boolean;
      recommendation: string;
    }[];
  } | null>(null);

  // Claiming certificate state
  const [claimingCert, setClaimingCert] = useState(false);
  const [claimedCert, setClaimedCert] = useState<any | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);

  useEffect(() => {
    loadAssessment();
  }, []);

  const loadAssessment = async () => {
    setLoading(true);
    setLockedData(null);
    setSubmitError(null);

    const res = await fetchFinalAssessment('green-it');
    if (res.locked) {
      setLockedData({
        locked: true,
        reason: res.reason,
        completedCount: res.completedCount,
        requiredCount: res.requiredCount
      });
      setLoading(false);
      return;
    }

    if (res.assessment) {
      setAssessmentMeta(res.assessment);
      setQuestions(res.assessment.questions || []);
    }
    setLoading(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestionsCount = questions.length || 30;
  const allAnswered = answeredCount === totalQuestionsCount;

  const handleSubmitAssessment = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const res = await submitFinalAssessment('green-it', answers);
    setSubmitting(false);

    if (res.success && res.data) {
      setEvaluationResult(res.data);
      setShowReviewConfirm(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitError(res.error || 'Failed to evaluate assessment submission. Please try again.');
    }
  };

  const handleRetake = () => {
    setEvaluationResult(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setClaimedCert(null);
    setClaimError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClaimCertificate = async () => {
    if (!user) return;
    setClaimingCert(true);
    setClaimError(null);

    const res = await claimCourseCertificate('green-it', 'Green IT Fundamentals', 6);
    setClaimingCert(false);

    if (res.success && res.certificate) {
      setClaimedCert(res.certificate);
      if (onClaimCertificateSuccess) {
        onClaimCertificateSuccess(res.certificate);
      }
    } else {
      setClaimError(res.error || 'Unable to issue certificate. Please verify course completion.');
    }
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#fafbf9] text-[#252925] overflow-hidden select-text">
      
      {/* 1. TOP HEADER */}
      <header className="h-16 px-4 sm:px-6 bg-[#246B45] text-white flex items-center justify-between border-b border-[#1d5737] shrink-0 z-20">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
            <Award className="w-4 h-4 text-emerald-300" />
          </div>

          <div className="truncate">
            <div className="text-[11px] text-[#E8F0E8] font-medium uppercase tracking-wider">
              Green IT Fundamentals · Accredited Examination
            </div>
            <h1 className="text-sm sm:text-base font-bold font-display truncate text-white">
              Final Assessment (60 Marks · 30 Questions)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!evaluationResult && !lockedData?.locked && !loading && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1d5737] text-xs font-mono">
              <span className="text-[#E8F0E8]">Answered:</span>
              <span className="font-bold text-white">{answeredCount} / {totalQuestionsCount}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Exit Assessment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN SCROLL CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* LOADING STATE */}
          {loading && (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="text-sm text-[#59655b] flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#246B45] border-t-transparent rounded-full animate-spin" />
                <span>Loading examination parameters & verifying chapter prerequisites...</span>
              </div>
            </div>
          )}

          {/* LOCKED STATE BANNER */}
          {!loading && lockedData?.locked && (
            <div className="bg-white rounded-2xl border border-amber-300 p-8 sm:p-10 text-center space-y-5 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252925]">
                  Final Assessment Is Currently Locked
                </h2>
                <p className="text-xs sm:text-sm text-[#59655b] leading-relaxed">
                  {lockedData.reason || 'You must complete all six Green IT Fundamentals chapters and pass each chapter quiz with at least 80% to unlock this examination.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-[#252925]">
                <span>Progress: {lockedData.completedCount || 0} of {lockedData.requiredCount || 6} Chapters Completed</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Return to Course Chapters
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              EVALUATION RESULT SCREEN (When submitted)
             ========================================================================= */}
          {!loading && evaluationResult && (
            <div className="space-y-8 animate-in fade-in">
              
              {/* Result Summary Card */}
              <div
                className={`rounded-2xl border p-6 sm:p-8 space-y-5 shadow-sm ${
                  evaluationResult.passed
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-amber-50/60 border-amber-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        evaluationResult.passed
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {evaluationResult.passed ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        <AlertCircle className="w-8 h-8" />
                      )}
                    </div>

                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                          evaluationResult.passed
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {evaluationResult.passed ? 'PASSED — EXCELLENT WORK' : 'NOT PASSED — RETAKE AVAILABLE'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252925] mt-1">
                        Final Score: {evaluationResult.scoreMarks} / {evaluationResult.maxMarks} Marks ({evaluationResult.scorePercent}%)
                      </h2>
                      <p className="text-xs sm:text-sm text-[#59655b] mt-1">
                        {evaluationResult.correctCount} of {evaluationResult.totalQuestions} questions correct (2 marks per question).
                        {evaluationResult.passed
                          ? ' Minimum 48/60 marks achieved. You are officially eligible for your verified GreenPath Certificate of Completion!'
                          : ' Minimum passing requirement is 48 marks out of 60 (80%). Review the recommendations below and retake the assessment.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    {evaluationResult.passed ? (
                      <button
                        onClick={handleClaimCertificate}
                        disabled={claimingCert || Boolean(claimedCert)}
                        className="px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        <Award className="w-4 h-4 text-emerald-300" />
                        <span>
                          {claimedCert
                            ? 'Certificate Issued!'
                            : claimingCert
                            ? 'Generating...'
                            : 'Claim Official Certificate'}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRetake}
                        className="px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Final Assessment</span>
                      </button>
                    )}
                  </div>
                </div>

                {claimError && (
                  <div className="p-3 bg-red-100 text-red-800 text-xs rounded-lg font-medium">
                    {claimError}
                  </div>
                )}

                {claimedCert && (
                  <div className="p-4 bg-white rounded-xl border border-emerald-300 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Certificate Generated Successfully!</span>
                    </div>
                    <div className="text-[#59655b]">
                      Issued to <strong>{claimedCert.learnerName}</strong> · Credential ID: <span className="font-mono font-bold text-[#252925]">{claimedCert.id}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Topic Improvement Diagnostics */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="border-b border-gray-100 pb-3">
                  <div className="text-xs font-bold text-[#246B45] uppercase tracking-wider">
                    Diagnostic Analysis by Chapter
                  </div>
                  <h3 className="text-lg font-bold text-[#252925]">
                    Performance Across Curriculum Topics
                  </h3>
                  <p className="text-xs text-[#59655b] mt-0.5">
                    Evaluates which chapters demonstrated mastery and which areas need additional study.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {evaluationResult.chapterFeedback.map((ch) => (
                    <div
                      key={ch.chapterNumber}
                      className={`p-4 rounded-xl border space-y-2 ${
                        ch.needsImprovement
                          ? 'bg-amber-50/50 border-amber-200'
                          : 'bg-[#fafbf9] border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#252925]">
                          Chapter {ch.chapterNumber}: {ch.chapterTitle.replace(/^Chapter \d+:\s*/, '')}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            ch.needsImprovement
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {ch.correct} / {ch.total} ({ch.percentage}%)
                        </span>
                      </div>
                      <p className="text-xs text-[#59655b] leading-relaxed">
                        {ch.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete 30-Question Review with Explanations */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="border-b border-gray-100 pb-3">
                  <div className="text-xs font-bold text-[#246B45] uppercase tracking-wider">
                    Complete Examination Answer Key & Explanations
                  </div>
                  <h3 className="text-lg font-bold text-[#252925]">
                    Review All 30 Questions
                  </h3>
                  <p className="text-xs text-[#59655b] mt-0.5">
                    Verified explanations and correct answer options for every question.
                  </p>
                </div>

                <div className="space-y-6">
                  {evaluationResult.resultsDetail.map((item, idx) => {
                    const originalQ = questions.find(q => q.id === item.questionId);
                    if (!originalQ) return null;

                    return (
                      <div
                        key={item.questionId}
                        className={`p-5 rounded-xl border space-y-3 ${
                          item.isCorrect
                            ? 'bg-white border-gray-200'
                            : 'bg-amber-50/40 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#246B45]">
                            Question {idx + 1} of 30 · {item.chapterTitle}
                          </span>
                          <span
                            className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                              item.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.isCorrect ? '✓ Correct (+2 Marks)' : '✗ Incorrect (0 Marks)'}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-semibold text-[#252925]">
                          {originalQ.questionText}
                        </h4>

                        <div className="space-y-1.5 pt-1">
                          {originalQ.options.map((opt, optIdx) => {
                            const isCorrectOpt = optIdx === item.correctAnswerIndex;
                            const isUserSelected = optIdx === item.userAnswerIndex;

                            let optClass = 'bg-[#fafbf9] border-gray-200 text-[#59655b]';
                            if (isCorrectOpt) {
                              optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                            } else if (isUserSelected && !isCorrectOpt) {
                              optClass = 'bg-red-50 border-red-300 text-red-900 line-through';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                              >
                                <span>{opt}</span>
                                {isCorrectOpt && (
                                  <span className="text-[10px] text-emerald-800 font-bold uppercase shrink-0 ml-2">
                                    Correct Answer
                                  </span>
                                )}
                                {isUserSelected && !isCorrectOpt && (
                                  <span className="text-[10px] text-red-700 font-semibold uppercase shrink-0 ml-2">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-2 p-3 bg-[#fafbf9] rounded-lg border border-gray-200 text-xs text-[#59655b] space-y-1">
                          <span className="font-bold text-[#252925]">Educational Explanation: </span>
                          <span>{item.explanation}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* =========================================================================
              ACTIVE EXAMINATION INTERFACE (30 Questions, Palette, Review Modal)
             ========================================================================= */}
          {!loading && !lockedData?.locked && !evaluationResult && currentQ && (
            <div className="space-y-6">

              {/* Progress & Question Palette Bar */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#59655b]">Candidate: </span>
                    <strong className="text-[#252925]">{user?.fullName || 'Registered Learner'}</strong>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#59655b]">Pass Benchmark: <strong>48 / 60 Marks (80%)</strong></span>
                    <span className="text-[#246B45] font-bold">Answered: {answeredCount} / {totalQuestionsCount}</span>
                  </div>
                </div>

                {/* 30-Question Navigation Palette */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Question Palette (Click to jump):
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
                    {questions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isCurrent = idx === currentQuestionIndex;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'ring-2 ring-[#246B45] bg-[#246B45] text-white'
                              : isAnswered
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
                
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#E8F0E8] text-[#246B45] font-mono text-xs font-bold">
                      Question {currentQuestionIndex + 1} of {totalQuestionsCount}
                    </span>
                    <span className="text-xs text-[#59655b] font-medium hidden sm:inline">
                      · {currentQ.chapterTitle}
                    </span>
                  </div>

                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-gray-100 text-[#252925]">
                    2 Marks
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-[#252925] leading-relaxed">
                  {currentQ.questionText}
                </h3>

                {/* Four Answer Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = answers[currentQ.id] === optIdx;

                    return (
                      <label
                        key={optIdx}
                        className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#E8F0E8] border-[#246B45] text-[#246B45] font-semibold shadow-2xs'
                            : 'bg-white hover:bg-[#fafbf9] border-gray-200 text-[#252925]'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQ.id}
                          checked={isSelected}
                          onChange={() => handleSelectOption(currentQ.id, optIdx)}
                          className="mt-0.5 text-[#246B45] focus:ring-[#246B45]"
                        />
                        <span className="flex-1 leading-relaxed">{option}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Question Navigation Controls */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-[#252925] hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuestionIndex < totalQuestionsCount - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        className="px-4 py-2 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowReviewConfirm(true)}
                        className="px-5 py-2 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Review & Submit</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Quick Review Strip */}
              <div className="bg-[#fafbf9] border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-[#59655b]">
                  Progress: <strong>{answeredCount} of {totalQuestionsCount} questions answered</strong>
                  {!allAnswered && ` (${totalQuestionsCount - answeredCount} unanswered remaining)`}
                </div>

                <button
                  onClick={() => setShowReviewConfirm(true)}
                  className="px-4 py-2 bg-[#246B45] hover:bg-[#1d5737] text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Review Answers & Final Submission
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          REVIEW CONFIRMATION MODAL BEFORE FINAL SUBMISSION
         ========================================================================= */}
      {showReviewConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#252925]">
                Confirm Assessment Submission
              </h3>
              <button
                onClick={() => setShowReviewConfirm(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#59655b] leading-relaxed">
              <p>
                You are about to submit your examination for evaluation:
              </p>
              <div className="p-4 rounded-xl bg-[#fafbf9] border border-gray-200 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <strong className="text-[#252925]">{totalQuestionsCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <strong className="text-emerald-700">{answeredCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Questions Unanswered:</span>
                  <strong className={allAnswered ? 'text-gray-500' : 'text-amber-700'}>
                    {totalQuestionsCount - answeredCount}
                  </strong>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-1">
                  <span>Maximum Marks:</span>
                  <strong className="text-[#252925]">60 Marks</strong>
                </div>
                <div className="flex justify-between">
                  <span>Passing Mark:</span>
                  <strong className="text-[#246B45]">48 Marks (80%)</strong>
                </div>
              </div>

              {!allAnswered && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                  <span>
                    Warning: You have {totalQuestionsCount - answeredCount} unanswered questions. Unanswered questions receive zero marks. You may return to complete them before submitting.
                  </span>
                </div>
              )}

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg">
                  {submitError}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 text-xs">
              <button
                onClick={() => setShowReviewConfirm(false)}
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#252925] font-semibold transition-colors cursor-pointer"
              >
                Return to Questions
              </button>

              <button
                onClick={handleSubmitAssessment}
                disabled={submitting}
                className="px-5 py-2 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {submitting ? (
                  <span>Evaluating Answers...</span>
                ) : (
                  <span>Confirm and Submit Final Assessment</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
