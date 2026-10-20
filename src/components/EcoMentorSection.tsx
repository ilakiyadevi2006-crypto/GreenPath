import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, RefreshCw, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { LEARNING_PATHS } from '../data/courses';
import { LearningPath, EcoMentorMessage } from '../types';
import { useAuth } from '../context/AuthContext';
import { MarkdownRenderer } from './MarkdownRenderer';

interface EcoMentorSectionProps {
  onSelectCourse?: (course: LearningPath) => void;
  isStandalonePage?: boolean;
}

const STARTER_PROMPTS = [
  'Explain Scope 1, 2, and 3 emissions',
  'How does carbon accounting work?',
  'Give me a practical recycling tip for businesses',
  'Generate a short quiz question on energy conservation',
  'What is Software Carbon Intensity (SCI)?',
  'Explain the 9 planetary boundaries in simple terms'
];

const INITIAL_GREETING: EcoMentorMessage = {
  id: 'msg-initial',
  sender: 'mentor',
  text: 'Hello! I am EcoMentor AI, your green skills learning companion. Ask me to explain sustainability concepts, break down complex lessons, or help you practice what you learn.',
  timestamp: 'Ready'
};

export const EcoMentorSection: React.FC<EcoMentorSectionProps> = ({
  onSelectCourse,
  isStandalonePage = false
}) => {
  const { user, enrollments } = useAuth();

  const [messages, setMessages] = useState<EcoMentorMessage[]>([INITIAL_GREETING]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: EcoMentorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Sent'
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);
    setErrorMessage(null);

    // Build real learner context
    let activeUserContext = undefined;
    if (user && enrollments.length > 0) {
      const activeEnrollment = selectedCourseId !== 'all'
        ? enrollments.find(e => e.courseId === selectedCourseId) || enrollments[0]
        : enrollments[0];
      const course = LEARNING_PATHS.find(p => p.id === activeEnrollment.courseId);
      activeUserContext = {
        activeCourse: course?.title || 'Green Skills Fundamentals',
        completedLessonsCount: activeEnrollment.completedLessons?.length || 0
      };
    } else if (selectedCourseId !== 'all') {
      const course = LEARNING_PATHS.find(p => p.id === selectedCourseId);
      if (course) {
        activeUserContext = {
          activeCourse: course.title,
          completedLessonsCount: 0
        };
      }
    }

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          userContext: activeUserContext
        })
      });

      const data = await res.json();

      if (!res.ok || data.configured === false) {
        const errMsg = data.error || 'The EcoMentor AI service is currently unconfigured.';
        setErrorMessage(errMsg);
        
        const fallbackMsg: EcoMentorMessage = {
          id: `mentor-${Date.now()}`,
          sender: 'mentor',
          text: `[Service Notice]: ${errMsg}\n\nPlease ensure GEMINI_API_KEY is configured in your environment to activate live responses.`,
          timestamp: 'Status Notice'
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } else {
        const mentorMessage: EcoMentorMessage = {
          id: `mentor-${Date.now()}`,
          sender: 'mentor',
          text: data.text || 'No response generated.',
          timestamp: 'EcoMentor AI'
        };
        setMessages((prev) => [...prev, mentorMessage]);
      }
    } catch (err: any) {
      setErrorMessage('Network error connecting to EcoMentor AI.');
      const errorMsg: EcoMentorMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: 'Unable to connect to the backend AI service. Please check your network connection.',
        timestamp: 'Error'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_GREETING]);
    setInputText('');
    setErrorMessage(null);
  };

  return (
    <section id="ecomentor" className={`bg-[#fafbf9] ${isStandalonePage ? 'py-8' : 'py-16 sm:py-20'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Matches Section 4 D exact requirements) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0E8] text-[#246B45] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Learning Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
            Need Help Learning?
          </h2>
          <p className="mt-2 text-sm text-[#59655b] leading-relaxed">
            Ask EcoMentor AI to explain green concepts, clarify lessons, and help you practise what you learn.
          </p>
        </div>

        {/* Course Context Selector (if standalone) */}
        {isStandalonePage && (
          <div className="mb-4 bg-white p-3 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#59655b] font-medium">Select course focus:</span>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-[#252925] bg-white text-xs focus:outline-none focus:border-[#246B45]"
            >
              <option value="all">General Green Skills</option>
              {LEARNING_PATHS.filter(p => p.isAvailable).map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Chat Workspace Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
          
          {/* Chat Header Bar */}
          <div className="px-5 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#252925] flex items-center gap-1.5">
                  <span>EcoMentor AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="text-[11px] text-[#59655b]">
                  Always ready to help with sustainability questions
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-[#59655b] hover:text-[#246B45] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#fafbf9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                    msg.sender === 'user'
                      ? 'bg-[#246B45] text-white'
                      : 'bg-[#E8F0E8] text-[#246B45]'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#246B45] text-white'
                      : 'bg-white text-[#252925] border border-gray-200 shadow-2xs'
                  }`}
                >
                  <MarkdownRenderer content={msg.text} isUser={msg.sender === 'user'} />
                  <div
                    className={`text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-xs text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#246B45] animate-ping" />
                  <span>EcoMentor is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Starter Prompts */}
          <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-gray-400 shrink-0 font-medium">Suggestions:</span>
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#E8F0E8] text-[#246B45] hover:bg-[#d8e8d8] text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about greenhouse gases, solar grids, recycling, carbon accounting..."
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#252925] bg-white placeholder-gray-400 focus:outline-none focus:border-[#246B45] disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-4 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs shrink-0"
              >
                <span>Ask EcoMentor</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
