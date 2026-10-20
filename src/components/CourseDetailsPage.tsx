import React from 'react';
import { LearningPath } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, Clock, BookOpen, CheckCircle2, Wrench, Award,
  PlayCircle, Lock, ChevronRight, FileText, Check
} from 'lucide-react';

interface CourseDetailsPageProps {
  course: LearningPath;
  onBack: () => void;
  onEnroll: (course: LearningPath) => void;
  onStartStudy: (course: LearningPath) => void;
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({
  course,
  onBack,
  onEnroll,
  onStartStudy
}) => {
  const { enrollments } = useAuth();
  const enrollment = enrollments.find(e => e.courseId === course.id);
  const isEnrolled = !!enrollment;

  const totalLessons = course.syllabus.flatMap(m => m.lessons).length;
  const completedCount = enrollment?.completedLessons.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#246B45] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Catalogue</span>
      </button>

      {/* Course Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#E8F0E8] text-[#246B45] text-xs font-medium">
              {course.category}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-[#59655b]">{course.level} Level</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-[#59655b]">{course.durationHours} Hours</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-[#59655b]">{course.moduleCount} Chapters</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-[#59655b] leading-relaxed max-w-3xl">
            {course.summary}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#59655b]">
            {course.isAvailable ? (
              <span>Verified curriculum with video lectures, interactive quizzes, and certificate assessment.</span>
            ) : (
              <span className="text-amber-700 font-medium">Curriculum currently in development.</span>
            )}
          </div>

          <div>
            {course.isAvailable ? (
              isEnrolled ? (
                <button
                  onClick={() => onStartStudy(course)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Continue Learning ({progressPercent}%)</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnroll(course)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Learning</span>
                </button>
              )
            ) : (
              <span className="inline-block px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Learning Objectives & Curriculum */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Learning Objectives */}
          {course.learningObjectives && course.learningObjectives.length > 0 && (
            <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-3">
              <h2 className="text-base font-bold text-[#252925]">
                What You Will Learn
              </h2>
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {course.learningObjectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#252925]">
                    <CheckCircle2 className="w-4 h-4 text-[#246B45] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter-by-Chapter Curriculum */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-[#252925]">
                  Course Chapters
                </h2>
                <p className="text-xs text-[#59655b]">
                  {course.syllabus.length} structured chapters with educational videos and activities
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.syllabus.map((mod) => (
                <div
                  key={mod.id}
                  className="p-4 rounded-lg bg-[#fafbf9] border border-gray-200 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-semibold text-[#246B45] uppercase">
                        Chapter {mod.moduleNumber} · {mod.durationHours} Hours
                      </div>
                      <h3 className="text-sm font-bold text-[#252925] mt-0.5">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#59655b] leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Lessons list */}
                  <div className="pt-2 border-t border-gray-200/60 space-y-1.5">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-2 rounded-md bg-white border border-gray-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#246B45] shrink-0" />
                          <span className="font-medium text-[#252925] truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {lesson.durationMinutes}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Standards & Assessment */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tools & Standards */}
          <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-3">
            <h3 className="text-sm font-bold text-[#252925] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#246B45]" />
              <span>Skills & Standards</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {course.toolsAndStandards.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#E8F0E8] text-[#246B45] text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Assessment & Certification */}
          <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-3">
            <h3 className="text-sm font-bold text-[#252925] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#246B45]" />
              <span>Certificate Requirements</span>
            </h3>
            <div className="text-xs text-[#59655b] space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#246B45] shrink-0 mt-0.5" />
                <span>Complete all {course.syllabus.length} chapters sequentially</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#246B45] shrink-0 mt-0.5" />
                <span>Pass the final assessment quiz with 80% or higher</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#246B45] shrink-0 mt-0.5" />
                <span>Receive verifiable digital certificate with unique ID</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
