import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath } from '../types';
import {
  X, BookOpen, Award, CheckCircle2, Circle, ArrowRight, User as UserIcon,
  Clock, ShieldCheck
} from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudy: (course: LearningPath) => void;
  onExploreCourses: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenStudy,
  onExploreCourses
}) => {
  const { user, enrollments, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-[#123e2b]/15 shadow-2xl max-w-4xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#0b291b] text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#123e2b] flex items-center justify-center text-[#a3e635]">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#a3e635]">
                Learner Profile & Active Tracks
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                {user ? user.fullName : 'Learner Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close dashboard"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* User authenticated info */}
          {user && (
            <div className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[#5b7b68]">Authenticated Account: </span>
                <strong className="text-[#0b291b]">{user.email}</strong>
              </div>
              <div>
                <span className="text-[#5b7b68]">Account ID: </span>
                <span className="font-mono text-[#0b291b]">{user.id}</span>
              </div>
            </div>
          )}

          {/* Enrolled Tracks Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0b291b] font-display">
                Your Enrolled Learning Paths
              </h3>
              <span className="text-xs text-[#5b7b68]">
                {enrollments.length} Active {enrollments.length === 1 ? 'Track' : 'Tracks'}
              </span>
            </div>

            {/* Honest Empty State for New Learners */}
            {enrollments.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-2xl bg-[#fafbf9] border-2 border-dashed border-[#123e2b]/15 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0b291b] font-display">
                  No Active Course Enrollments
                </h4>
                <p className="text-xs text-[#5b7b68] max-w-sm mx-auto leading-relaxed">
                  Your learning record is currently empty. Explore our verified green skill curriculums to begin your coursework and earn verifiable credentials.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onExploreCourses();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Learning Paths</span>
                    <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                  </button>
                </div>
              </div>
            ) : (
              /* Real Enrolled Courses List */
              <div className="space-y-4">
                {enrollments.map((enr) => {
                  const course = LEARNING_PATHS.find(p => p.id === enr.courseId);
                  if (!course) return null;

                  const allLessons = course.syllabus.flatMap(m => m.lessons);
                  const totalCount = allLessons.length;
                  const completedCount = enr.completedLessons.length;
                  const progressPercent = totalCount > 0
                    ? Math.round((completedCount / totalCount) * 100)
                    : 0;

                  return (
                    <div
                      key={enr.id}
                      className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs hover:border-[#184e34]/30 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-semibold text-[#184e34] uppercase tracking-wider mb-0.5">
                            {course.category} · Enrolled {new Date(enr.enrolledAt).toLocaleDateString()}
                          </div>
                          <h4 className="text-base font-bold text-[#0b291b] font-display">
                            {course.title}
                          </h4>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onOpenStudy(course);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <span>Open Study Studio</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#a3e635]" />
                        </button>
                      </div>

                      {/* Real Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-[#2d4737] font-medium">
                          <span>Verified Lesson Completion</span>
                          <span className="font-mono">{completedCount} / {totalCount} ({progressPercent}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#eef4ef] overflow-hidden">
                          <div
                            className="h-full bg-[#184e34] transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Quiz & Credential Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 flex items-center justify-between">
                          <span className="text-[#5b7b68]">Assessment Quiz:</span>
                          {enr.quizResult ? (
                            <span className={`font-semibold ${enr.quizResult.passed ? 'text-[#184e34]' : 'text-amber-700'}`}>
                              {enr.quizResult.passed ? `Passed (${enr.quizResult.scorePercent}%)` : `Retake Needed (${enr.quizResult.scorePercent}%)`}
                            </span>
                          ) : (
                            <span className="text-[#5b7b68]">Not Attempted</span>
                          )}
                        </div>

                        <div className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 flex items-center justify-between">
                          <span className="text-[#5b7b68]">Digital Credential:</span>
                          {enr.certificateClaimedId ? (
                            <span className="font-mono font-bold text-[#184e34] flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                              <span>{enr.certificateClaimedId}</span>
                            </span>
                          ) : progressPercent === 100 && enr.quizResult?.passed ? (
                            <span className="text-[#184e34] font-semibold">Unlocked (Ready to Claim)</span>
                          ) : (
                            <span className="text-[#5b7b68]">Incomplete</span>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
