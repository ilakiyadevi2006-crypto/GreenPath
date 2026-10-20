import React, { useState, useEffect, useRef } from 'react';
import { LearningPath, CourseChapter, SyllabusLesson } from '../types';
import { COURSE_QUIZZES } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Lock, Award, BookOpen, Clock,
  Sparkles, Send, RefreshCw, AlertCircle, Check, HelpCircle, X, Menu,
  MessageSquare, ChevronRight, ChevronLeft, ShieldCheck, FileCheck
} from 'lucide-react';

interface CoursePlayerProps {
  course: LearningPath;
  initialLessonId?: string;
  onExit: () => void;
  onCertificateClaimed?: (cert: any) => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  initialLessonId,
  onExit,
  onCertificateClaimed
}) => {
  const {
    user,
    enrollments,
    markLessonComplete,
    submitCourseQuiz,
    submitChapterQuiz,
    claimCourseCertificate,
    saveNote,
    notes
  } = useAuth();

  const isChapterBased = Boolean(course.chapters && course.chapters.length > 0);
  const chapters: CourseChapter[] = course.chapters || [];

  // Enrollment progress from backend / local state
  const enrollment = enrollments.find(e => e.courseId === course.id);
  const completedLessonIds = enrollment?.completedLessons || [];

  // Local state for chapter quizzes and reflections
  const [chapterQuizAnswers, setChapterQuizAnswers] = useState<Record<string, Record<string, number>>>({});
  const [chapterQuizSubmitted, setChapterQuizSubmitted] = useState<Record<string, boolean>>({});
  const [chapterQuizResults, setChapterQuizResults] = useState<Record<string, {
    passed: boolean;
    scorePercent: number;
    correctCount: number;
    totalQuestions: number;
  }>>(() => {
    return enrollment?.chapterQuizResults || {};
  });

  const [localCompletedIds, setLocalCompletedIds] = useState<string[]>([]);
  const [reflectionInputs, setReflectionInputs] = useState<Record<string, string>>({});
  const [reflectionSaved, setReflectionSaved] = useState<Record<string, boolean>>({});
  const [markingChapterComplete, setMarkingChapterComplete] = useState(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Sync stored quiz results from enrollment when it updates
  useEffect(() => {
    if (enrollment?.chapterQuizResults) {
      setChapterQuizResults(prev => ({
        ...prev,
        ...enrollment.chapterQuizResults
      }));
    }
  }, [enrollment?.chapterQuizResults]);

  // Determine chapter status & unlock rule
  // Rule: A learner can only open the next chapter after completing the previous chapter and passing its quiz.
  const isChapterCompleted = (chapterId: string) => {
    return completedLessonIds.includes(chapterId) || localCompletedIds.includes(chapterId);
  };

  const isChapterQuizPassed = (chapterId: string) => {
    const res = chapterQuizResults[chapterId];
    return res ? res.passed : false;
  };

  const isChapterUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevChapter = chapters[index - 1];
    return isChapterCompleted(prevChapter.id) && isChapterQuizPassed(prevChapter.id);
  };

  const getChapterStatus = (chapter: CourseChapter, index: number): 'Completed' | 'In Progress' | 'Not Started' | 'Locked' => {
    if (isChapterCompleted(chapter.id)) {
      return 'Completed';
    }
    if (!isChapterUnlocked(index)) {
      return 'Locked';
    }
    if (index === currentChapterIndex) {
      return 'In Progress';
    }
    // If unlocked and has quiz answers or user visited, it's in progress, else not started
    if (chapterQuizAnswers[chapter.id] && Object.keys(chapterQuizAnswers[chapter.id]).length > 0) {
      return 'In Progress';
    }
    return 'Not Started';
  };

  // Select initial chapter
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(() => {
    if (!isChapterBased) return 0;
    if (initialLessonId) {
      const idx = chapters.findIndex(c => c.id === initialLessonId);
      if (idx !== -1 && (idx === 0 || (isChapterCompleted(chapters[idx - 1].id) && isChapterQuizPassed(chapters[idx - 1].id)))) {
        return idx;
      }
    }
    // Find first incomplete unlocked chapter, or default to 0
    for (let i = 0; i < chapters.length; i++) {
      if (!isChapterCompleted(chapters[i].id)) {
        return i;
      }
    }
    return 0;
  });

  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  // Overall course progress
  const totalChaptersCount = chapters.length;
  const completedChaptersCount = chapters.filter(c => isChapterCompleted(c.id)).length;
  const progressPercent = totalChaptersCount > 0
    ? Math.round((completedChaptersCount / totalChaptersCount) * 100)
    : 0;

  // Sidebar & AI Drawer states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  // EcoMentor AI in-lesson state
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'mentor'; text: string }[]>([
    {
      sender: 'mentor',
      text: `Hello! I am EcoMentor AI. I am here alongside your lesson: "${currentChapter?.title || course.title}". Ask me any questions, request an analogy, or test your understanding without leaving your place in the lesson!`
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, aiLoading]);

  // Context updates when chapter changes
  useEffect(() => {
    if (currentChapter) {
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: `You are now on "${currentChapter.title}". Ask me to explain any key terms, provide extra real-world examples, or clarify quiz questions.`
        }
      ]);
    }
  }, [currentChapter?.id]);

  const handleSendAiMessage = async (promptText?: string) => {
    const text = (promptText || aiInput).trim();
    if (!text) return;

    const userMsg = { sender: 'user' as const, text };
    setAiMessages(prev => [...prev, userMsg]);
    if (!promptText) setAiInput('');
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          userContext: {
            activeCourse: course.title,
            completedLessonsCount: completedChaptersCount
          },
          currentLesson: currentChapter ? {
            id: currentChapter.id,
            title: currentChapter.title,
            summary: currentChapter.description,
            keyStandards: [course.standardAlignment],
            technicalPoints: currentChapter.learningObjectives
          } : undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setAiMessages(prev => [...prev, { sender: 'mentor', text: data.text }]);
      } else {
        setAiMessages(prev => [
          ...prev,
          {
            sender: 'mentor',
            text: data.error || 'I am ready to help. Please try asking your question again.'
          }
        ]);
      }
    } catch {
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: 'Network error reaching EcoMentor AI. Please check your connection.'
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Chapter Quiz Handling
  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (!currentChapter) return;
    setChapterQuizAnswers(prev => ({
      ...prev,
      [currentChapter.id]: {
        ...(prev[currentChapter.id] || {}),
        [questionId]: optionIndex
      }
    }));
  };

  const handleSubmitChapterQuiz = async () => {
    if (!currentChapter) return;
    const currentAnswers = chapterQuizAnswers[currentChapter.id] || {};
    const totalQuestions = currentChapter.quiz.questions.length;

    if (Object.keys(currentAnswers).length < totalQuestions) {
      setLockedNotice(`Please answer all ${totalQuestions} questions before submitting.`);
      setTimeout(() => setLockedNotice(null), 3000);
      return;
    }

    let correctCount = 0;
    currentChapter.quiz.questions.forEach(q => {
      if (currentAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= currentChapter.quiz.passingScorePercent;

    const result = {
      passed,
      scorePercent,
      correctCount,
      totalQuestions
    };

    setChapterQuizResults(prev => ({
      ...prev,
      [currentChapter.id]: result
    }));
    setChapterQuizSubmitted(prev => ({
      ...prev,
      [currentChapter.id]: true
    }));

    // Persist to backend
    await submitChapterQuiz(
      course.id,
      currentChapter.id,
      currentChapter.title,
      passed,
      scorePercent,
      correctCount,
      totalQuestions
    );
  };

  const handleRetakeQuiz = () => {
    if (!currentChapter) return;
    setChapterQuizSubmitted(prev => ({
      ...prev,
      [currentChapter.id]: false
    }));
  };

  // Mark chapter complete and proceed
  const handleMarkChapterComplete = async () => {
    if (!currentChapter) return;
    const quizResult = chapterQuizResults[currentChapter.id];
    if (!quizResult || !quizResult.passed) {
      setLockedNotice('You must pass the chapter quiz with at least 75% before marking this chapter as complete.');
      setTimeout(() => setLockedNotice(null), 4000);
      return;
    }

    setMarkingChapterComplete(true);
    setLocalCompletedIds(prev => prev.includes(currentChapter.id) ? prev : [...prev, currentChapter.id]);
    await markLessonComplete(course.id, currentChapter.id, currentChapter.title, course.title);
    setMarkingChapterComplete(false);

    // If there is a next chapter, advance to it
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation handlers
  const handleSelectChapter = (index: number) => {
    if (!isChapterUnlocked(index)) {
      const prevCh = chapters[index - 1];
      setLockedNotice(`Chapter ${index + 1} is locked. Complete Chapter ${index} and pass its quiz to unlock this chapter.`);
      setTimeout(() => setLockedNotice(null), 4500);
      return;
    }
    setCurrentChapterIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextIndex = currentChapterIndex + 1;
      if (isChapterUnlocked(nextIndex)) {
        setCurrentChapterIndex(nextIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setLockedNotice(`Please complete Chapter ${currentChapterIndex + 1} and pass its quiz to unlock the next chapter.`);
        setTimeout(() => setLockedNotice(null), 4500);
      }
    }
  };

  // Save reflection
  const handleSaveReflection = () => {
    if (!currentChapter) return;
    setReflectionSaved(prev => ({ ...prev, [currentChapter.id]: true }));
    setTimeout(() => {
      setReflectionSaved(prev => ({ ...prev, [currentChapter.id]: false }));
    }, 2500);
  };

  // Quick suggestion prompts for EcoMentor AI based on chapter
  const getChapterSuggestedPrompts = (chNumber: number) => {
    switch (chNumber) {
      case 1:
        return [
          'What is embodied carbon vs operational carbon?',
          'Why does extending device lifespan matter most?',
          'Give me an example of Green IT in everyday business.'
        ];
      case 2:
        return [
          'What is vampire power and how do I stop it?',
          'How do ACPI S3 sleep states work?',
          'Why does dark mode only save power on OLED screens?'
        ];
      case 3:
        return [
          'What is urban mining and why is it cleaner than natural mining?',
          'What are the key goals of the Right to Repair movement?',
          'What does e-Stewards certification guarantee?'
        ];
      case 4:
        return [
          'What is a good PUE score in modern data centers?',
          'How does liquid immersion cooling work?',
          'How do data centers share waste heat with local communities?'
        ];
      case 5:
        return [
          'Explain the Software Carbon Intensity (SCI) formula in simple terms.',
          'What is temporal shifting in carbon-aware computing?',
          'How can web developers reduce network energy consumption?'
        ];
      case 6:
        return [
          'Why does dark data in cloud storage waste electrical energy?',
          'Why does Wi-Fi use less power than 4G/5G mobile connections?',
          'Give me three practical Green IT commitments for this week.'
        ];
      default:
        return [
          'Explain the key concept of this chapter.',
          'Give me an analogy to understand this better.',
          'Give me a practice question to test my knowledge.'
        ];
    }
  };

  const currentQuizResult = currentChapter ? chapterQuizResults[currentChapter.id] : null;
  const currentQuizPassed = currentQuizResult ? currentQuizResult.passed : false;
  const currentChapterIsCompleted = currentChapter ? isChapterCompleted(currentChapter.id) : false;
  const isNextChapterUnlocked = currentChapterIndex < chapters.length - 1 && isChapterUnlocked(currentChapterIndex + 1);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#fafbf9] text-[#252925] overflow-hidden select-text">
      
      {/* 1. TOP BAR */}
      <header className="h-16 px-4 sm:px-6 bg-[#246B45] text-white flex items-center justify-between border-b border-[#1d5737] shrink-0 z-20">
        <div className="flex items-center gap-3 truncate">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            title="Exit Course Player"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="truncate">
            <div className="text-[11px] text-[#E8F0E8] font-medium uppercase tracking-wider">
              {course.category} · {course.level || 'Beginner'}
            </div>
            <h1 className="text-sm sm:text-base font-bold font-display truncate text-white">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Right Controls: Progress & AI Assistant Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Overall Progress Indicator */}
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#1d5737] border border-[#246B45] text-xs">
            <div className="text-right">
              <span className="text-[10px] text-[#E8F0E8] uppercase font-semibold">Course Progress</span>
              <div className="font-mono font-bold text-white">
                {completedChaptersCount} of {totalChaptersCount} Chapters ({progressPercent}%)
              </div>
            </div>
            <div className="w-16 h-2 rounded-full bg-black/30 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* EcoMentor AI Toggle Button */}
          <button
            onClick={() => setAiDrawerOpen(!aiDrawerOpen)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
              aiDrawerOpen
                ? 'bg-white text-[#246B45]'
                : 'bg-[#1d5737] text-white hover:bg-white/10 border border-white/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">EcoMentor AI</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            title="Toggle Curriculum Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Locked Notice Alert Banner */}
      {lockedNotice && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-xs font-medium text-center shadow-sm flex items-center justify-center gap-2 z-30 transition-all animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{lockedNotice}</span>
        </div>
      )}

      {/* 2. MAIN LAYOUT: Sidebar + Content Area + EcoMentor Drawer */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR: Curriculum & Sequential Chapter List */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-80'
          } fixed lg:static inset-y-16 left-0 w-80 bg-white border-r border-gray-200 z-30 flex flex-col transition-transform duration-200 shadow-lg lg:shadow-none shrink-0`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-[#246B45] uppercase tracking-wider">
                Curriculum
              </div>
              <h2 className="text-sm font-bold text-[#252925]">
                Course Chapters
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Overall Progress Summary */}
          <div className="px-4 py-3 bg-[#fafbf9] border-b border-gray-100 text-xs">
            <div className="flex items-center justify-between text-[#59655b] mb-1.5">
              <span>Overall Completion</span>
              <span className="font-bold text-[#246B45]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#246B45] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1.5 text-[11px] text-gray-500">
              {completedChaptersCount} of {totalChaptersCount} chapters completed
            </div>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {chapters.map((chapter, index) => {
              const status = getChapterStatus(chapter, index);
              const isSelected = index === currentChapterIndex;
              const isUnlocked = isChapterUnlocked(index);

              return (
                <button
                  key={chapter.id}
                  onClick={() => handleSelectChapter(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#E8F0E8] border-[#246B45] text-[#246B45] shadow-xs'
                      : isUnlocked
                      ? 'bg-white hover:bg-gray-50 border-gray-200 text-[#252925]'
                      : 'bg-gray-50/70 border-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#246B45] shrink-0" />
                      ) : status === 'In Progress' ? (
                        <div className="w-4 h-4 rounded-full border-2 border-[#246B45] flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#246B45]" />
                        </div>
                      ) : status === 'Locked' ? (
                        <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                      )}

                      <span className="text-xs font-semibold">
                        Chapter {chapter.chapterNumber}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : status === 'In Progress'
                          ? 'bg-[#246B45] text-white'
                          : status === 'Locked'
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-1 text-xs font-medium line-clamp-1 pl-6">
                    {chapter.title.replace(/^Chapter \d+:\s*/, '')}
                  </div>

                  <div className="mt-1 pl-6 text-[11px] text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{chapter.durationMinutes} mins</span>
                    {chapterQuizResults[chapter.id]?.passed && (
                      <span className="text-emerald-600 font-medium">· Quiz Passed ({chapterQuizResults[chapter.id].scorePercent}%)</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Help Footer */}
          <div className="p-3 border-t border-gray-100 bg-[#fafbf9] text-xs text-[#59655b] flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span>Questions lock until prior chapter is passed</span>
            </span>
          </div>
        </aside>

        {/* MAIN AREA: Current Chapter Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
          
          {/* Chapter Top Header */}
          <div className="border-b border-gray-200 pb-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#E8F0E8] text-[#246B45]">
                Chapter {currentChapter.chapterNumber} of {totalChaptersCount}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#59655b] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{currentChapter.durationMinutes} mins</span>
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                    currentChapterIsCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {currentChapterIsCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
              {currentChapter.title}
            </h1>
            <p className="mt-2 text-sm text-[#59655b] leading-relaxed">
              {currentChapter.description}
            </p>
          </div>

          {/* 1. Learning Objectives */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#246B45] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#246B45]" />
              <span>Learning Objectives</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#252925]">
              {currentChapter.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#246B45] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. Beginner-Friendly Lesson Content */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="text-xs font-bold text-[#246B45] uppercase tracking-wider border-b border-gray-100 pb-2">
              Lesson Content
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#252925] leading-relaxed">
              {currentChapter.lessonContent.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* 3. Practical Real-World Examples */}
          <section className="space-y-4">
            <div className="text-xs font-bold text-[#246B45] uppercase tracking-wider">
              Practical Real-World Examples
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentChapter.practicalExamples.map((ex, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-5 space-y-2 hover:border-[#246B45]/40 transition-colors shadow-xs"
                >
                  <div className="text-xs font-bold text-[#246B45]">
                    Example {i + 1}: {ex.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#59655b] leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Short Activity or Reflection Task */}
          <section className="bg-[#E8F0E8]/50 rounded-xl border border-[#246B45]/20 p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#246B45] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#246B45]" />
              <span>Activity & Reflection Task</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#252925]">
                {currentChapter.activityTask.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#59655b] leading-relaxed">
                {currentChapter.activityTask.instruction}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-[#252925]">
                Your Reflection Notes:
              </label>
              <textarea
                rows={3}
                value={reflectionInputs[currentChapter.id] || ''}
                onChange={(e) => setReflectionInputs({ ...reflectionInputs, [currentChapter.id]: e.target.value })}
                placeholder="Type your reflection or action plan notes here..."
                className="w-full p-3 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#246B45]"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSaveReflection}
                  className="px-3.5 py-1.5 rounded-lg bg-[#246B45] text-white text-xs font-semibold hover:bg-[#1d5737] cursor-pointer"
                >
                  Save My Reflection
                </button>
                {reflectionSaved[currentChapter.id] && (
                  <span className="text-xs text-[#246B45] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reflection saved</span>
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* 5. Chapter Quiz */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-gray-100 pb-4">
              <div className="text-xs font-bold text-[#246B45] uppercase tracking-wider mb-1">
                Chapter Quiz
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#252925]">
                Test Your Understanding
              </h2>
              <p className="text-xs text-[#59655b] mt-1">
                Answer all questions below. Pass with at least 75% to unlock Chapter {currentChapter.chapterNumber + 1}.
              </p>
            </div>

            {/* Quiz Result Banner */}
            {currentQuizResult && (
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  currentQuizResult.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {currentQuizResult.passed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  )}
                  <div>
                    <div className="text-sm font-bold">
                      {currentQuizResult.passed ? 'Quiz Passed!' : 'Quiz Score Below 75%'}
                    </div>
                    <div className="text-xs">
                      You scored {currentQuizResult.scorePercent}% ({currentQuizResult.correctCount} of {currentQuizResult.totalQuestions} correct).
                      {currentQuizResult.passed
                        ? ' Great work! You met the requirement to complete this chapter.'
                        : ' Review the explanations below and try again to unlock the next chapter.'}
                    </div>
                  </div>
                </div>

                {!currentQuizResult.passed && (
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-3.5 py-1.5 bg-[#246B45] text-white text-xs font-semibold rounded-lg hover:bg-[#1d5737] cursor-pointer shrink-0"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {currentChapter.quiz.questions.map((q, qIndex) => {
                const userSelected = (chapterQuizAnswers[currentChapter.id] || {})[q.id];
                const isSubmitted = Boolean(currentQuizResult);

                return (
                  <div key={q.id} className="space-y-3 p-4 bg-[#fafbf9] rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-[#246B45]">
                      Question {qIndex + 1} of {currentChapter.quiz.questions.length}
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-[#252925]">
                      {q.questionText}
                    </h4>

                    {/* Radio Options */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIndex) => {
                        const isChecked = userSelected === optIndex;
                        const isCorrect = optIndex === q.correctAnswerIndex;

                        let optionStyle = 'border-gray-200 hover:bg-gray-50';
                        if (isSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                          } else if (isChecked && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                          }
                        } else if (isChecked) {
                          optionStyle = 'bg-[#E8F0E8] border-[#246B45] text-[#246B45] font-semibold';
                        }

                        return (
                          <label
                            key={optIndex}
                            className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${optionStyle}`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={isChecked}
                              disabled={isSubmitted && currentQuizPassed}
                              onChange={() => handleSelectQuizOption(q.id, optIndex)}
                              className="mt-0.5 text-[#246B45] focus:ring-[#246B45]"
                            />
                            <span className="flex-1">{opt}</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Feedback and Explanation */}
                    {isSubmitted && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 text-xs text-[#59655b] space-y-1">
                        <span className="font-bold text-[#252925]">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Button */}
            {!currentQuizPassed && (
              <div className="pt-2">
                <button
                  onClick={handleSubmitChapterQuiz}
                  className="px-5 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Submit Quiz Answers
                </button>
              </div>
            )}
          </section>

          {/* 6. Mark Chapter as Complete Button */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="text-sm font-bold text-[#252925]">
                {currentChapterIsCompleted
                  ? 'Chapter Completed'
                  : 'Ready to Complete This Chapter?'}
              </div>
              <p className="text-xs text-[#59655b] mt-0.5">
                {currentChapterIsCompleted
                  ? 'You have completed this chapter and unlocked the following content.'
                  : currentQuizPassed
                  ? 'You passed the chapter quiz! Click below to record completion and unlock the next chapter.'
                  : 'Complete the chapter quiz with at least 75% to mark this chapter as complete.'}
              </p>
            </div>

            <button
              onClick={handleMarkChapterComplete}
              disabled={!currentQuizPassed || markingChapterComplete}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors shrink-0 ${
                currentQuizPassed
                  ? 'bg-[#246B45] hover:bg-[#1d5737] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {currentChapterIsCompleted
                  ? 'Chapter Completed'
                  : markingChapterComplete
                  ? 'Saving...'
                  : 'Mark Chapter as Complete'}
              </span>
            </button>
          </section>

          {/* 7. Next & Previous Navigation Buttons */}
          <nav aria-label="Chapter Navigation" className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handlePreviousChapter}
              disabled={currentChapterIndex === 0}
              className={`px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentChapterIndex === 0
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-200 text-[#252925] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            {currentChapterIndex < chapters.length - 1 ? (
              <button
                onClick={handleNextChapter}
                disabled={!isNextChapterUnlocked}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isNextChapterUnlocked
                    ? 'bg-[#246B45] text-white hover:bg-[#1d5737] shadow-xs'
                    : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                }`}
                title={isNextChapterUnlocked ? 'Proceed to next chapter' : 'Pass quiz to unlock'}
              >
                <span>Next: Chapter {currentChapterIndex + 2}</span>
                {isNextChapterUnlocked ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
            ) : (
              <button
                onClick={onExit}
                className="px-4 py-2 rounded-lg bg-[#246B45] text-white text-xs font-semibold hover:bg-[#1d5737] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Course</span>
              </button>
            )}
          </nav>

        </main>

        {/* 3. ECOMENTOR AI INTEGRATION DRAWER (Accessible without leaving the lesson) */}
        <aside
          className={`${
            aiDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          } fixed inset-y-16 right-0 w-full sm:w-96 bg-white border-l border-gray-200 z-40 flex flex-col transition-transform duration-200 shadow-xl`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-200 bg-[#fafbf9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#246B45]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#252925]">EcoMentor AI Tutor</h3>
                <div className="text-[11px] text-[#246B45] font-semibold truncate max-w-[180px]">
                  Loaded: Chapter {currentChapter.chapterNumber}
                </div>
              </div>
            </div>
            <button
              onClick={() => setAiDrawerOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              title="Close EcoMentor Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {aiMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl leading-relaxed text-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#246B45] text-white ml-6 font-medium'
                    : 'bg-[#fafbf9] border border-gray-200 text-[#252925] mr-4 shadow-2xs'
                }`}
              >
                <MarkdownRenderer content={msg.text} isUser={msg.sender === 'user'} className="text-xs" />
              </div>
            ))}
            {aiLoading && (
              <div className="p-3 bg-[#fafbf9] border border-gray-200 rounded-xl text-gray-500 italic flex items-center gap-2 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#246B45]" />
                <span>EcoMentor is thinking...</span>
              </div>
            )}
            <div ref={chatScrollRef} />
          </div>

          {/* Quick Prompts for Current Chapter */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 space-y-1.5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Suggested questions for Chapter {currentChapter.chapterNumber}:
            </div>
            <div className="flex flex-col gap-1">
              {getChapterSuggestedPrompts(currentChapter.chapterNumber).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendAiMessage(prompt)}
                  className="text-left text-[11px] text-[#246B45] hover:underline truncate cursor-pointer"
                >
                  · {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAiMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask EcoMentor about this chapter..."
                className="flex-1 px-3 py-2 text-xs bg-[#fafbf9] border border-gray-200 rounded-lg focus:outline-none focus:border-[#246B45]"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiInput.trim()}
                className="p-2 bg-[#246B45] text-white rounded-lg hover:bg-[#1d5737] disabled:opacity-50 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </aside>

      </div>
    </div>
  );
};
