import React, { useEffect, useState, useCallback } from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Clock,
  FileCheck2,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  LogIn,
  Layers,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type {
  MockTestRecord,
  TestAttemptRecord,
  TestCategory,
  ModuleType,
} from '../../../shared/mockTestTypes';
import { MockTestAuthProvider, useMockTestAuth } from './MockTestAuthContext';
import { fetchJson } from '../../utils/apiClient';
import { MockTestAuthModal } from './MockTestAuthModal';
import { MockTestRunnerModal } from './MockTestRunnerModal';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { TestResultView } from './TestResultView';

type MockTestSummary = Omit<MockTestRecord, 'payload'>;

const MODULE_META: Record<
  Exclude<ModuleType, 'full'>,
  {
    title: string;
    icon: React.ReactNode;
    durationLabel: string;
    detailLabel: string;
  }
> = {
  listening: {
    title: 'Listening Test',
    icon: <Headphones className="w-5 h-5" />,
    durationLabel: '30 Minutes',
    detailLabel: '4 Sections · 40 Questions',
  },
  reading: {
    title: 'Reading Test',
    icon: <BookOpen className="w-5 h-5" />,
    durationLabel: '60 Minutes',
    detailLabel: '3 Passages · 40 Questions',
  },
  writing: {
    title: 'Writing Test',
    icon: <PenTool className="w-5 h-5" />,
    durationLabel: '60 Minutes',
    detailLabel: 'Task 1 & Task 2 · AI Feedback',
  },
  speaking: {
    title: 'Speaking Test',
    icon: <Mic className="w-5 h-5" />,
    durationLabel: '14 Minutes',
    detailLabel: 'Parts 1–3 · Mic Recording',
  },
};

