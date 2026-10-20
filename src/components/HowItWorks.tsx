import React from 'react';
import { BookOpen, CheckSquare, TrendingUp, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExploreClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreClick }) => {
  const steps = [
    {
      number: '1',
      title: 'Learn',
      subtitle: 'Structured Chapters & Videos',
      description: 'Study sequentially organized chapters and watch educational videos covering environmental frameworks, engineering standards, and real-world case studies.',
      icon: <BookOpen className="w-5 h-5 text-[#246B45]" />
    },
    {
      number: '2',
      title: 'Practice',
      subtitle: 'Interactive Quizzes & Activities',
      description: 'Reinforce what you learn through chapter quizzes and practical calculation exercises designed to test recall and apply principles immediately.',
      icon: <CheckSquare className="w-5 h-5 text-[#246B45]" />
    },
    {
      number: '3',
      title: 'Track Your Progress',
      subtitle: 'Milestones & Certificates',
      description: 'Track completed lessons in real time, view quiz scores, and unlock verifiable digital certificates upon passing the course final assessment.',
      icon: <TrendingUp className="w-5 h-5 text-[#246B45]" />
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider mb-2">
            Clear Learning Path
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-[#59655b]">
            A straightforward three-step method to acquire practical green skills and track genuine mastery.
          </p>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#fafbf9] rounded-xl border border-gray-200 p-6 flex flex-col justify-between hover:border-[#246B45]/30 transition-all duration-200"
            >
              <div>
                {/* Step Top: Number badge and icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-bold text-[#246B45]/25 font-mono">
                    0{step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-[#252925] mb-1">
                  {step.number}. {step.title}
                </h3>
                <div className="text-xs font-semibold text-[#246B45] mb-3">
                  {step.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-[#59655b] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Step Indicator */}
              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500">
                <span>Step {step.number} of 3</span>
                <span className="text-[#246B45] font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Action Prompt */}
        <div className="mt-10 text-center">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#246B45] hover:underline cursor-pointer"
          >
            <span>Ready to start learning? Explore available courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
