import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath, SyllabusLesson } from '../types';
import { CertificateModal } from './CertificateModal';
import { GreenItFinalAssessmentModal } from './GreenItFinalAssessmentModal';
import {
  BookOpen, Award, CheckCircle2, Clock, Sparkles, ArrowRight,
  ShieldCheck, PlayCircle, Calendar, FileText, ChevronRight,
  Search, Lock, Check, ExternalLink, User
} from 'lucide-react';

interface MyLearningViewProps {
  initialTab?: 'courses' | 'passport' | 'achievements';
  onOpenPlayer: (course: LearningPath, lessonId?: string) => void;
  onExploreCourses: () => void;
  onOpenMentor: () => void;
  onOpenPassport?: () => void;
  onSelectCourseDetails: (course: LearningPath) => void;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({
  initialTab = 'courses',
  onOpenPlayer,
  onExploreCourses,
  onOpenMentor,
  onSelectCourseDetails
}) => {
  const { user, enrollments, certificates, activities, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'passport' | 'achievements'>(initialTab);
  const [verifyIdInput, setVerifyIdInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    searched: boolean;
    found: boolean;
    data?: any;
    error?: string;
  } | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);
  const [showFinalAssessmentModal, setShowFinalAssessmentModal] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-sm text-[#59655b] flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#246B45] border-t-transparent rounded-full animate-spin" />
          <span>Loading learning records...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-lg bg-[#E8F0E8] text-[#246B45] mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#252925]">
            Sign In to View Your Learning Progress
          </h2>
          <p className="text-xs sm:text-sm text-[#59655b] leading-relaxed">
            Your progress tracker records completed lessons, quiz scores, and verified digital certificates.
          </p>
        </div>
      </div>
    );
  }

  // Real enrolled courses
  const enrolledCourses = enrollments
    .map(enr => {
      const course = LEARNING_PATHS.find(p => p.id === enr.courseId);
      return course ? { ...course, enrollment: enr } : null;
    })
    .filter((c): c is (LearningPath & { enrollment: typeof enrollments[0] }) => c !== null);

  // Total completed lessons
  const totalCompletedLessons = enrollments.reduce(
    (acc, enr) => acc + (enr.completedLessons?.length || 0),
    0
  );

  const handleVerifyLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyIdInput.trim()) return;

