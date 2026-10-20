import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_PATHS } from '../data/courses';
import { CertificateModal } from './CertificateModal';
import {
  Award, ShieldCheck, CheckCircle2, QrCode, Copy, Check, ExternalLink,
  Printer, ArrowRight, Compass, Clock, FileCheck
} from 'lucide-react';

interface AchievementsViewProps {
  onExploreCourses: () => void;
  onOpenPassport: () => void;
  onOpenPlayer: (courseId: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  onExploreCourses,
  onOpenPassport,
  onOpenPlayer
}) => {
  const { user, enrollments, certificates } = useAuth();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Find fully completed courses (where all lessons are finished + quiz passed)
  const completedPaths = enrollments
    .map(enr => {
      const course = LEARNING_PATHS.find(c => c.id === enr.courseId);
      if (!course) return null;
      const totalLessons = course.syllabus.flatMap(m => m.lessons).length;
      const isFinished = enr.completedLessons.length >= totalLessons && totalLessons > 0;
      const isQuizPassed = enr.quizResult && enr.quizResult.passed;
      if (isFinished && isQuizPassed) {
        return {
          course,
          enrollment: enr,
          certificate: certificates.find(c => c.courseId === course.id)
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Calculate real average score of passed assessments
  const passedQuizzes = enrollments.filter(e => e.quizResult?.passed);
  const averageScore = passedQuizzes.length > 0
    ? Math.round(passedQuizzes.reduce((acc, curr) => acc + (curr.quizResult?.scorePercent || 0), 0) / passedQuizzes.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#65a30d]" />
          <span>Accredited Records</span>
          <span aria-hidden="true">·</span>
          <span>Verified Achievement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b291b] font-display">
          Learning Achievements & Credentials
        </h1>
        <p className="text-sm sm:text-base text-[#486352] leading-relaxed">
          Permanent records of completed green skills curriculums and industry-recognized digital credentials. GreenPath guarantees zero fabrication: achievements reflect authentic completed lessons and assessed examinations.
        </p>
      </div>

      {/* Aggregate Achievements Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Completed Tracks</span>
          <div className="text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {completedPaths.length}
          </div>
          <p className="text-xs text-[#5b7b68]">100% lessons & assessment passed</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-[#5b7b68] uppercase tracking-wider">Earned Certificates</span>
          <div className="text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {certificates.length}
          </div>
          <p className="text-xs text-[#5b7b68]">Cryptographically signed credentials</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#eef4ef] border border-[#184e34]/20 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-[#184e34] uppercase tracking-wider">Assessment Average</span>
          <div className="text-3xl font-bold text-[#0b291b] font-mono tabular-nums">
            {averageScore > 0 ? `${averageScore}%` : 'N/A'}
          </div>
          <p className="text-xs text-[#486352]">Technical evaluation defense score</p>
        </div>
      </div>

      {/* 2. Completed Learning Tracks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b291b] font-display">
              Completed Learning Paths ({completedPaths.length})
            </h2>
            <p className="text-xs text-[#5b7b68]">
              Curriculums where you have satisfied all module workbooks and technical quizzes.
            </p>
          </div>
        </div>

        {completedPaths.length === 0 ? (
          <div className="p-10 rounded-3xl bg-white border border-[#123e2b]/15 text-center space-y-3">
            <Compass className="w-10 h-10 text-[#5b7b68] mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#0b291b]">
              Zero Completed Paths Recorded
            </h3>
            <p className="text-xs text-[#5b7b68] max-w-md mx-auto leading-relaxed">
              To earn course completion recognition, complete 100% of chapters in an enrolled course and pass the final technical assessment with 80% or higher.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreCourses}
                className="px-5 py-2.5 rounded-xl bg-[#0b291b] text-white text-xs font-semibold hover:bg-[#123e2b] cursor-pointer inline-flex items-center gap-2"
              >
                <span>Browse Learning Paths</span>
                <ArrowRight className="w-4 h-4 text-[#a3e635]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedPaths.map(({ course, enrollment, certificate }) => (
              <div
                key={course.id}
                className="p-6 rounded-3xl bg-white border border-[#123e2b]/15 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#184e34] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#184e34] bg-[#eef4ef] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
                      Completed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b291b] font-display">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#486352] line-clamp-2">
                    {course.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/10 text-xs text-[#2d4737] flex items-center justify-between">
                    <span>Defended Assessment Score:</span>
                    <span className="font-mono font-bold text-[#184e34]">
                      {enrollment.quizResult?.scorePercent}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#123e2b]/10 flex items-center justify-between">
                  {certificate ? (
                    <button
                      onClick={() => setSelectedCert(certificate)}
                      className="px-4 py-2 rounded-xl bg-[#0b291b] text-white text-xs font-semibold hover:bg-[#123e2b] cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4 text-[#a3e635]" />
                      <span>View Credential</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[#5b7b68]">Certificate Claimable</span>
                  )}

                  <button
                    onClick={() => onOpenPlayer(course.id)}
                    className="text-xs font-semibold text-[#184e34] hover:underline cursor-pointer"
                  >
                    Review Materials
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Earned Certificates Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b291b] font-display">
              Earned Digital Certificates ({certificates.length})
            </h2>
            <p className="text-xs text-[#5b7b68]">
              Registered certificates can be verified publicly by auditors and employers.
            </p>
          </div>
          <button
            onClick={onOpenPassport}
            className="text-xs font-semibold text-[#184e34] hover:underline cursor-pointer"
          >
            Open Skills Passport →
          </button>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#fafbf9] border border-[#123e2b]/10 text-center text-xs text-[#5b7b68]">
            No certificates earned yet. Pass the final assessment of any course to receive an accredited digital certificate.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-3xl bg-[#0b291b] text-white border border-[#164e34] shadow-md space-y-4 flex flex-col justify-between group hover:border-[#a3e635]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#cadbce]">
                    <span className="font-mono text-[#a3e635] font-bold">{cert.id}</span>
                    <span>{new Date(cert.issuedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display line-clamp-2">
                    {cert.courseTitle}
                  </h3>

                  <div className="text-xs text-[#cadbce]">
                    Awarded to <strong>{cert.learnerName}</strong> with an examination score of <strong>{cert.scorePercent}%</strong>.
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Specimen</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#a3e635]" />
                  </button>

                  <button
                    onClick={() => handleCopy(cert.id)}
                    className="text-xs text-[#cadbce] hover:text-white cursor-pointer"
                  >
                    {copiedId === cert.id ? 'Copied' : 'Copy ID'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}

    </div>
  );
};
