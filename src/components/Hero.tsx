import React from 'react';
import { ArrowRight, Sparkles, BookOpen, CheckSquare, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onMentorClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onMentorClick }) => {
  return (
    <section className="bg-white border-b border-gray-200 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Subtle Tagline / Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0E8] text-[#246B45] text-xs font-semibold uppercase tracking-wider mb-6">
          <span>AI-Powered Green Skills Platform</span>
        </div>

        {/* Required Heading: "Learn Green Skills. Make Every Skill Count." */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#252925] font-display mb-5 text-balance">
          Learn Green Skills.{' '}
          <span className="text-[#246B45]">Make Every Skill Count.</span>
        </h1>

        {/* Required Description */}
        <p className="text-base sm:text-lg text-[#59655b] max-w-2xl mx-auto mb-8 sm:mb-10 text-balance leading-relaxed">
          Build practical sustainability skills through structured lessons, interactive quizzes, and real-world activities.
        </p>

        {/* Required Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white font-medium text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Learning Paths</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onMentorClick}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E8F0E8] hover:bg-[#d8e8d8] text-[#246B45] font-medium text-sm transition-colors border border-[#246B45]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#246B45]" />
            <span>Meet EcoMentor AI</span>
          </button>
        </div>

        {/* Clean, Simple Feature Highlights */}
        <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#252925]">Structured Chapters</div>
              <p className="text-xs text-[#59655b] mt-0.5">Sequential modules with practical reading materials and videos.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center shrink-0 mt-0.5">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#252925]">Chapter Quizzes</div>
              <p className="text-xs text-[#59655b] mt-0.5">Interactive questions and activities after each chapter.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#252925]">Verified Certificates</div>
              <p className="text-xs text-[#59655b] mt-0.5">Earn auditable certificates upon passing final course assessments.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
