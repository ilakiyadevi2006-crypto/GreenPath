import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      if (mode === 'register') {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name.');
          setSubmitting(false);
          return;
        }
        const res = await register(fullName, email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to create account.');
          setSubmitting(false);
          return;
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid email or password.');
          setSubmitting(false);
          return;
        }
      }

      setSubmitting(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-100">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full p-6 sm:p-7 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-[#252925] p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-[#246B45] uppercase tracking-wider mb-1">
            Learner Account
          </div>
          <h3 className="text-xl font-bold text-[#252925]">
            {mode === 'login' ? 'Sign In to GreenPath' : 'Create Learner Account'}
          </h3>
          <p className="text-xs text-[#59655b] mt-1">
            {mode === 'login'
              ? 'Access your enrolled learning paths, verified quiz scores, and credentials.'
              : 'Free access to structured green skills courses and verified certifications.'}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 p-1 bg-[#E8F0E8] rounded-lg mb-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`py-1.5 rounded-md transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#246B45] shadow-xs font-semibold'
                : 'text-[#59655b] hover:text-[#252925]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`py-1.5 rounded-md transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#246B45] shadow-xs font-semibold'
                : 'text-[#59655b] hover:text-[#252925]'
            }`}
          >
            Register Free
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-medium text-[#252925] block mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full pl-9 pr-3.5 py-2 text-xs text-[#252925] bg-[#fafbf9] border border-gray-300 rounded-lg focus:outline-none focus:border-[#246B45] focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-[#252925] block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3.5 py-2 text-xs text-[#252925] bg-[#fafbf9] border border-gray-300 rounded-lg focus:outline-none focus:border-[#246B45] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#252925] block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3.5 py-2 text-xs text-[#252925] bg-[#fafbf9] border border-gray-300 rounded-lg focus:outline-none focus:border-[#246B45] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-2.5 rounded-lg bg-[#246B45] hover:bg-[#1d5737] text-white text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>
              {submitting
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Workspace'
                : 'Create Free Account'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Account Tip */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-[#59655b] text-center">
          First time here? Register with your email to start saving real progress.
        </div>
      </div>
    </div>
  );
};
