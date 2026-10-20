import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, FileCheck, Award, Lock } from 'lucide-react';

export const CertificateHighlights: React.FC = () => {
  const { user, enrollments } = useAuth();

  const [searchId, setSearchId] = useState('');
  const [searching, setSearching] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    searched: boolean;
    found: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearching(true);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(searchId.trim())}`);
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
          error: data.error || `No authentic credential found for ID: ${searchId.trim()}.`
        });
      }
    } catch (err: any) {
      setLookupResult({
        searched: true,
        found: false,
        error: 'Network error communicating with verification registry.'
      });
    } finally {
      setSearching(false);
    }
  };

  return (
    <section id="credentials" className="py-16 lg:py-24 bg-[#fafbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold text-[#184e34] uppercase tracking-wider mb-2">
            Verifiable Standards & Verification
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b291b] font-display tracking-tight text-balance">
            Tamper-Proof Climate Credentials
          </h2>
          <p className="mt-3 text-base text-[#486352] leading-relaxed">
            GreenPath does not issue participation badges or unverified certificates. Credentials are awarded solely upon 100% chapter completion and passing the technical assessment with at least 80%.
          </p>
        </div>

        {/* 2-Column Grid: Live Verification Tool + Standards Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Public Credential Lookup Tool (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#123e2b]/15 shadow-sm space-y-6">
            
            <div className="border-b border-[#123e2b]/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                <span>Public Verification Registry</span>
              </div>
              <h3 className="text-xl font-bold text-[#0b291b] font-display">
                Verify a Graduate's Credential
              </h3>
              <p className="text-xs text-[#5b7b68] mt-1">
                Enter any GreenPath Credential Identifier to audit authenticity directly against our secure database.
              </p>
            </div>

            {/* Verification Search Form */}
            <form onSubmit={handleVerify} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. GP-2026-XXXX"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#123e2b]/20 focus:border-[#0b291b] text-sm text-[#0b291b] font-mono outline-none"
                  />
                  <Search className="w-4 h-4 text-[#5b7b68] absolute left-3 top-3 pointer-events-none" />
                </div>

                <button
                  type="submit"
                  disabled={searching || !searchId.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  {searching ? <span>Verifying...</span> : <span>Verify Credential</span>}
                </button>
              </div>
              <div className="text-[11px] text-[#5b7b68]">
                Authentic certificates are generated upon completed course milestones.
              </div>
            </form>

            {/* Verification Result Display */}
            {lookupResult && lookupResult.searched && (
              <div className="pt-2 animate-in fade-in duration-200">
                {lookupResult.found && lookupResult.data ? (
                  /* Verified Certificate Found */
                  <div className="p-5 rounded-2xl bg-[#eef4ef] border border-[#184e34]/20 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#184e34] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
                        Official Verified Credential
                      </span>
                      <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded text-[#0b291b] font-bold">
                        {lookupResult.data.id}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1 text-[#2d4737]">
                      <div>
                        <span className="text-[#5b7b68]">Recipient: </span>
                        <strong className="text-[#0b291b]">{lookupResult.data.learnerName}</strong>
                      </div>
                      <div>
                        <span className="text-[#5b7b68]">Curriculum Track: </span>
                        <span className="font-semibold text-[#0b291b]">{lookupResult.data.courseTitle}</span>
                      </div>
                      <div>
                        <span className="text-[#5b7b68]">Verified Assessment Score: </span>
                        <span className="font-mono font-semibold text-[#184e34]">{lookupResult.data.scorePercent}%</span>
                      </div>
                      <div>
                        <span className="text-[#5b7b68]">Issue Date: </span>
                        <span>{new Date(lookupResult.data.issuedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#184e34]/15">
                      <div className="text-[11px] font-semibold text-[#184e34] mb-1">
                        Accredited Standards:
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#486352]">
                        {lookupResult.data.standardsVerified?.map((std: string, idx: number) => (
                          <li key={idx}>{std}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  /* Credential Not Found */
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                    <div>
                      <div className="font-semibold text-amber-900">Record Not Found</div>
                      <div className="mt-0.5 text-amber-800 leading-relaxed">
                        {lookupResult.error}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Informational Notice */}
            <div className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-xs text-[#486352] flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#184e34] shrink-0 mt-0.5" />
              <span>
                To ensure institutional trust, GreenPath does not display sample user certificates or invented completion certificates. Only authentic student records are accessible in this portal.
              </span>
            </div>

          </div>

          {/* Right Column: Standards & Criteria (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-white border border-[#123e2b]/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef4ef] flex items-center justify-center text-[#184e34]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0b291b] font-display">
                Three-Pillar Criteria for Issuance
              </h3>
              <div className="space-y-2 text-xs text-[#486352] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#0b291b]">1.</span>
                  <span><strong>100% Chapter Completion:</strong> All technical modules and calculation workbooks must be finished.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#0b291b]">2.</span>
                  <span><strong>Assessment Benchmark:</strong> Learners must achieve $\ge 80\%$ on the end-of-track technical evaluation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#0b291b]">3.</span>
                  <span><strong>Cryptographic Hash:</strong> Every credential receives a permanent tamper-proof lookup identifier.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b291b] text-white border border-[#164e34] space-y-3">
              <div className="text-xs font-semibold text-[#a3e635] uppercase tracking-wider">
                Alignment Standards
              </div>
              <p className="text-xs text-[#cadbce] leading-relaxed">
                GreenPath certifications strictly follow international frameworks:
              </p>
              <ul className="space-y-1.5 text-xs text-[#f0f6f2]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>GHG Protocol Corporate Standard (WRI / WBCSD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>ISO 14064-1:2018 (Specification for GHG Quantifications)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>IEEE 1547-2018 (Clean Grid Interconnection)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>ISO 14040/14044 (Life Cycle Assessment)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
