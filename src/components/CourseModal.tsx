import React from 'react';
import { LearningPath } from '../types';
import { X, Clock, BookOpen, ShieldCheck, CheckCircle2, Wrench, Award, ChevronDown } from 'lucide-react';

interface CourseModalProps {
  course: LearningPath | null;
  onClose: () => void;
  onEnroll: (course: LearningPath) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-[#123e2b]/15 shadow-2xl max-w-4xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header with Image & Title */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] bg-[#0b291b] overflow-hidden shrink-0">
          <img
            src={course.image}
            alt={course.imageAlt}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b291b] via-[#0b291b]/50 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a3e635] uppercase tracking-wider mb-1.5">
              <span>{course.category}</span>
              <span aria-hidden="true">·</span>
              <span>{course.level} Level</span>
              <span aria-hidden="true">·</span>
              <span>{course.standardAlignment}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white line-clamp-1">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#fafbf9] border border-[#123e2b]/10 text-xs">
            <div>
              <div className="text-[#5b7b68] font-medium">Duration</div>
              <div className="text-sm font-bold text-[#0b291b] flex items-center gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-[#184e34]" />
                <span>{course.durationHours} Hours</span>
              </div>
            </div>
            <div>
              <div className="text-[#5b7b68] font-medium">Curriculum</div>
              <div className="text-sm font-bold text-[#0b291b] flex items-center gap-1 mt-0.5">
                <BookOpen className="w-4 h-4 text-[#184e34]" />
                <span>{course.moduleCount} Modules</span>
              </div>
            </div>
            <div>
              <div className="text-[#5b7b68] font-medium">Credential Level</div>
              <div className="text-sm font-bold text-[#0b291b] flex items-center gap-1 mt-0.5">
                <Award className="w-4 h-4 text-[#184e34]" />
                <span>Industry Verified</span>
              </div>
            </div>
            <div>
              <div className="text-[#5b7b68] font-medium">Format</div>
              <div className="text-sm font-bold text-[#0b291b] flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#184e34]" />
                <span>Hands-On Labs</span>
              </div>
            </div>
          </div>

          {/* Overview & Core Outcomes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0b291b] font-display">
              Track Overview
            </h3>
            <p className="text-sm text-[#486352] leading-relaxed">
              {course.summary}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-[#184e34] uppercase tracking-wider">
                Target Competencies & Learning Outcomes
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#2d4737] leading-relaxed bg-[#f6f9f7] p-2.5 rounded-xl border border-[#123e2b]/5">
                    <CheckCircle2 className="w-4 h-4 text-[#65a30d] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Software & Tools */}
          <div className="p-4 rounded-2xl bg-[#eef4ef] border border-[#123e2b]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#0b291b] font-semibold">
              <Wrench className="w-4 h-4 text-[#184e34]" />
              <span>Standard Engineering Software Used:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.toolsAndStandards.map((tool, idx) => (
                <span
                  key={idx}
                  className="bg-white px-2.5 py-1 rounded-md text-[#0b291b] font-mono text-[11px] border border-[#123e2b]/10 shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Module Syllabus */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0b291b] font-display">
                Detailed Module Breakdown
              </h3>
              <span className="text-xs text-[#5b7b68] font-medium">
                {course.syllabus.length} Modules · Complete Syllabus
              </span>
            </div>

            <div className="space-y-3">
              {course.syllabus.map((mod) => (
                <div
                  key={mod.id}
                  className="p-5 rounded-2xl bg-white border border-[#123e2b]/10 shadow-2xs hover:border-[#184e34]/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="text-[11px] font-semibold text-[#184e34] uppercase tracking-wider mb-0.5">
                        Module 0{mod.moduleNumber} · {mod.durationHours} Hours
                      </div>
                      <h4 className="text-base font-bold text-[#0b291b] font-display">
                        {mod.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-[#486352] mb-3 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Practical Project Highlight */}
                  <div className="p-3 rounded-xl bg-[#fafbf9] border border-[#123e2b]/5 text-xs text-[#2d4737] mb-3">
                    <span className="font-semibold text-[#0b291b]">Practical Workbench Project: </span>
                    <span>{mod.practicalProject}</span>
                  </div>

                  {/* Lesson List */}
                  <div className="space-y-1.5 border-t border-[#123e2b]/5 pt-3">
                    <div className="text-[11px] font-semibold text-[#5b7b68] uppercase tracking-wider">
                      Lectures & Labs:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#f9fbf9] text-[11px] text-[#2d4737]"
                        >
                          <span className="truncate pr-2 font-medium">{lesson.title}</span>
                          <span className="text-[#5b7b68] shrink-0 font-mono text-[10px]">
                            {lesson.format} · {lesson.durationMinutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Career Roles */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-[#184e34] uppercase tracking-wider mb-2">
              Recommended For Roles:
            </div>
            <div className="flex flex-wrap gap-2">
              {course.targetRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#eef4ef] text-xs font-medium text-[#0b291b]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-6 bg-[#fafbf9] border-t border-[#123e2b]/10 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#123e2b]/20 text-xs font-semibold text-[#0b291b] hover:bg-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEnroll(course);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#123e2b] text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-[#a3e635]" />
            <span>Enroll in This Track</span>
          </button>
        </div>

      </div>
    </div>
  );
};
