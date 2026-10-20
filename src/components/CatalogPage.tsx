import React, { useState } from 'react';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath, LearningCategory } from '../types';
import {
  BookOpen, Clock, CheckCircle2, Award, ChevronRight, Lock, AlertCircle,
  FileText, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CatalogPageProps {
  onSelectCourse: (course: LearningPath) => void;
  onEnrollCourse: (course: LearningPath) => void;
  onOpenStudy: (course: LearningPath) => void;
}

const CATEGORIES: ('All' | LearningCategory)[] = [
  'All',
  'Sustainability Fundamentals',
  'Green IT',
  'Waste Management',
  'Energy Efficiency',
  'Water Conservation',
  'Climate Awareness',
  'Sustainable Transportation',
  'Sustainable Agriculture'
];

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectCourse,
  onEnrollCourse,
  onOpenStudy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | LearningCategory>('All');
  const { enrollments } = useAuth();

  const filteredCourses = selectedCategory === 'All'
    ? LEARNING_PATHS
    : LEARNING_PATHS.filter(c => c.category === selectedCategory);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.courseId === courseId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#184e34] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#65a30d]" />
          <span>Curriculum Catalog</span>
          <span aria-hidden="true">·</span>
          <span>Verified Green Skills</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b291b] font-display">
          Green Skills Learning Paths
        </h1>
        <p className="text-sm sm:text-base text-[#486352] leading-relaxed">
          Explore technical learning tracks across 8 core sustainability disciplines. Tracks with full verified coursework are available for immediate enrollment; tracks currently under peer-review are clearly marked.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0b291b] text-white shadow-xs'
                : 'bg-white text-[#486352] hover:bg-[#eef4ef] hover:text-[#0b291b] border border-[#123e2b]/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);

          return (
            <div
              key={course.id}
              className={`rounded-3xl bg-white border overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                course.isAvailable
                  ? 'border-[#123e2b]/15 hover:border-[#184e34]/40 hover:shadow-md'
                  : 'border-[#123e2b]/10 opacity-90'
              }`}
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] bg-[#eef4ef] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.imageAlt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-[#0b291b]/85 backdrop-blur-xs text-[#a3e635] px-2.5 py-1 rounded-lg font-medium text-[11px]">
                    {course.category}
                  </span>
                  
                  {course.isAvailable ? (
                    <span className="bg-white/90 backdrop-blur-xs text-[#0b291b] px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                      {course.level}
                    </span>
                  ) : (
                    <span className="bg-amber-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg font-semibold text-[11px] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#cadbce]">
                    {course.isAvailable ? (
                      <>
                        <span>{course.durationHours} Hours</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.moduleCount} Modules</span>
                      </>
                    ) : (
                      <span>In Development</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[#0b291b] font-display line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#486352] line-clamp-3 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Learning Objectives Preview */}
                  {course.learningObjectives && course.learningObjectives.length > 0 && (
                    <div className="pt-2 space-y-1.5 border-t border-[#123e2b]/5">
                      <div className="text-[11px] font-semibold text-[#184e34] uppercase tracking-wider">
                        Learning Objectives:
                      </div>
                      <div className="space-y-1 text-xs text-[#2d4737]">
                        {course.learningObjectives.slice(0, 2).map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Unavailable Notice */}
                  {!course.isAvailable && course.comingSoonMessage && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                      <span className="leading-relaxed">{course.comingSoonMessage}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#123e2b]/10 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-[#123e2b]/20 hover:bg-[#eef4ef] text-xs font-semibold text-[#0b291b] transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  {course.isAvailable ? (
                    enrolled ? (
                      <button
                        onClick={() => onOpenStudy(course)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Continue</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#a3e635]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onEnrollCourse(course)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-[#a3e635]" />
                        <span>Enroll</span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed text-center"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