    setVerifying(true);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(verifyIdInput.trim())}`);
      const data = await res.json();
      if (res.ok && data.found) {
        setLookupResult({
          searched: true,
          found: true,
          data: data.certificate
        });
      } else {
        setLookupResult({
          searched: true,
          found: false,
          error: data.error || `No authentic certificate found for ID: ${verifyIdInput.trim()}`
        });
      }
    } catch {
      setLookupResult({
        searched: true,
        found: false,
        error: 'Unable to connect to verification registry.'
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      
      {/* Learner Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider mb-1">
              My Learning Tracker
            </div>
            <h1 className="text-2xl font-bold text-[#252925] font-display">
              {user.fullName}
            </h1>
            <p className="text-xs text-[#59655b] mt-0.5">
              Account: {user.email} · Learner ID: <span className="font-mono text-gray-500">{user.id}</span>
            </p>
          </div>

          <button
            onClick={onExploreCourses}
            className="px-4 py-2 bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
          >
            <span>Browse More Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real Metrics Grid (No fake statistics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-lg bg-[#fafbf9] border border-gray-100">
            <div className="text-xs text-[#59655b] font-medium">Enrolled Courses</div>
            <div className="text-2xl font-bold text-[#252925] font-display mt-1">
              {enrolledCourses.length}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#fafbf9] border border-gray-100">
            <div className="text-xs text-[#59655b] font-medium">Completed Chapters</div>
            <div className="text-2xl font-bold text-[#252925] font-display mt-1">
              {totalCompletedLessons}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#fafbf9] border border-gray-100">
            <div className="text-xs text-[#59655b] font-medium">Earned Certificates</div>
            <div className="text-2xl font-bold text-[#246B45] font-display mt-1">
              {certificates.length}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'courses'
                ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                : 'text-[#59655b] hover:text-[#252925]'
            }`}
          >
            Enrolled Courses ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'passport'
                ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                : 'text-[#59655b] hover:text-[#252925]'
            }`}
          >
            Green Skills Passport
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'achievements'
                ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                : 'text-[#59655b] hover:text-[#252925]'
            }`}
          >
            Certificates ({certificates.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#E8F0E8] text-[#246B45] mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#252925]">
                No courses enrolled yet
              </h3>
              <p className="text-xs sm:text-sm text-[#59655b] max-w-md mx-auto">
                Explore our catalog to start learning practical sustainability skills across corporate ESG, green software, waste management, or energy audits.
              </p>
              <button
                onClick={onExploreCourses}
                className="mt-2 px-5 py-2.5 bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Explore Learning Paths
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const totalLessons = course.syllabus?.flatMap(m => m.lessons).length || 4;
                const completedCount = course.enrollment.completedLessons?.length || 0;
                const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));
                const isPassed = course.enrollment.quizResult?.passed;

                // Find next lesson to do
                const allLessons = course.syllabus?.flatMap(m => m.lessons) || [];
                const nextLesson = allLessons.find(l => !course.enrollment.completedLessons?.includes(l.id)) || allLessons[0];

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#E8F0E8] text-[#246B45]">
                          {course.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#252925] mt-1.5">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#59655b] mt-1">
                          Enrolled on {new Date(course.enrollment.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenPlayer(course, nextLesson?.id)}
                          className="px-4 py-2 bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>{progressPercent === 100 ? 'Review Course' : 'Continue Learning'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Simple Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#59655b]">
                        <span>{completedCount} of {totalLessons} chapters completed</span>
                        <span className="font-semibold text-[#252925]">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#246B45] transition-all duration-300 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Chapters List */}
                    <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {course.syllabus?.map((module, mIdx) => {
                        const moduleLessons = module.lessons || [];
                        const isModComplete = moduleLessons.every(l => course.enrollment.completedLessons?.includes(l.id));

                        return (
                          <div
                            key={module.id}
                            className={`p-2.5 rounded-lg border flex items-center justify-between ${
                              isModComplete
                                ? 'bg-emerald-50/50 border-emerald-200 text-[#252925]'
                                : 'bg-[#fafbf9] border-gray-200 text-[#59655b]'
                            }`}
                          >
                            <span className="truncate pr-2">
                              {mIdx + 1}. {module.title}
                            </span>
                            {isModComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="text-[10px] text-gray-400">Incomplete</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Quiz & Certificate Status */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-[#59655b]">
                        Assessment Status:{' '}
                        {isPassed ? (
                          <span className="text-emerald-700 font-semibold">
                            Passed ({course.enrollment.quizResult?.scorePercent}%)
                          </span>
                        ) : course.enrollment.quizResult ? (
                          <span className="text-amber-700 font-semibold">
                            Attempted ({course.enrollment.quizResult?.scorePercent}%) - Retake to pass (80% needed)
                          </span>
                        ) : progressPercent === 100 ? (
                          <button
                            onClick={() => {
                              if (course.id === 'green-it') {
                                setShowFinalAssessmentModal(true);
                              } else {
                                onOpenPlayer(course);
                              }
                            }}
                            className="text-[#246B45] hover:text-[#1d5737] font-bold underline cursor-pointer"
                          >
                            Ready for Final Assessment (60M) →
                          </button>
                        ) : (
                          <span className="text-gray-400">
                            Complete all chapters to unlock final assessment
                          </span>
                        )}
                      </div>

                      {course.enrollment.certificateClaimedId ? (
                        <button
                          onClick={() => {
                            const cert = certificates.find(c => c.id === course.enrollment.certificateClaimedId || c.courseId === course.id);
                            if (cert) setSelectedCertificate(cert);
                          }}
                          className="text-xs font-bold text-[#246B45] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>View Certificate</span>
                        </button>
                      ) : isPassed ? (
                        <button
                          onClick={() => onOpenPlayer(course)}
                          className="text-xs font-semibold text-[#246B45] hover:underline cursor-pointer"
                        >
                          Claim Certificate →
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Green Skills Passport */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#252925]">
                Verified Competencies & Skills Passport
              </h3>
              <p className="text-xs text-[#59655b] mt-0.5">
                Distinguishes assessed skills verified by coursework and quizzes from skills currently in progress.
              </p>
            </div>

            {/* Assessed Skills Section */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#246B45]" />
                <span>Assessed Skills (Verified by Assessment)</span>
              </div>

              {certificates.length === 0 ? (
                <div className="p-4 rounded-lg bg-[#fafbf9] border border-gray-200 text-xs text-[#59655b]">
                  No skills assessed yet. Complete all chapters in a course and score 80% or higher on the assessment quiz to add verified competencies to your passport.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40 text-xs space-y-1.5"
                    >
                      <div className="font-bold text-[#252925]">{cert.courseTitle}</div>
                      <div className="text-emerald-700 text-[11px] font-medium">
                        Score: {cert.scorePercent}% · Verified {new Date(cert.issuedAt).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        Credential ID: {cert.id}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* In-Progress Skills */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>In-Progress Learning Tracks</span>
              </div>

              {enrolledCourses.filter(c => !c.enrollment.quizResult?.passed).length === 0 ? (
                <div className="p-4 rounded-lg bg-[#fafbf9] border border-gray-200 text-xs text-[#59655b]">
                  No active in-progress courses.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {enrolledCourses.filter(c => !c.enrollment.quizResult?.passed).map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-lg border border-gray-200 bg-[#fafbf9] text-xs space-y-1"
                    >
                      <div className="font-semibold text-[#252925]">{c.title}</div>
                      <div className="text-gray-500 text-[11px]">
                        {c.enrollment.completedLessons?.length || 0} chapters finished
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Public Certificate Verification Lookup */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="text-xs font-bold text-[#252925]">
                Verify Any GreenPath Certificate
              </div>
              <p className="text-xs text-[#59655b]">
                Employers and auditors can verify the validity of any GreenPath certificate ID against our immutable registry.
              </p>
              <form onSubmit={handleVerifyLookup} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={verifyIdInput}
                  onChange={(e) => setVerifyIdInput(e.target.value)}
                  placeholder="e.g. GP-CERT-..."
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#246B45]"
                />
                <button
                  type="submit"
                  disabled={verifying || !verifyIdInput.trim()}
                  className="px-3.5 py-1.5 bg-[#246B45] text-white text-xs font-semibold rounded-lg hover:bg-[#1d5737] disabled:opacity-50 cursor-pointer"
                >
                  {verifying ? 'Checking...' : 'Verify ID'}
                </button>
              </form>

              {lookupResult && lookupResult.searched && (
                <div
                  className={`p-3 rounded-lg border text-xs ${
                    lookupResult.found
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  {lookupResult.found ? (
                    <div>
                      <div className="font-bold">✓ Authentic Credential Verified</div>
                      <div>Recipient: {lookupResult.data.learnerName}</div>
                      <div>Course: {lookupResult.data.courseTitle}</div>
                      <div>Score: {lookupResult.data.scorePercent}%</div>
                      <div>Issued: {new Date(lookupResult.data.issuedAt).toLocaleDateString()}</div>
                    </div>
                  ) : (
                    <div>{lookupResult.error}</div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Certificates */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {certificates.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#E8F0E8] text-[#246B45] mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#252925]">
                No certificates earned yet
              </h3>
              <p className="text-xs sm:text-sm text-[#59655b] max-w-md mx-auto">
                Certificates are issued only when you complete all course chapters and achieve 80% or higher on the comprehensive assessment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Score: {cert.scorePercent}%
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#252925] mb-1">
                      {cert.courseTitle}
                    </h3>
                    <div className="text-xs text-[#59655b]">
                      Issued to: <strong>{cert.learnerName}</strong>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Date: {new Date(cert.issuedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 text-xs text-[#59655b] space-y-2">
                    <div className="text-[11px] font-mono text-gray-500 break-all">
                      Verification ID: {cert.id}
                    </div>
                    <button
                      onClick={() => setSelectedCertificate(cert)}
                      className="text-xs font-semibold text-[#246B45] hover:underline cursor-pointer flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#246B45]" />
                      <span>View, Print or Download Certificate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showFinalAssessmentModal && (
        <GreenItFinalAssessmentModal
          onClose={() => setShowFinalAssessmentModal(false)}
          onClaimCertificateSuccess={(cert) => {
            setSelectedCertificate(cert);
          }}
        />
      )}

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

    </div>
  );
};
