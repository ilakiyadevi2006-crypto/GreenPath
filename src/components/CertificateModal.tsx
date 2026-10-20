import React, { useState } from 'react';
import { Award, ShieldCheck, Printer, Download, Copy, Check, X, ExternalLink } from 'lucide-react';

export interface CertificateData {
  id: string;
  learnerName: string;
  courseTitle: string;
  scorePercent: number;
  scoreMarks?: number;
  totalMarks?: number;
  issuedAt: string;
  standardsVerified?: string[];
}

interface CertificateModalProps {
  certificate: CertificateData;
  onClose: () => void;
  onVerifyLookup?: (id: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onVerifyLookup
}) => {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scoreMarks = certificate.scoreMarks !== undefined
    ? certificate.scoreMarks
    : Math.round((certificate.scorePercent / 100) * (certificate.totalMarks || 60));
  const totalMarks = certificate.totalMarks || 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static animate-in fade-in">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-3xl w-full my-auto overflow-hidden print:border-none print:shadow-none print:max-w-none print:m-0 print:w-full">
        
        {/* Top Controls Bar (Hidden during print) */}
        <div className="px-5 py-3.5 bg-[#246B45] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-300" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Official GreenPath Certificate of Completion
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Close Certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRISTINE CERTIFICATE CANVAS
            Approved GreenPath Forest-Green and White Palette, Clean Typography, Subtle Border
           ========================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 bg-white print:p-8">
          <div className="border-4 border-double border-[#246B45]/40 rounded-xl p-6 sm:p-10 md:p-12 text-center space-y-6 relative bg-linear-to-b from-white via-[#fafbf9] to-white">
            
            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#246B45]/60" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#246B45]/60" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#246B45]/60" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#246B45]/60" />

            {/* Wordmark Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md bg-[#E8F0E8] text-[#246B45] text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GREENPATH ACADEMY</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display uppercase tracking-wider text-[#246B45] pt-2">
                CERTIFICATE OF COMPLETION
              </h1>
            </div>

            {/* Award Line */}
            <div className="text-xs sm:text-sm text-[#59655b] font-medium italic">
              This certificate is proudly awarded to
            </div>

            {/* Learner's Registered Full Name */}
            <div className="py-2 border-b-2 border-[#246B45]/30 max-w-md mx-auto">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#252925] tracking-tight">
                {certificate.learnerName}
              </div>
            </div>

            {/* Course Title and Achievement Statement */}
            <div className="space-y-2 max-w-xl mx-auto">
              <div className="text-xs sm:text-sm text-[#59655b]">
                for successfully completing all coursework, practical exercises, and the comprehensive examination for
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold font-display uppercase text-[#246B45] tracking-wide">
                {certificate.courseTitle}
              </div>
            </div>

            {/* Assessment Scores Box */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-lg bg-[#fafbf9] border border-[#246B45]/20 text-xs sm:text-sm text-[#252925] font-semibold">
              <div>
                <span className="text-[#59655b] font-normal">Final Assessment: </span>
                <span className="font-mono text-[#246B45] font-bold">{scoreMarks}/{totalMarks}</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <div>
                <span className="text-[#59655b] font-normal">Percentage: </span>
                <span className="font-mono text-[#246B45] font-bold">{certificate.scorePercent}%</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <div>
                <span className="text-[#59655b] font-normal">Date of Completion: </span>
                <span className="text-[#252925]">{formattedDate}</span>
              </div>
            </div>

            {/* Standards Alignment & Verification Footer */}
            <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs text-[#59655b]">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#246B45]">
                  Verification Details
                </div>
                <div className="font-mono text-[#252925] font-bold text-xs select-all">
                  Certificate ID: {certificate.id}
                </div>
                <div className="text-[11px] text-gray-500">
                  Verify authenticity at greenpath.org/verify using the unique ID above.
                </div>
              </div>

              <div className="sm:text-right space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#246B45]">
                  Accredited Alignment
                </div>
                <div className="text-[11px] font-semibold text-[#252925]">
                  Green Software Foundation SCI · Energy Star · e-Stewards
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  GreenPath Verified Registry Record
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Actions (Hidden during print) */}
        <div className="px-6 py-4 bg-[#fafbf9] border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-center gap-2 text-gray-500 font-mono text-[11px]">
            <span>ID: {certificate.id}</span>
            <button
              onClick={handleCopyId}
              className="text-[#246B45] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF / Print</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-[#252925] font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
