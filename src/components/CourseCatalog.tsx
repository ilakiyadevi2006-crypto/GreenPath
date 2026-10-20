import React from 'react';
import { ArrowRight, Leaf, Laptop, Recycle, Zap, Clock, BookOpen } from 'lucide-react';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath } from '../types';

interface CourseCatalogProps {
  onSelectCourse: (course: LearningPath) => void;
  onEnrollCourse: (course: LearningPath) => void;
  onViewAllClick?: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  onViewAllClick,
}) => {
  // Four specific core learning paths with complete, prepared learning content
  const featuredPathIds = [
    'sustainability-fundamentals',
    'green-it',
    'waste-management',
    'energy-efficiency'
  ];

  // Map each course id to its corresponding simple category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sustainability Fundamentals':
        return <Leaf className="w-5 h-5 text-[#246B45]" />;
      case 'Green IT':
        return <Laptop className="w-5 h-5 text-[#246B45]" />;
      case 'Waste Management':
        return <Recycle className="w-5 h-5 text-[#246B45]" />;
      case 'Energy Efficiency':
        return <Zap className="w-5 h-5 text-[#246B45]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#246B45]" />;
    }
  };

  const featuredCourses = featuredPathIds
    .map(id => LEARNING_PATHS.find(p => p.id === id))
    .filter((course): course is LearningPath => course !== undefined && course.isAvailable);

  return (
    <section id="featured-paths" className="py-16 sm:py-20 bg-[#fafbf9] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider mb-2">
              Structured Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
              Featured Learning Paths
            </h2>
            <p className="mt-2 text-sm text-[#59655b] max-w-xl">
              Practical courses organized into numbered chapters, videos, interactive quizzes, and verified assessments.
            </p>
          </div>

          {onViewAllClick && (
            <button
              onClick={onViewAllClick}
              className="text-sm font-semibold text-[#246B45] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Four Simple, Compact Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between hover:border-[#246B45]/40 hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                {/* Header: Category Badge and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F0E8] flex items-center justify-center shrink-0">
                    {getCategoryIcon(course.category)}
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#E8F0E8] text-[#246B45]">
                    {course.category}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold text-[#252925] group-hover:text-[#246B45] transition-colors mb-2">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-[#59655b] leading-relaxed mb-4">
                  {course.tagline || course.summary}
                </p>

                {/* Metadata: Duration & Chapters */}
                <div className="flex items-center gap-4 text-xs text-[#59655b] pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                    <span>{course.syllabus?.length || course.moduleCount} Chapters</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{course.durationHours} Hours</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">{course.level}</span>
                </div>
              </div>

              {/* Action Link: "Explore Course" */}
              <div className="mt-5 pt-3">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="text-sm font-semibold text-[#246B45] hover:text-[#1d5737] flex items-center gap-1.5 group-hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Course</span>
                  <ArrowRight className="w-4 h-4 text-[#246B45]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
