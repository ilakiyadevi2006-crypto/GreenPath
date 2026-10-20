import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, NavigationView } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { DiscoverView } from './components/DiscoverView';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { MyLearningView } from './components/MyLearningView';
import { CoursePlayer } from './components/CoursePlayer';
import { GreenSkillsPassportView } from './components/GreenSkillsPassportView';
import { AchievementsView } from './components/AchievementsView';
import { AdminWorkspace } from './components/AdminWorkspace';
import { ProfilePage } from './components/ProfilePage';
import { EcoMentorSection } from './components/EcoMentorSection';
import { HowItWorks } from './components/HowItWorks';
import { CertificateHighlights } from './components/CertificateHighlights';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { LearningPath } from './types';
import { LEARNING_PATHS } from './data/courses';

function MainApp() {
  const { user, enrollCourse, logout } = useAuth();

  const [currentView, setCurrentView] = useState<NavigationView>('home');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<LearningPath | null>(null);
  const [playerCourse, setPlayerCourse] = useState<LearningPath | null>(null);
  const [playerInitialLessonId, setPlayerInitialLessonId] = useState<string | undefined>(undefined);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [pendingEnrollCourse, setPendingEnrollCourse] = useState<LearningPath | null>(null);

  const handleNavigate = (view: NavigationView) => {
    if (view === 'my-learning' || view === 'profile') {
      if (!user) {
        setAuthMode('login');
        setAuthModalOpen(true);
        return;
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollClick = async (course: LearningPath) => {
    if (!course.isAvailable) return;

    if (user) {
      await enrollCourse(course.id, course.title);
    }
    setPlayerCourse(course);
    setPlayerInitialLessonId(undefined);
  };

  const handleAuthSuccess = async () => {
    if (pendingEnrollCourse) {
      await enrollCourse(pendingEnrollCourse.id, pendingEnrollCourse.title);
      setPlayerCourse(pendingEnrollCourse);
      setPendingEnrollCourse(null);
    } else {
      setCurrentView('my-learning');
    }
  };

  const handleOpenCourseDetails = (course: LearningPath) => {
    setSelectedCourseForDetail(course);
    setCurrentView('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlayerFromCourseId = (courseId: string, lessonId?: string) => {
    const course = LEARNING_PATHS.find(c => c.id === courseId);
    if (course) {
      setPlayerCourse(course);
      setPlayerInitialLessonId(lessonId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9] text-[#252925]">
      {/* Functional Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={(mode) => {
          setAuthMode(mode || 'login');
          setAuthModalOpen(true);
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME (Section A, B, C, D + Footer) */}
        {currentView === 'home' && (
          <>
            {/* Section A: Hero */}
            <Hero
              onExploreClick={() => handleNavigate('discover')}
              onMentorClick={() => handleNavigate('ecomentor')}
            />
            {/* Section B: Featured Learning Paths (4 core paths) */}
            <CourseCatalog
              onSelectCourse={handleOpenCourseDetails}
              onEnrollCourse={handleEnrollClick}
              onViewAllClick={() => handleNavigate('discover')}
            />
            {/* Section C: How It Works (1. Learn -> 2. Practice -> 3. Track Your Progress) */}
            <HowItWorks
              onExploreClick={() => handleNavigate('discover')}
            />
            {/* Section D: EcoMentor AI */}
            <EcoMentorSection
              onSelectCourse={handleOpenCourseDetails}
              isStandalonePage={false}
            />
          </>
        )}

        {/* VIEW 2: LEARN (Comprehensive Learning Catalogue with Search, Categories, & Availability) */}
        {currentView === 'discover' && (
          <DiscoverView
            onSelectCourse={handleOpenCourseDetails}
            onEnrollCourse={handleEnrollClick}
            onOpenPlayer={(course) => {
              setPlayerCourse(course);
              setPlayerInitialLessonId(undefined);
            }}
            onOpenMentor={() => handleNavigate('ecomentor')}
          />
        )}

        {/* VIEW 3: MY PROGRESS (Enrolled Courses, Green Skills Passport, & Certificates) */}
        {(currentView === 'my-learning' || currentView === 'passport' || currentView === 'achievements') && (
          <MyLearningView
            initialTab={
              currentView === 'passport'
                ? 'passport'
                : currentView === 'achievements'
                ? 'achievements'
                : 'courses'
            }
            onOpenPlayer={(course, lessonId) => {
              setPlayerCourse(course);
              setPlayerInitialLessonId(lessonId);
            }}
            onExploreCourses={() => handleNavigate('discover')}
            onOpenMentor={() => handleNavigate('ecomentor')}
            onOpenPassport={() => handleNavigate('passport')}
            onSelectCourseDetails={handleOpenCourseDetails}
          />
        )}

        {/* VIEW 4: ECOMENTOR AI (Dedicated AI learning assistant workspace) */}
        {currentView === 'ecomentor' && (
          <div className="py-6 sm:py-8">
            <EcoMentorSection
              onSelectCourse={handleOpenCourseDetails}
              isStandalonePage={true}
            />
          </div>
        )}

        {/* VIEW 7: ADMIN WORKSPACE (Protected interface for catalog & audit) */}
        {currentView === 'admin' && (
          <AdminWorkspace />
        )}

        {/* VIEW 8: COURSE DETAILS PAGE */}
        {currentView === 'course-details' && (
          selectedCourseForDetail ? (
            <CourseDetailsPage
              course={selectedCourseForDetail}
              onBack={() => handleNavigate('discover')}
              onEnroll={handleEnrollClick}
              onStartStudy={(course) => {
                setPlayerCourse(course);
                setPlayerInitialLessonId(undefined);
              }}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
              <h2 className="text-xl font-bold text-[#252925]">Course Not Found</h2>
              <button
                onClick={() => handleNavigate('discover')}
                className="px-4 py-2 rounded-lg bg-[#246B45] text-white text-xs font-semibold cursor-pointer"
              >
                Return to Course Discovery
              </button>
            </div>
          )
        )}

        {/* VIEW 9: PROFILE */}
        {currentView === 'profile' && (
          <ProfilePage
            onSignOut={() => {
              logout();
              handleNavigate('home');
            }}
            onExploreCourses={() => handleNavigate('discover')}
            onViewCertificates={() => handleNavigate('passport')}
          />
        )}

      </main>

      {/* Clean Footer */}
      <Footer onNavigateLearn={() => handleNavigate('discover')} />

      {/* Full-Screen Course Learning Environment (Player) */}
      {playerCourse && (
        <CoursePlayer
          course={playerCourse}
          initialLessonId={playerInitialLessonId}
          onExit={() => {
            setPlayerCourse(null);
            setPlayerInitialLessonId(undefined);
          }}
          onCertificateClaimed={() => {
            // refresh data handled inside AuthContext
          }}
        />
      )}

      {/* Real Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingEnrollCourse(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
