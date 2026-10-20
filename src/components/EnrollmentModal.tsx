import React, { useState } from 'react';
import { LearningPath } from '../types';
import { X, CheckCircle2, Award, ArrowRight, BookOpen, Bot } from 'lucide-react';

interface EnrollmentModalProps {
  course: LearningPath | null;
  onClose: () => void;
  onOpenMentorWithContext: (course: LearningPath) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  course,
  onClose,
  onOpenMentorWithContext,
}) => {
  const [learnerName, setLearnerName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Sustainability Professional');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim() || !email.trim()) {
      setErrorMsg('Please enter both your name and email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSuccess(true);
  };

  const handleDownloadSyllabus = () => {
    const textContent = `GREENPATH - COURSE SYLLABUS OUTLINE
Course: ${course.title}
Level: ${course.level}
Duration: ${course.durationHours} Hours
Standard: ${course.standardAlignment}

OVERVIEW:
${course.summary}

KEY OUTCOMES:
${course.outcomes.map((o) => `- ${o}`).join('\n')}

MODULES:
${course.syllabus
  .map(
    (m) =>
      `Module ${m.moduleNumber}: ${m.title} (${m.durationHours}h)\nPractical Lab: ${m.practicalProject}\nLessons:\n${m.lessons
        .map((l) => `  * ${l.title} (${l.format}, ${l.durationMinutes}m)`)
        .join('\n')}`
  )
  .join('\n\n')}

TOOLS & METHODOLOGIES:
${course.toolsAndStandards.join(', ')}

Issued by GreenPath Learning Platform. Verified Accreditation.
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course.id}-syllabus.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-[#123e2b]/15 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          aria-label="Close enrollment modal"
          className="absolute top-5 right-5 text-[#5b7b68] hover:text-[#0b291b] p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-[#65a30d]" />
              <span>Enrollment Admission</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0b291b] font-display mb-1">
              Enroll in {course.title}
            </h3>
            <p className="text-xs text-[#5b7b68] mb-6">
              {course.durationHours} Hours · {course.moduleCount} Modules · {course.standardAlignment}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0b291b] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#123e2b]/20 focus:border-[#0b291b] focus:ring-1 focus:ring-[#0b291b] text-sm text-[#0b291b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b291b] mb-1">
                  Work / Educational Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@company.org"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#123e2b]/20 focus:border-[#0b291b] focus:ring-1 focus:ring-[#0b291b] text-sm text-[#0b291b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b291b] mb-1">
                  Professional Focus
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#123e2b]/20 focus:border-[#0b291b] focus:ring-1 focus:ring-[#0b291b] text-sm text-[#0b291b] bg-white outline-none cursor-pointer"
                >
                  <option value="Sustainability Professional">Sustainability Professional / ESG Lead</option>
                  <option value="Clean Energy Engineer">Clean Energy / Electrical Engineer</option>
                  <option value="Product Designer">Industrial / Product Designer</option>
                  <option value="Career Switcher">Career Switcher Transitioning to Climate</option>
                  <option value="Graduate Student">Graduate Student / Researcher</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Enrollment</span>
                  <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                </button>
              </div>

              <p className="text-[11px] text-[#5b7b68] text-center pt-1">
                Zero spam policy. Includes instant laboratory workbench and EcoMentor AI access.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#eef4ef] text-[#184e34] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#65a30d]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#0b291b] font-display">
                Enrollment Confirmed!
              </h3>
              <p className="text-sm text-[#486352]">
                Welcome aboard, <strong className="text-[#0b291b]">{learnerName}</strong>. You are enrolled in <span className="font-semibold text-[#0b291b]">{course.title}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5b7b68]">Assigned Track ID:</span>
                <span className="font-mono font-bold text-[#0b291b]">GP-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b7b68]">Access Pacing:</span>
                <span className="font-semibold text-[#184e34]">Immediate Active Access</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b7b68]">Mentor Status:</span>
                <span className="font-semibold text-[#0b291b]">EcoMentor AI Linked</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenMentorWithContext(course);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#a3e635]" />
                <span>Launch First Module with EcoMentor AI</span>
              </button>

              <button
                onClick={handleDownloadSyllabus}
                className="w-full py-2.5 px-4 rounded-xl bg-[#eef4ef] hover:bg-[#e2ede4] text-[#0b291b] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#184e34]" />
                <span>Download Full Course Syllabus (.txt)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-[#5b7b68] hover:text-[#0b291b] transition-colors cursor-pointer"
              >
                Return to GreenPath Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
