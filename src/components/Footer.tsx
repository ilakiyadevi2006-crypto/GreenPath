import React, { useState } from 'react';
import { Leaf, X, Mail, HelpCircle, Info, FileText } from 'lucide-react';

type ModalType = 'about' | 'help' | 'privacy' | 'contact' | null;

interface FooterProps {
  onNavigateLearn?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateLearn }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Brand Block */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E8F0E8] flex items-center justify-center text-[#246B45]">
                  <Leaf className="w-4 h-4 text-[#246B45]" />
                </div>
                <span className="text-base font-bold text-[#252925] font-display">
                  GreenPath
                </span>
              </div>
              <p className="text-xs text-[#59655b] max-w-sm">
                Learn Green Skills. Make Every Skill Count. An inclusive learning platform for practical sustainability education.
              </p>
            </div>

            {/* Essential Links (Section 4 E) */}
            <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#59655b] font-medium">
              <button
                onClick={() => setActiveModal('about')}
                className="hover:text-[#246B45] transition-colors cursor-pointer"
              >
                About GreenPath
              </button>
              <button
                onClick={() => {
                  if (onNavigateLearn) {
                    onNavigateLearn();
                  } else {
                    window.location.hash = 'courses';
                  }
                }}
                className="hover:text-[#246B45] transition-colors cursor-pointer"
              >
                Learning Paths
              </button>
              <button
                onClick={() => setActiveModal('help')}
                className="hover:text-[#246B45] transition-colors cursor-pointer"
              >
                Help
              </button>
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-[#246B45] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('contact')}
                className="hover:text-[#246B45] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Copyright */}
            <div className="text-xs text-gray-400 text-center md:text-right">
              <div>© {new Date().getFullYear()} GreenPath. All rights reserved.</div>
            </div>

          </div>
        </div>
      </footer>

      {/* Clean, Simple Modals */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-100"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 text-[#252925] shadow-lg relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-[#252925] hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content: About */}
            {activeModal === 'about' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#246B45]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold">About GreenPath</h3>
                </div>
                <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider">
                  TAGLINE: Learn Green Skills. Make Every Skill Count.
                </div>
                <div className="text-sm text-[#59655b] space-y-3 leading-relaxed">
                  <p>
                    GreenPath is a simple, accessible learning platform designed for people of all ages and backgrounds who want to build practical sustainability skills.
                  </p>
                  <p>
                    From corporate ESG strategy and green software engineering to industrial energy efficiency and circular waste management, our curriculum delivers structured chapters, video lectures, and real-world calculation exercises.
                  </p>
                  <p>
                    Supported by EcoMentor AI, learners receive personalized explanations and practice opportunities without leaving their lessons.
                  </p>
                </div>
              </div>
            )}

            {/* Modal: Help */}
            {activeModal === 'help' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#246B45]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold">Help & Guide</h3>
                </div>
                <div className="text-sm text-[#59655b] space-y-3 leading-relaxed">
                  <div className="p-3 rounded-lg bg-[#fafbf9] border border-gray-200 space-y-1">
                    <div className="font-semibold text-[#252925]">How do I start learning?</div>
                    <p className="text-xs">
                      Navigate to the <strong>Learn</strong> tab. Choose any available course, click "Explore Course" or "Enroll", and begin chapter 1.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#fafbf9] border border-gray-200 space-y-1">
                    <div className="font-semibold text-[#252925]">How do quizzes work?</div>
                    <p className="text-xs">
                      Each chapter includes practice questions. When you finish all chapters, complete the final assessment quiz (passing score: 80%) to unlock your verified certificate.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#fafbf9] border border-gray-200 space-y-1">
                    <div className="font-semibold text-[#252925]">How does EcoMentor AI work?</div>
                    <p className="text-xs">
                      EcoMentor AI is always available via the navigation bar or within any active lesson. Ask it to explain difficult concepts, break down carbon calculations, or generate practice questions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal: Privacy Policy */}
            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#246B45]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold">Privacy Policy</h3>
                </div>
                <div className="text-sm text-[#59655b] space-y-3 leading-relaxed">
                  <p>
                    At GreenPath, we respect your privacy and handle all learner data with care and transparency.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>We only store essential account details: your name, email, and password hash.</li>
                    <li>We record your actual lesson completions and quiz scores to verify credentials.</li>
                    <li>We never sell, distribute, or monetize your personal information.</li>
                    <li>EcoMentor AI queries are processed solely to provide educational explanations.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Modal: Contact */}
            {activeModal === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#246B45]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold">Contact GreenPath</h3>
                </div>
                <p className="text-sm text-[#59655b] leading-relaxed">
                  Have questions about our green skills curriculum or need technical support? We would love to hear from you.
                </p>
                <div className="p-3.5 rounded-lg bg-[#fafbf9] border border-gray-200 text-xs text-[#252925] space-y-1.5">
                  <div><strong>General Inquiries:</strong> contact@greenpath.org</div>
                  <div><strong>Support:</strong> support@greenpath.org</div>
                  <div><strong>Location:</strong> Global Digital Learning Platform</div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
