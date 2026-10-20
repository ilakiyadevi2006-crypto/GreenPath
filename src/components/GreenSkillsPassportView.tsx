import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import {
  ShieldCheck, Award, CheckCircle2, AlertCircle, Search, QrCode,
  Copy, Check, FileCheck, ExternalLink, Compass, Clock, Lock
} from 'lucide-react';

interface GreenSkillsPassportViewProps {
  onExploreCourses: () => void;
  onOpenPlayer: (courseId: string) => void;
}

export const GreenSkillsPassportView: React.FC<GreenSkillsPassportViewProps> = ({
  onExploreCourses,
  onOpenPlayer
}) => {
  const { user, enrollments, certificates } = useAuth();

  const [verifyIdInput, setVerifyIdInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    searched: boolean;
    found: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublicLookup = async (e: React.FormEvent) => {
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
          error: data.error || `No authentic credential found for ID: ${verifyIdInput.trim()}.`
        });
      }
    } catch (err: any) {
      setLookupResult({
        searched: true,
        found: false,
        error: err.message || 'Verification service temporarily unavailable.'
      });
    } finally {
      setVerifying(false);
    }
  };

  // Build Assessed vs Unassessed Skills from real enrollments
  interface SkillItem {
    name: string;
    courseTitle: string;
    courseId: string;
    standard: string;
    isAssessed: boolean;
    scorePercent?: number;
    assessedDate?: string;
  }

  const assessedSkills: SkillItem[] = [];
  const unassessedSkills: SkillItem[] = [];

  enrollments.forEach(enr => {
    const course = LEARNING_PATHS.find(c => c.id === enr.courseId);
    if (!course) return;

    const isPassed = enr.quizResult && enr.quizResult.passed;

    course.outcomes.forEach(outcome => {
      const item: SkillItem = {
        name: outcome,
        courseTitle: course.title,
        courseId: course.id,
        standard: course.standardAlignment,
        isAssessed: !!isPassed,
        scorePercent: enr.quizResult?.scorePercent,
        assessedDate: enr.quizResult?.completedAt
      };

      if (isPassed) {
        assessedSkills.push(item);
      } else {
        unassessedSkills.push(item);
      }
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
          <span>Verifiable Competency Registry</span>
          <span aria-hidden="true">·</span>
          <span>Enterprise Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b291b] font-display">
          Green Skills Passport
        </h1>
        <p className="text-sm sm:text-base text-[#486352] leading-relaxed">
          An auditable digital portfolio that documents your demonstrated climate competencies. GreenPath strictly distinguishes between assessed skills verified through rigorous examination and unassessed skills currently in progress.
        </p>
      </div>

      {/* Passport Document Specimen Card */}
      {user ? (
        <div className="rounded-3xl bg-[#0b291b] text-white p-6 sm:p-10 border border-[#164e34] shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#a3e635] text-[#0b291b] flex items-center justify-center font-bold text-xl font-display">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {user.fullName}
                  </div>
                  <div className="text-xs text-[#cadbce] font-mono">
                    Passport ID: GSP-2026-{user.id.replace('usr_', '').toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-[#cadbce] text-[10px] uppercase font-semibold">Registered Status</span>
                  <div className="font-bold text-[#a3e635] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Learner</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#cadbce] text-[10px] uppercase font-semibold">Verified Credentials</span>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">
                    {certificates.length} Issued
                  </div>
                </div>
                <div>
                  <span className="text-[#cadbce] text-[10px] uppercase font-semibold">Assessed Skills</span>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">
                    {assessedSkills.length} Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Credential Seal */}
            <div className="p-5 rounded-2xl bg-[#113a27] border border-[#184e34] text-xs text-[#cadbce] space-y-2 max-w-sm">
              <div className="flex items-center justify-between text-white font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                  <span>Audit Assurance Standard</span>
                </span>
                <span className="text-[10px] bg-[#0b291b] px-2 py-0.5 rounded text-[#a3e635] font-mono">
                  ISO 14064
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Demonstrated competencies are validated via randomized objective examinations and practical calculation defenses compliant with GHG Protocol corporate reporting guidelines.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white border border-[#123e2b]/15 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-[#65a30d] mx-auto" />
          <h2 className="text-xl font-bold text-[#0b291b] font-display">
            Sign In to Generate Your Green Skills Passport
          </h2>
          <p className="text-xs text-[#5b7b68] max-w-md mx-auto">
            Your passport maps all completed chapters and distinguishes defended assessment skills from in-progress learning.
          </p>
        </div>
      )}

      {/* 2. Skills Matrix: Assessed vs Unassessed */}
      <div className="space-y-6">
        <div className="border-b border-[#123e2b]/10 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b291b] font-display">
              Demonstrated Competencies Matrix
            </h2>
            <p className="text-xs text-[#5b7b68]">
              Verified skills are unlocked solely upon achieving ≥ 80% on accredited course assessments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column A: Assessed Competencies (Verified) */}
          <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
                <h3 className="text-base font-bold text-[#0b291b] font-display">
                  Assessed Skills ({assessedSkills.length})
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#184e34] bg-[#eef4ef] px-2.5 py-0.5 rounded-md font-bold">
                Passed Assessment Defense
              </span>
            </div>

            {assessedSkills.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center space-y-2">
                <FileCheck className="w-8 h-8 text-[#5b7b68] mx-auto opacity-50" />
                <div className="text-xs font-semibold text-[#0b291b]">
                  Zero Assessed Skills Recorded
                </div>
                <p className="text-[11px] text-[#5b7b68] max-w-sm mx-auto leading-relaxed">
                  To add verified skills to your passport, complete all chapters of an enrolled course and pass the final technical assessment with 80% or higher.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {assessedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f0f7f2] border border-[#65a30d]/30 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-[#0b291b] leading-snug">
                        {skill.name}
                      </div>
                      <span className="shrink-0 bg-white px-2 py-0.5 rounded font-mono font-bold text-[#184e34] text-[11px]">
                        {skill.scorePercent}%
                      </span>
                    </div>

                    <div className="text-[11px] text-[#486352] flex items-center justify-between">
                      <span>Standard: {skill.standard}</span>
                      <span>Verified: {new Date(skill.assessedDate || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column B: Unassessed / In-Progress Competencies */}
          <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#5b7b68]" />
                <h3 className="text-base font-bold text-[#0b291b] font-display">
                  In-Progress & Unassessed Skills ({unassessedSkills.length})
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#5b7b68] bg-[#fafbf9] border border-[#123e2b]/10 px-2.5 py-0.5 rounded-md">
                Assessment Pending
              </span>
            </div>

            {unassessedSkills.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-center space-y-2">
                <Compass className="w-8 h-8 text-[#5b7b68] mx-auto opacity-50" />
                <div className="text-xs font-semibold text-[#0b291b]">
                  No In-Progress Tracks
                </div>
                <p className="text-[11px] text-[#5b7b68] max-w-sm mx-auto leading-relaxed">
                  Enroll in a green skills course to begin tracking curriculum competencies.
                </p>
                <button
                  onClick={onExploreCourses}
                  className="px-4 py-2 rounded-xl bg-[#0b291b] text-white text-xs font-semibold hover:bg-[#123e2b] cursor-pointer mt-2"
                >
                  Explore Learning Paths
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {unassessedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-[#2d4737] leading-snug">
                        {skill.name}
                      </div>
                      <span className="shrink-0 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pending Quiz
                      </span>
                    </div>

                    <div className="text-[11px] text-[#5b7b68] flex items-center justify-between">
                      <span className="truncate pr-2">{skill.courseTitle}</span>
                      <button
                        onClick={() => onOpenPlayer(skill.courseId)}
                        className="text-[#184e34] font-semibold hover:underline shrink-0 cursor-pointer"
                      >
                        Complete Assessment →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 3. Earned Certificates Registry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b291b] font-display">
              Verified Digital Credentials
            </h2>
            <p className="text-xs text-[#5b7b68]">
              Cryptographically registered credentials issued for 100% course and assessment completion.
            </p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#123e2b]/15 text-center space-y-3">
            <Award className="w-10 h-10 text-[#5b7b68] mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#0b291b]">
              Zero Certificates Earned
            </h3>
            <p className="text-xs text-[#5b7b68] max-w-md mx-auto">
              GreenPath does not issue participation certificates. Certificates are awarded only after completing all lessons and scoring 80% or higher on the official technical assessment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4 hover:border-[#184e34]/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#184e34]" />
                    <span className="font-mono font-bold text-sm text-[#0b291b]">{cert.id}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(cert.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-[#5b7b68] text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copiedId === cert.id ? <Check className="w-3.5 h-3.5 text-[#184e34]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === cert.id ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0b291b] font-display">
                    {cert.courseTitle}
                  </h3>
                  <div className="text-xs text-[#5b7b68] mt-1">
                    Issued to {cert.learnerName} on {new Date(cert.issuedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eef4ef] text-xs text-[#184e34] flex items-center justify-between font-mono">
                  <span>Examination Score:</span>
                  <span className="font-bold">{cert.scorePercent}%</span>
                </div>

                <div className="pt-2 border-t border-[#123e2b]/10 text-[11px] text-[#5b7b68]">
                  Verified Standards: {cert.standardsVerified?.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Public Verification Registry Lookup Tool */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#fafbf9] border border-[#123e2b]/15 space-y-6">
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
            <Search className="w-4 h-4 text-[#65a30d]" />
            <span>Public Audit Registry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b291b] font-display">
            Verify Any GreenPath Credential
          </h2>
          <p className="text-xs text-[#486352] leading-relaxed">
            Employers, academic partners, and compliance auditors can enter a GreenPath Credential ID below to verify its authenticity against our persistent registry.
          </p>
        </div>

        <form onSubmit={handlePublicLookup} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            value={verifyIdInput}
            onChange={(e) => setVerifyIdInput(e.target.value)}
            placeholder="e.g. GP-2026-681BF6"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#123e2b]/15 text-xs text-[#0b291b] font-mono uppercase placeholder:text-[#5b7b68] focus:outline-hidden focus:border-[#184e34]"
          />
          <button
            type="submit"
            disabled={verifying || !verifyIdInput.trim()}
            className="px-6 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-40 cursor-pointer whitespace-nowrap"
          >
            {verifying ? 'Auditing Registry...' : 'Audit Credential'}
          </button>
        </form>

        {/* Verification Result Feedback */}
        {lookupResult && (
          <div className={`p-6 rounded-2xl border text-xs max-w-xl ${
            lookupResult.found
              ? 'bg-[#f0f7f2] border-[#65a30d]/40 text-[#184e34]'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            {lookupResult.found ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
                  <span>Verified Authentic Credential</span>
                </div>
                <div className="space-y-1 pl-7 font-sans">
                  <div><strong>Credential ID:</strong> <span className="font-mono">{lookupResult.data.id}</span></div>
                  <div><strong>Awarded To:</strong> {lookupResult.data.learnerName}</div>
                  <div><strong>Curriculum:</strong> {lookupResult.data.courseTitle}</div>
                  <div><strong>Defended Assessment Score:</strong> {lookupResult.data.scorePercent}%</div>
                  <div><strong>Issue Timestamp:</strong> {new Date(lookupResult.data.issuedAt).toUTCString()}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <div className="font-bold">Credential Verification Failed</div>
                  <div className="mt-1 leading-relaxed">{lookupResult.error}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
