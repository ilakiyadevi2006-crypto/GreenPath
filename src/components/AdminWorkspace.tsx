import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { COURSE_QUIZZES } from '../data/quizzes';
import {
  ShieldAlert, ShieldCheck, BookOpen, Award, Users, CheckCircle2,
  Lock, Unlock, Settings, RefreshCw, AlertCircle, Save, ExternalLink,
  ChevronRight, FileText, Check, Database
} from 'lucide-react';

export const AdminWorkspace: React.FC = () => {
  const { user, adminKey, setAdminKey } = useAuth();

  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'quizzes' | 'learners'>('courses');

  // Admin data
  const [loading, setLoading] = useState(false);
  const [overviewData, setOverviewData] = useState<{
    stats: {
      registeredLearnersCount: number;
      activeEnrollmentsCount: number;
      issuedCertificatesCount: number;
      totalCourseTracks: number;
    };
    users: any[];
    certificates: any[];
    enrollments: any[];
    overrides: any[];
  } | null>(null);

  // Selected course for editing
  const [selectedCourseId, setSelectedCourseId] = useState<string>(LEARNING_PATHS[0].id);
  const [courseAvailability, setCourseAvailability] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    LEARNING_PATHS.forEach(c => {
      map[c.id] = c.isAvailable;
    });
    return map;
  });

  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [savingCourse, setSavingCourse] = useState(false);

  // Custom edit fields
  const [editSummary, setEditSummary] = useState('');
  const [editComingSoonMsg, setEditComingSoonMsg] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');

  const fetchAdminOverview = async () => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/overview', {
        headers: {
          'x-admin-key': adminKey || passkeyInput,
          ...(localStorage.getItem('gp_auth_token')
            ? { Authorization: `Bearer ${localStorage.getItem('gp_auth_token')}` }
            : {})
        }
      });
      const data = await res.json();
      if (res.ok && data.authorized) {
        setOverviewData(data);
        if (passkeyInput) setAdminKey(passkeyInput);

        // sync course overrides
        if (data.overrides && Array.isArray(data.overrides)) {
          setCourseAvailability(prev => {
            const next = { ...prev };
            data.overrides.forEach((ov: any) => {
              if (ov.isAvailable !== undefined) {
                next[ov.courseId] = ov.isAvailable;
              }
            });
            return next;
          });
        }
      } else {
        setAuthError(data.error || 'Invalid administrator authorization key.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Error reaching administration gateway.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey || (user && user.email.toLowerCase().endsWith('@greenpath.org'))) {
      fetchAdminOverview();
    }
  }, [adminKey, user]);

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    fetchAdminOverview();
  };

  const handleToggleCourseStatus = async (courseId: string) => {
    const current = courseAvailability[courseId] ?? false;
    const nextVal = !current;

    setCourseAvailability(prev => ({
      ...prev,
      [courseId]: nextVal
    }));

    try {
      await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey || ''
        },
        body: JSON.stringify({ isAvailable: nextVal })
      });
      setSaveSuccessNotice(`Publication status updated for ${courseId}.`);
      setTimeout(() => setSaveSuccessNotice(null), 3000);
    } catch (err) {
      console.error('Failed to update course status:', err);
    }
  };

  const currentCourse = LEARNING_PATHS.find(c => c.id === selectedCourseId) || LEARNING_PATHS[0];

  useEffect(() => {
    if (currentCourse) {
      setEditSummary(currentCourse.summary);
      setEditComingSoonMsg(currentCourse.comingSoonMessage || '');
      setEditVideoUrl((currentCourse as any).customVideoUrl || '');
    }
  }, [selectedCourseId]);

  const handleSaveCourseDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCourse(true);
    try {
      const res = await fetch(`/api/admin/courses/${selectedCourseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey || ''
        },
        body: JSON.stringify({
          summary: editSummary,
          comingSoonMessage: editComingSoonMsg,
          customVideoUrl: editVideoUrl
        })
      });
      if (res.ok) {
        setSaveSuccessNotice(`Course details saved successfully.`);
        setTimeout(() => setSaveSuccessNotice(null), 3000);
      }
    } catch (err) {
      console.error('Error saving course details:', err);
    } finally {
      setSavingCourse(false);
    }
  };

  // If not authorized yet, show secure administrator login
  if (!overviewData) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="p-8 rounded-xl bg-white border border-gray-200 shadow-xs space-y-6">
          <div className="w-12 h-12 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-[#252925]">
              Administrator Gateway
            </h1>
            <p className="text-xs text-[#59655b] max-w-sm mx-auto leading-relaxed">
              Protected interface for managing curriculum publication, assessment passing thresholds, and auditing real learner records.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#252925] block mb-1.5">
                Admin Passkey:
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter administrator secret key"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-xs text-[#252925] focus:outline-none focus:border-[#246B45]"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Configured via the <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-700">ADMIN_SECRET_KEY</code> server environment variable.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !passkeyInput.trim()}
              className="w-full py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-bold transition-colors shadow-xs disabled:opacity-40 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Authorize Administrator Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#123e2b]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
            <span>Authorized Administrator Workspace</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-[#0b291b]">
            Platform Governance & Catalog Administration
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchAdminOverview}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#123e2b]/15 text-xs font-medium text-[#0b291b] hover:bg-[#fafbf9] cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => {
              setAdminKey(null);
              setOverviewData(null);
            }}
            className="px-3.5 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50 cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {saveSuccessNotice && (
        <div className="p-3 rounded-xl bg-[#eef4ef] text-[#184e34] border border-[#184e34]/30 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#65a30d]" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Real Platform Statistics (Data Integrity Guaranteed) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Registered Learners</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1">
            {overviewData.stats.registeredLearnersCount}
          </div>
          <div className="text-[11px] text-[#5b7b68] mt-1">Verified user accounts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Active Enrollments</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1">
            {overviewData.stats.activeEnrollmentsCount}
          </div>
          <div className="text-[11px] text-[#5b7b68] mt-1">Curriculums underway</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Issued Credentials</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1">
            {overviewData.stats.issuedCertificatesCount}
          </div>
          <div className="text-[11px] text-[#5b7b68] mt-1">Defended assessments</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-xs">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Curriculum Tracks</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0b291b] font-mono mt-1">
            {overviewData.stats.totalCourseTracks}
          </div>
          <div className="text-[11px] text-[#5b7b68] mt-1">Standard disciplines</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#123e2b]/10">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'courses'
              ? 'border-[#0b291b] text-[#0b291b]'
              : 'border-transparent text-[#5b7b68] hover:text-[#0b291b]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Publication & Content</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'quizzes'
              ? 'border-[#0b291b] text-[#0b291b]'
              : 'border-transparent text-[#5b7b68] hover:text-[#0b291b]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Assessment Thresholds</span>
        </button>

        <button
          onClick={() => setActiveTab('learners')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'learners'
              ? 'border-[#0b291b] text-[#0b291b]'
              : 'border-transparent text-[#5b7b68] hover:text-[#0b291b]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Learner Audit Records ({overviewData.users.length})</span>
        </button>
      </div>

      {/* TAB 1: Course Catalog & Publication Management */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Courses List (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0b291b] font-display">
              Curriculum Tracks ({LEARNING_PATHS.length})
            </h3>
            <div className="space-y-2">
              {LEARNING_PATHS.map((course) => {
                const isPublished = courseAvailability[course.id] ?? course.isAvailable;
                const isSelected = selectedCourseId === course.id;

                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0b291b] text-white border-[#0b291b] shadow-xs'
                        : 'bg-[#fafbf9] border-[#123e2b]/10 text-[#2d4737] hover:bg-white'
                    }`}
                  >
                    <div className="truncate pr-3">
                      <div className="font-semibold text-xs truncate">{course.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-[#cadbce]' : 'text-[#5b7b68]'}`}>
                        {course.category} · {course.level}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCourseStatus(course.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                        isPublished
                          ? 'bg-[#a3e635] text-[#0b291b]'
                          : 'bg-amber-600/90 text-white'
                      }`}
                    >
                      {isPublished ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span>{isPublished ? 'Published' : 'In Review'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Details Editor (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#123e2b]/10 pb-4">
              <div>
                <span className="text-[11px] font-semibold text-[#184e34] uppercase tracking-wider">
                  Editing Curriculum
                </span>
                <h3 className="text-xl font-bold font-display text-[#0b291b]">
                  {currentCourse.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5b7b68]">Status:</span>
                <button
                  onClick={() => handleToggleCourseStatus(currentCourse.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                    courseAvailability[currentCourse.id]
                      ? 'bg-[#eef4ef] text-[#184e34] border border-[#184e34]/30'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {courseAvailability[currentCourse.id] ? 'Published & Available' : 'Coming Soon'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveCourseDetails} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#0b291b] block mb-1">
                  Curriculum Summary & Academic Description:
                </label>
                <textarea
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/15 text-xs text-[#0b291b] focus:outline-hidden focus:border-[#184e34]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#0b291b] block mb-1">
                  "Coming Soon" Notice (displayed when in peer review):
                </label>
                <input
                  type="text"
                  value={editComingSoonMsg}
                  onChange={(e) => setEditComingSoonMsg(e.target.value)}
                  placeholder="e.g. Course curriculum in production with clean transit engineers."
                  className="w-full px-3 py-2 rounded-xl bg-[#fafbf9] border border-[#123e2b]/15 text-xs text-[#0b291b] focus:outline-hidden focus:border-[#184e34]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#0b291b] block mb-1">
                  Custom Video Lecture URL (Optional mp4 or stream):
                </label>
                <input
                  type="text"
                  value={editVideoUrl}
                  onChange={(e) => setEditVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#fafbf9] border border-[#123e2b]/15 text-xs text-[#0b291b] focus:outline-hidden focus:border-[#184e34]"
                />
              </div>

              <div className="pt-4 border-t border-[#123e2b]/10 flex justify-end">
                <button
                  type="submit"
                  disabled={savingCourse}
                  className="px-6 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#a3e635]" />
                  <span>{savingCourse ? 'Saving Changes...' : 'Save Curriculum Configuration'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: Quizzes & Assessment Thresholds */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold font-display text-[#0b291b]">
              Accredited Assessment Definitions
            </h3>
            <p className="text-xs text-[#5b7b68] mt-1">
              GreenPath requires an 80% passing threshold for all technical evaluations to defend credential authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(COURSE_QUIZZES).map(([courseId, q]) => (
              <div
                key={courseId}
                className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs font-bold text-[#184e34] bg-[#eef4ef] px-2.5 py-1 rounded-lg">
                    {courseId}
                  </div>
                  <span className="text-xs font-bold text-[#0b291b]">
                    Passing Standard: {q.passingScorePercent}%
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#0b291b] font-display">
                  {q.title}
                </h4>

                <div className="text-xs text-[#486352]">
                  {q.questions.length} Objective questions testing regulatory boundaries and equations.
                </div>

                <div className="space-y-2 pt-2 border-t border-[#123e2b]/10 max-h-48 overflow-y-auto pr-1">
                  {q.questions.map((item, idx) => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 text-xs space-y-1">
                      <div className="font-semibold text-[#0b291b]">
                        0{idx + 1}. {item.questionText}
                      </div>
                      <div className="text-[11px] text-[#184e34]">
                        Correct Answer: {item.options[item.correctAnswerIndex]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Learner Records (Real Data Only) */}
      {activeTab === 'learners' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold font-display text-[#0b291b]">
              Auditable Learner Registry
            </h3>
            <p className="text-xs text-[#5b7b68] mt-1">
              Strict data integrity: only real authenticated users and verified enrollments appear here.
            </p>
          </div>

          {overviewData.users.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center text-xs text-[#5b7b68]">
              No registered learners in the database yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#123e2b]/10 text-[#5b7b68] uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Learner ID</th>
                    <th className="pb-3 font-semibold">Full Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Registered Date</th>
                    <th className="pb-3 font-semibold">Enrollments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#123e2b]/5">
                  {overviewData.users.map((u) => {
                    const userEnrollments = overviewData.enrollments.filter((e: any) => e.userId === u.id);

                    return (
                      <tr key={u.id} className="hover:bg-[#fafbf9]">
                        <td className="py-3 font-mono font-bold text-[#0b291b]">{u.id}</td>
                        <td className="py-3 font-medium text-[#0b291b]">{u.fullName}</td>
                        <td className="py-3 text-[#5b7b68]">{u.email}</td>
                        <td className="py-3 text-[#5b7b68] font-mono">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 font-mono text-[#184e34] font-bold">
                          {userEnrollments.length} Active
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
