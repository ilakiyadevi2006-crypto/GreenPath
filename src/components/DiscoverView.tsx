import React, { useState, useMemo } from 'react';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath, LearningCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Search, BookOpen, Clock, CheckCircle2, ChevronRight,
  ArrowRight, Leaf, Laptop, Recycle, Zap
} from 'lucide-react';

interface DiscoverViewProps {
  onSelectCourse: (course: LearningPath) => void;
  onEnrollCourse: (course: LearningPath) => void;
  onOpenPlayer: (course: LearningPath) => void;
  onOpenMentor: () => void;
}

const CATEGORIES = [
  'All',
  'Green IT',
  'Sustainability Fundamentals',
  'Waste Management',
  'Energy Efficiency'
] as const;

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onSelectCourse,
  onEnrollCourse,
  onOpenPlayer,
  onOpenMentor
}) => {
  const { enrollments } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.courseId === courseId);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Green IT':
        return <Laptop className="w-4 h-4 text-[#246B45]" />;
      case 'Sustainability Fundamentals':
        return <Leaf className="w-4 h-4 text-[#246B45]" />;
      case 'Waste Management':
        return <Recycle className="w-4 h-4 text-[#246B45]" />;
      case 'Energy Efficiency':
        return <Zap className="w-4 h-4 text-[#246B45]" />;
      default:
        return <Leaf className="w-4 h-4 text-[#246B45]" />;
    }
  };

  // Only display paths that have actual prepared learning content and are available
  const availablePaths = useMemo(() => {
    return LEARNING_PATHS.filter(c => c.isAvailable);
  }, []);

  const filteredCourses = useMemo(() => {
    return availablePaths.filter((course) => {
      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = course.title.toLowerCase().includes(q);
        const inSummary = (course.tagline || course.summary).toLowerCase().includes(q);
        const inCategory = course.category.toLowerCase().includes(q);
        return inTitle || inSummary || inCategory;
      }
      return true;
    });
  }, [availablePaths, selectedCategory, searchQuery]);

  const handleStartOrContinue = (course: LearningPath) => {
    if (isEnrolled(course.id)) {
      onOpenPlayer(course);
    } else {
      onEnrollCourse(course);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider mb-1.5">
          Learning Catalogue
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
          Green Skills Learning Paths
        </h1>
        <p className="mt-2 text-sm text-[#59655b] max-w-2xl leading-relaxed">
          Structured courses designed for all learners. Study chapters, review practical real-world examples, complete chapter quizzes, and track genuine progress.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        {/* Search field */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learning paths by topic or skill..."
            className="w-full pl-10 pr-4 py-2 text-sm text-[#252925] bg-[#fafbf9] border border-gray-200 rounded-lg focus:outline-none focus:border-[#246B45] focus:bg-white"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#246B45] text-white'
                  : 'bg-[#fafbf9] text-[#59655b] hover:bg-[#E8F0E8] hover:text-[#246B45] border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course List: Compact, Clean Cards */}
      {filteredCourses.length === 0 ? (
        <div className="p-10 bg-white rounded-xl border border-gray-200 text-center space-y-3">
          <Search className="w-8 h-8 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-[#252925]">No learning paths found</h3>
          <p className="text-xs text-[#59655b] max-w-sm mx-auto">
            Try adjusting your search keyword or selecting "All" categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-[#246B45] text-white text-xs font-semibold rounded-lg hover:bg-[#1d5737] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            const chapterCount = course.chapters?.length || course.syllabus?.length || course.moduleCount;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 flex flex-col justify-between hover:border-[#246B45]/50 transition-colors"
              >
                <div>
                  {/* Category & Skill Level */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E8F0E8] flex items-center justify-center shrink-0">
                        {getCategoryIcon(course.category)}
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#E8F0E8] text-[#246B45]">
                        {course.category}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-[#59655b] bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                      Skill level: {course.level || 'Beginner'}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#252925] mb-2 leading-snug">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#59655b] leading-relaxed mb-4 line-clamp-3">
                    {course.tagline || course.summary}
                  </p>

                  {/* Metadata: Chapters & Duration */}
                  <div className="flex items-center gap-4 text-xs text-[#59655b] pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium text-[#252925]">{chapterCount}</span>
                      <span>Chapters</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium text-[#252925]">{course.durationHours}</span>
                      <span>Hours</span>
                    </div>
                  </div>
                </div>

                {/* Actions: Start Learning / Continue Learning */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="text-xs font-semibold text-[#246B45] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Curriculum</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleStartOrContinue(course)}
                    className="px-4 py-2 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    {enrolled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Continue Learning</span>
                      </>
                    ) : (
                      <>
                        <span>Start Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Minimal EcoMentor Note */}
      <div className="bg-[#E8F0E8] rounded-xl p-5 border border-[#246B45]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-[#246B45]">
            Need help choosing a path?
          </div>
          <p className="text-xs text-[#252925] mt-0.5">
            EcoMentor AI can guide you to the right starting point based on your interests.
          </p>
        </div>
        <button
          onClick={onOpenMentor}
          className="px-4 py-2 bg-[#246B45] text-white text-xs font-semibold rounded-lg hover:bg-[#1d5737] transition-colors cursor-pointer shrink-0"
        >
          Ask EcoMentor
        </button>
      </div>

    </div>
  );
};
