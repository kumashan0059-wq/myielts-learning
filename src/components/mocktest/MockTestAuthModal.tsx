import React, { useState } from 'react';
import { X, Lock, User, Mail, ShieldCheck, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { useMockTestAuth } from './MockTestAuthContext';
import type { TestCategory } from '../../../shared/mockTestTypes';

interface MockTestAuthModalProps {
  isOpen: boolean;
  initialMode?: 'student-login' | 'student-register' | 'admin';
  onClose: () => void;
  onSuccess?: () => void;
}

export const MockTestAuthModal: React.FC<MockTestAuthModalProps> = ({
  isOpen,
  initialMode = 'student-login',
  onClose,
  onSuccess,
}) => {
  const {
    adminStatus,
    isLoadingAuth,
    loginStudent,
    registerStudent,
    loginAdmin,
    claimAdmin,
  } = useMockTestAuth();

  const [mode, setMode] = useState<'student-login' | 'student-register' | 'admin'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetBand, setTargetBand] = useState(7.5);
  const [preferredTrack, setPreferredTrack] = useState<TestCategory>('academic');
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'student-login') {
        await loginStudent(email, password);
      } else if (mode === 'student-register') {
        await registerStudent({ name, email, password, targetBand, preferredTrack });
      } else if (mode === 'admin') {
        if (adminStatus.needsInitialSetup) {
          await claimAdmin(name || 'IELTS Center Admin', email, password);
        } else {
          await loginAdmin(email, password);
        }
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mock-auth-title"
    >
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0D0D11] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E11D2A] text-white flex items-center justify-center">
              {mode === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="mock-auth-title" className="text-lg font-bold font-display">
                {mode === 'admin'
                  ? adminStatus.needsInitialSetup
                    ? 'Claim Initial Admin Account'
                    : 'Admin Portal Sign In'
                  : mode === 'student-register'
                  ? 'Create Student Account'
                  : 'Student Portal Sign In'}
              </h3>
              <p className="text-xs text-neutral-400">
                {mode === 'admin'
                  ? 'Manage mock tests, audio, and submissions'
                  : 'Save progress, record speaking & track band scores'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
            <button
              type="button"
              onClick={() => {
                setMode('student-login');
                setError(null);
              }}
              className={`py-2 px-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                mode === 'student-login'
                  ? 'bg-white text-[#0D0D11] shadow-xs'
                  : 'text-neutral-600 hover:text-[#0D0D11]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('student-register');
                setError(null);
              }}
              className={`py-2 px-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                mode === 'student-register'
                  ? 'bg-white text-[#0D0D11] shadow-xs'
                  : 'text-neutral-600 hover:text-[#0D0D11]'
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('admin');
                setError(null);
              }}
              className={`py-2 px-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                mode === 'admin'
                  ? 'bg-[#0D0D11] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-[#0D0D11]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'admin' && adminStatus.needsInitialSetup && (
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
              <strong className="text-[#0D0D11] block mb-1">First-Run Admin Setup</strong>
              No admin account has been claimed yet. Create the initial administrator credentials below to lock and manage the Mock Test Admin Panel.
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          {(mode === 'student-register' || (mode === 'admin' && adminStatus.needsInitialSetup)) && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-bold text-neutral-800 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={mode === 'admin' ? 'Center Administrator' : 'e.g. Ayesha Rahman'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-bold text-neutral-800 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold text-neutral-800 mb-1.5">
              {mode === 'admin' && adminStatus.hasEnvPasscode
                ? 'Admin Passcode'
                : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-password"
                type="password"
                required
                minLength={mode === 'admin' && adminStatus.needsInitialSetup ? 8 : 6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === 'admin' && adminStatus.needsInitialSetup
                    ? 'Minimum 8 characters'
                    : 'Minimum 6 characters'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
              />
            </div>
          </div>

          {mode === 'student-register' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="auth-target" className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Target Band
                </label>
                <select
                  id="auth-target"
                  value={targetBand}
                  onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-[#0D0D11] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                >
                  {[6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                    <option key={b} value={b}>
                      Band {b.toFixed(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="auth-track" className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Preferred Track
                </label>
                <select
                  id="auth-track"
                  value={preferredTrack}
                  onChange={(e) => setPreferredTrack(e.target.value as TestCategory)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                >
                  <option value="academic">Academic</option>
                  <option value="general">General Training</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoadingAuth}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] disabled:opacity-60 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            {isLoadingAuth ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                <span>
                  {mode === 'admin'
                    ? adminStatus.needsInitialSetup
                      ? 'Create Admin & Enter Panel'
                      : 'Sign In as Admin'
                    : mode === 'student-register'
                    ? 'Create Account & Continue'
                    : 'Sign In to My Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
