import React, { useState, useRef, useEffect } from 'react';
import {
  Menu, X, Leaf, User as UserIcon, LogOut,
  Sparkles, Shield, ChevronDown, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type NavigationView =
  | 'home'
  | 'discover'
  | 'my-learning'
  | 'passport'
  | 'achievements'
  | 'ecomentor'
  | 'admin'
  | 'profile'
  | 'course-details';

interface NavbarProps {
  currentView: NavigationView;
  onNavigate: (view: NavigationView) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: NavigationView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  };

  const isLearnActive = currentView === 'discover' || currentView === 'course-details';
  const isProgressActive = currentView === 'my-learning' || currentView === 'passport' || currentView === 'achievements';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand: Clean text with a small leaf icon */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E8] flex items-center justify-center text-[#246B45]">
              <Leaf className="w-4 h-4 text-[#246B45]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#252925] font-display">
                GreenPath
              </span>
            </div>
          </button>

          {/* Core Primary Navigation (Home, Learn, EcoMentor AI, My Progress) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#59655b]">
            <button
              onClick={() => handleNav('home')}
              className={`transition-colors cursor-pointer py-1 ${
                currentView === 'home'
                  ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                  : 'hover:text-[#246B45]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('discover')}
              className={`transition-colors cursor-pointer py-1 ${
                isLearnActive
                  ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                  : 'hover:text-[#246B45]'
              }`}
            >
              Learn
            </button>

            <button
              onClick={() => handleNav('ecomentor')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                currentView === 'ecomentor'
                  ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                  : 'hover:text-[#246B45]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#246B45]" />
              <span>EcoMentor AI</span>
            </button>

            <button
              onClick={() => handleNav('my-learning')}
              className={`transition-colors cursor-pointer py-1 ${
                isProgressActive
                  ? 'text-[#246B45] font-semibold border-b-2 border-[#246B45]'
                  : 'hover:text-[#246B45]'
              }`}
            >
              My Progress
            </button>
          </nav>

          {/* Account Menu or Sign In */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-[#E8F0E8] hover:bg-[#dce9dc] text-[#246B45] border border-[#246B45]/20"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-5 h-5 rounded-full bg-[#246B45] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[120px]">{user.fullName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#246B45] transition-transform duration-150 ${accountMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Account Menu Dropdown */}
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-md border border-gray-200 py-1.5 z-50 animate-in fade-in duration-100">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <div className="text-xs font-bold text-[#252925] truncate">
                        {user.fullName}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate mt-0.5">
                        {user.email}
                      </div>
                    </div>

                    <div className="py-1 text-xs text-[#252925]">
                      <button
                        onClick={() => handleNav('profile')}
                        className="w-full text-left px-4 py-2 hover:bg-[#E8F0E8]/50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-gray-500" />
                        <span>Profile & Settings</span>
                      </button>

                      <button
                        onClick={() => handleNav('my-learning')}
                        className="w-full text-left px-4 py-2 hover:bg-[#E8F0E8]/50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                        <span>My Progress & Certificates</span>
                      </button>

                      {/* Admin Workspace (Restricted to Authorized Admins) */}
                      <button
                        onClick={() => handleNav('admin')}
                        className="w-full text-left px-4 py-2 hover:bg-[#E8F0E8]/50 flex items-center gap-2.5 transition-colors cursor-pointer text-[#246B45] font-medium"
                      >
                        <Shield className="w-3.5 h-3.5 text-[#246B45]" />
                        <span>Admin Workspace</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                          onNavigate('home');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-xs font-medium text-[#252925] hover:text-[#246B45] hover:bg-[#E8F0E8] rounded-lg transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#246B45] hover:bg-[#1d5737] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#252925] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-[#252925]">
            <button
              onClick={() => handleNav('home')}
              className={`text-left px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'bg-[#E8F0E8] text-[#246B45] font-semibold' : 'hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('discover')}
              className={`text-left px-3 py-2 rounded-lg transition-colors ${
                isLearnActive ? 'bg-[#E8F0E8] text-[#246B45] font-semibold' : 'hover:bg-gray-50'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => handleNav('ecomentor')}
              className={`text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'ecomentor' ? 'bg-[#E8F0E8] text-[#246B45] font-semibold' : 'hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#246B45]" />
              <span>EcoMentor AI</span>
            </button>
            <button
              onClick={() => handleNav('my-learning')}
              className={`text-left px-3 py-2 rounded-lg transition-colors ${
                isProgressActive ? 'bg-[#E8F0E8] text-[#246B45] font-semibold' : 'hover:bg-gray-50'
              }`}
            >
              My Progress
            </button>
          </nav>

          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-[#252925]">
                  Signed in as <span className="text-[#246B45]">{user.fullName}</span>
                </div>
                <button
                  onClick={() => handleNav('profile')}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Profile & Settings
                </button>
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#246B45] hover:bg-gray-50 rounded-lg font-medium"
                >
                  Admin Workspace
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex-1 py-2 text-center text-xs font-medium text-[#252925] border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="flex-1 py-2 text-center text-xs font-medium text-white bg-[#246B45] rounded-lg hover:bg-[#1d5737]"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
