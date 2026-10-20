import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Mail, Calendar, Key, Award, BookOpen, LogOut } from 'lucide-react';

interface ProfilePageProps {
  onSignOut: () => void;
  onExploreCourses: () => void;
  onViewCertificates: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onSignOut,
  onExploreCourses,
  onViewCertificates
}) => {
  const { user, enrollments, certificates } = useAuth();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-xl bg-white border border-gray-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-lg bg-[#E8F0E8] text-[#246B45] mx-auto flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#252925]">
            Sign In to Access Your Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#59655b] max-w-sm mx-auto leading-relaxed">
            Your learner profile is strictly protected and displays personal information only for your authenticated session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      {/* Header */}
      <div className="space-y-1 border-b border-gray-200 pb-4">
        <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider">
          Learner Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#252925] font-display">
          Account & Settings
        </h1>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-gray-200 shadow-xs space-y-6">
        
        {/* User Identity Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#E8F0E8] text-[#246B45] flex items-center justify-center text-xl font-bold font-display">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#252925]">
                {user.fullName}
              </h2>
              <div className="text-xs text-[#59655b] flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="px-3.5 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-[#fafbf9] border border-gray-100 space-y-1">
            <div className="text-[#59655b] font-medium flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              <span>Learner Identifier</span>
            </div>
            <div className="font-mono font-bold text-[#252925] text-xs">{user.id}</div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#fafbf9] border border-gray-100 space-y-1">
            <div className="text-[#59655b] font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined Date</span>
            </div>
            <div className="font-bold text-[#252925] text-xs">
              {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Learning Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
            <div>
              <div className="text-xs text-[#59655b]">Active Enrollments</div>
              <div className="text-xl font-bold text-[#252925] mt-0.5">{enrollments.length} Courses</div>
            </div>
            <button
              onClick={onExploreCourses}
              className="text-xs font-semibold text-[#246B45] hover:underline cursor-pointer"
            >
              Browse →
            </button>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
            <div>
              <div className="text-xs text-[#59655b]">Earned Certificates</div>
              <div className="text-xl font-bold text-[#246B45] mt-0.5">{certificates.length} Verified</div>
            </div>
            <button
              onClick={onViewCertificates}
              className="text-xs font-semibold text-[#246B45] hover:underline cursor-pointer"
            >
              View →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