const MockTestHubInner: React.FC = () => {
  const { user, apiFetch, logout } = useMockTestAuth();

  const [portalView, setPortalView] = useState<'tests' | 'student' | 'admin'>('tests');
  const [selectedCategory, setSelectedCategory] = useState<TestCategory>('academic');
  const [tests, setTests] = useState<MockTestSummary[]>([]);
  const [loadingTests, setLoadingTests] = useState(true);
  const [hubError, setHubError] = useState<string | null>(null);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'student-login' | 'student-register' | 'admin'>('student-login');
  const [pendingTestId, setPendingTestId] = useState<string | null>(null);

  // Active exam runner or result report overlay
  const [activeSession, setActiveSession] = useState<{
    attempt: TestAttemptRecord;
    test: MockTestRecord;
  } | null>(null);
  const [viewingResult, setViewingResult] = useState<{
    attempt: TestAttemptRecord;
    test: MockTestRecord | null;
  } | null>(null);
  const [startingTestId, setStartingTestId] = useState<string | null>(null);
  const [dashboardRefreshTrigger, setDashboardRefreshTrigger] = useState(0);

  const loadTests = useCallback(async () => {
    setLoadingTests(true);
    setHubError(null);
    try {
      const data = await fetchJson<{ tests: MockTestRecord[] }>('/api/tests');
      setTests(data.tests || []);
    } catch (err) {
      setHubError(err instanceof Error ? err.message : 'Unable to fetch mock tests.');
    } finally {
      setLoadingTests(false);
    }
  }, []);

  useEffect(() => {
    void loadTests();
  }, [loadTests]);

  const startTestNow = useCallback(
    async (testId: string) => {
      setStartingTestId(testId);
      setHubError(null);
      try {
        const res = await apiFetch<{ attempt: TestAttemptRecord; test: MockTestRecord }>(
          '/api/attempts/start',
          {
            method: 'POST',
            body: JSON.stringify({ testId }),
          }
        );
        setActiveSession(res);
      } catch (err) {
        setHubError(err instanceof Error ? err.message : 'Could not start mock test.');
      } finally {
        setStartingTestId(null);
      }
    },
    [apiFetch]
  );

  const handleRequestStartTest = (testId: string) => {
    if (!user) {
      setPendingTestId(testId);
      setAuthInitialMode('student-login');
      setAuthModalOpen(true);
      return;
    }
    void startTestNow(testId);
  };

  const handleResumeAttempt = async (attemptId: string) => {
    setHubError(null);
    try {
      const res = await apiFetch<{ attempt: TestAttemptRecord; test: MockTestRecord | null }>(
        `/api/attempts/${attemptId}`
      );
      if (res.test) {
        setActiveSession({ attempt: res.attempt, test: res.test });
      }
    } catch (err) {
      setHubError(err instanceof Error ? err.message : 'Could not resume attempt.');
    }
  };

  const handleViewResult = async (attemptId: string) => {
    setHubError(null);
    try {
      const res = await apiFetch<{ attempt: TestAttemptRecord; test: MockTestRecord | null }>(
        `/api/attempts/${attemptId}`
      );
      setViewingResult(res);
    } catch (err) {
      setHubError(err instanceof Error ? err.message : 'Could not load result report.');
    }
  };

  // Match complete 4-module exams and standalone module tests for the selected track
  const fullTests = (() => {
    const matched = tests.filter((t) => t.moduleType === 'full' && t.category === selectedCategory);
    if (matched.length > 0) return matched;
    const fallback = tests.find((t) => t.moduleType === 'full');
    return fallback ? [fallback] : [];
  })();

  const getModuleTest = (mod: Exclude<ModuleType, 'full'>) => {
    return (
      tests.find((t) => t.moduleType === mod && t.category === selectedCategory) ||
      tests.find((t) => t.moduleType === mod)
    );
  };

  const extraTests = tests.filter((t) => {
    if (t.moduleType === 'full') return false;
    const matchedSingle = (['listening', 'reading', 'writing', 'speaking'] as const).some(
      (m) => getModuleTest(m)?.id === t.id
    );
    if (matchedSingle) return false;
    return t.category === selectedCategory;
  });

  return (
    <section
      id="mock-tests"
      className="py-20 bg-white border-t border-b border-neutral-200/70 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
              <FileCheck2 className="w-4 h-4" />
              <span>Computer-Delivered Practice Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight">
              Official-Format <span className="text-[#E11D2A]">IELTS Mock Tests.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2.5 leading-relaxed">
              Experience authentic timed Listening, Reading, Writing, and Speaking simulations with automatic answer saving, microphone recording, and detailed band score reports.
            </p>
          </div>

          {/* Portal Sub-Navigation & Auth Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200">
              <button
                type="button"
                onClick={() => setPortalView('tests')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  portalView === 'tests'
                    ? 'bg-white text-[#0D0D11] shadow-xs'
                    : 'text-neutral-600 hover:text-[#0D0D11]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mock Tests</span>
              </button>
              <button
                type="button"
                onClick={() => setPortalView('student')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  portalView === 'student'
                    ? 'bg-white text-[#0D0D11] shadow-xs'
                    : 'text-neutral-600 hover:text-[#0D0D11]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Student Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => setPortalView('admin')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  portalView === 'admin'
                    ? 'bg-[#0D0D11] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#0D0D11]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            </div>

            {user ? (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs">
                <GraduationCap className="w-4 h-4 text-[#E11D2A]" />
                <span className="font-bold text-[#0D0D11] max-w-[140px] truncate">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  aria-label="Sign out"
                  className="text-neutral-500 hover:text-[#E11D2A] cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPendingTestId(null);
                  setAuthInitialMode('student-login');
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0D0D11] hover:bg-neutral-800 text-white text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#E11D2A]" />
                <span>Student Sign In</span>
              </button>
            )}
          </div>
        </div>

        {hubError && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{hubError}</span>
          </div>
        )}

        {/* VIEW 1: MOCK TESTS LANDING */}
        {portalView === 'tests' && (
          <div className="space-y-8">
            {/* Academic vs General Category Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex p-1.5 rounded-xl bg-neutral-100 border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('academic')}
                  className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'academic'
                      ? 'bg-[#E11D2A] text-white shadow-xs'
                      : 'text-neutral-700 hover:text-[#0D0D11]'
                  }`}
                >
                  IELTS Academic
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('general')}
                  className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'general'
                      ? 'bg-[#0D0D11] text-white shadow-xs'
                      : 'text-neutral-700 hover:text-[#0D0D11]'
                  }`}
                >
                  IELTS General Training
                </button>
              </div>

              <div className="text-xs text-neutral-600 font-medium">
                {selectedCategory === 'academic'
                  ? 'University Admissions & Professional Registration'
                  : 'Work Visas, Skilled Migration & Permanent Residency'}
              </div>
            </div>

            {loadingTests ? (
              <div className="py-16 flex items-center justify-center gap-2 text-sm text-neutral-600">
                <Loader2 className="w-5 h-5 animate-spin text-[#E11D2A]" />
                <span>Loading mock test suite...</span>
              </div>
            ) : (
              <>
                {/* Complete 4-Module IELTS Mock Tests */}
                {fullTests.length > 0 && (
                  <div className="space-y-5">
                    {fullTests.map((ft) => (
                      <div
                        key={ft.id}
                        className="bg-[#0D0D11] text-white rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
                      >
                        <div className="space-y-3 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#E11D2A]">
                            <span>Complete 4-Module Exam</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-neutral-300 capitalize">{ft.category} Track</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-neutral-300 tabular-nums">{ft.durationMinutes} Minutes</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-neutral-300 tabular-nums">{ft.questionCount} Tasks &amp; Questions</span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                            {ft.title}
                          </h3>

                          <p className="text-sm text-neutral-300 leading-relaxed">
                            {ft.description}
                          </p>

                          <div className="pt-1 flex flex-wrap gap-2 text-xs text-neutral-200">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
                              <Headphones className="w-3.5 h-3.5 text-[#E11D2A]" />
                              1. Listening (30m · 40 Qs)
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
                              <BookOpen className="w-3.5 h-3.5 text-[#E11D2A]" />
                              2. Reading (60m · 40 Qs)
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
                              <PenTool className="w-3.5 h-3.5 text-[#E11D2A]" />
                              3. Writing (60m · 2 Tasks)
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
                              <Mic className="w-3.5 h-3.5 text-[#E11D2A]" />
                              4. Speaking (14m · Parts 1–3)
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <button
                            type="button"
                            disabled={startingTestId === ft.id}
                            onClick={() => handleRequestStartTest(ft.id)}
                            className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60"
                          >
                            {startingTestId === ft.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Preparing Exam...</span>
                              </>
                            ) : (
                              <>
                                <span>Start Complete Mock Test</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4 Individual Module Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {(['listening', 'reading', 'writing', 'speaking'] as const).map((modKey) => {
                    const testItem = getModuleTest(modKey);
                    const meta = MODULE_META[modKey];
                    if (!testItem) return null;

                    return (
                      <div
                        key={modKey}
                        className="bg-neutral-50/70 rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between gap-5 hover:border-red-300 hover:bg-white transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200 text-[#E11D2A] flex items-center justify-center">
                              {meta.icon}
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 tabular-nums">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              {testItem.durationMinutes} min
                            </span>
                          </div>

                          <h4 className="text-lg font-bold font-display text-[#0D0D11]">
                            {meta.title}
                          </h4>
                          <p className="text-xs font-semibold text-[#E11D2A] mt-0.5 mb-2.5">
                            {meta.detailLabel}
                          </p>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {testItem.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={startingTestId === testItem.id}
                          onClick={() => handleRequestStartTest(testItem.id)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
                        >
                          {startingTestId === testItem.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Starting...</span>
                            </>
                          ) : (
                            <>
                              <span>Start {modKey.charAt(0).toUpperCase() + modKey.slice(1)} Test</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Custom Tests Added via Admin */}
                {extraTests.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="text-base font-bold font-display text-[#0D0D11]">
                      Additional Practice Modules
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {extraTests.map((t) => (
                        <div
                          key={t.id}
                          className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#E11D2A] capitalize mb-1">
                              {t.category} · {t.moduleType} · {t.durationMinutes} min
                            </div>
                            <h5 className="text-base font-bold text-[#0D0D11]">{t.title}</h5>
                            <p className="text-xs text-neutral-600 mt-1">{t.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRequestStartTest(t.id)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold cursor-pointer transition-colors"
                          >
                            <span>Start Test</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* VIEW 2: STUDENT DASHBOARD */}
        {portalView === 'student' && (
          <StudentDashboard
            onStartTest={handleRequestStartTest}
            onResumeAttempt={handleResumeAttempt}
            onViewResult={handleViewResult}
            onOpenAuth={() => {
              setAuthInitialMode('student-login');
              setAuthModalOpen(true);
            }}
            refreshTrigger={dashboardRefreshTrigger}
          />
        )}

        {/* VIEW 3: ADMIN PANEL */}
        {portalView === 'admin' && (
          <AdminDashboard
            onOpenAdminAuth={() => {
              setAuthInitialMode('admin');
              setAuthModalOpen(true);
            }}
            onTestsUpdated={loadTests}
          />
        )}
      </div>

      {/* Authentication Modal */}
      <MockTestAuthModal
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingTestId(null);
        }}
        onSuccess={() => {
          if (pendingTestId) {
            const targetId = pendingTestId;
            setPendingTestId(null);
            void startTestNow(targetId);
          }
        }}
      />

      {/* Full-Viewport Distraction-Free Exam Runner */}
      {activeSession && (
        <MockTestRunnerModal
          attempt={activeSession.attempt}
          test={activeSession.test}
          onClose={() => {
            setActiveSession(null);
            setDashboardRefreshTrigger((n) => n + 1);
          }}
          onCompleted={() => {
            setDashboardRefreshTrigger((n) => n + 1);
          }}
          onRetake={(testId) => {
            setActiveSession(null);
            void startTestNow(testId);
          }}
        />
      )}

      {/* Historical Result Report Viewer */}
      {viewingResult && (
        <div className="fixed inset-0 z-50 bg-neutral-50 overflow-y-auto">
          <TestResultView
            attempt={viewingResult.attempt}
            test={viewingResult.test}
            onRetake={(testId) => {
              setViewingResult(null);
              handleRequestStartTest(testId);
            }}
            onClose={() => setViewingResult(null)}
          />
        </div>
      )}
    </section>
  );
};

export const MockTestHub: React.FC = () => {
  return (
    <MockTestAuthProvider>
      <MockTestHubInner />
    </MockTestAuthProvider>
  );
};
