import React, { useEffect, useState, useMemo } from 'react';
import {
  Award,
  TrendingUp,
  BookOpen,
  Download,
  RotateCcw,
  Eye,
  Clock,
  Loader2,
  Play,
} from 'lucide-react';
import type { TestAttemptRecord } from '../../../shared/mockTestTypes';
import { useMockTestAuth } from './MockTestAuthContext';
import { downloadAttemptReport } from './TestResultView';

interface StudentDashboardProps {
  onStartTest: (testId: string) => void;
  onResumeAttempt: (attemptId: string) => void;
  onViewResult: (attemptId: string) => void;
  onOpenAuth: () => void;
  refreshTrigger: number;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartTest,
  onResumeAttempt,
  onViewResult,
  onOpenAuth,
  refreshTrigger,
}) => {
  const { user, apiFetch } = useMockTestAuth();
  const [attempts, setAttempts] = useState<TestAttemptRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch<{ attempts: TestAttemptRecord[] }>('/api/attempts/mine');
        if (active) setAttempts(res.attempts);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load history.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [user, apiFetch, refreshTrigger]);

  const completed = useMemo(
    () => attempts.filter((a) => a.status === 'completed' && a.overallBand !== undefined),
    [attempts]
  );

  const stats = useMemo(() => {
    const avgOverall =
      completed.length > 0
        ? completed.reduce((acc, a) => acc + (a.overallBand || 0), 0) / completed.length
        : 0;
    const bestOverall =
      completed.length > 0 ? Math.max(...completed.map((a) => a.overallBand || 0)) : 0;

    const avgFor = (field: 'listeningBand' | 'readingBand' | 'writingBand' | 'speakingBand') => {
      const vals = completed.map((a) => a[field]).filter((v): v is number => typeof v === 'number');
      if (vals.length === 0) return null;
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    };

    return {
      totalCompleted: completed.length,
      avgOverall,
      bestOverall,
      listeningAvg: avgFor('listeningBand'),
      readingAvg: avgFor('readingBand'),
      writingAvg: avgFor('writingBand'),
      speakingAvg: avgFor('speakingBand'),
    };
  }, [completed]);

  if (!user) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E11D2A] flex items-center justify-center mx-auto mb-4">
          <Award className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold font-display text-[#0D0D11] mb-2">
          Sign In to Access Your Student Dashboard
        </h3>
        <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
          Track your completed mock tests, view module-by-module band score trends, listen back to speaking recordings, and download PDF-ready score reports.
        </p>
        <button
          type="button"
          onClick={onOpenAuth}
          className="px-6 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-sm font-bold cursor-pointer"
        >
          Student Sign In / Register
        </button>
      </div>
    );
  }

  const trendPoints = [...completed].reverse().slice(-8);

  return (
    <div className="space-y-6">
      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <span className="text-xs font-bold text-neutral-500">Completed Tests</span>
          <div className="text-3xl font-black font-display tabular-nums text-[#0D0D11] mt-1">
            {stats.totalCompleted}
          </div>
          <span className="text-[11px] text-neutral-500">
            {attempts.filter((a) => a.status === 'in_progress').length} in progress
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <span className="text-xs font-bold text-neutral-500">Average Estimated Band</span>
          <div className="text-3xl font-black font-display tabular-nums text-[#E11D2A] mt-1">
            {stats.totalCompleted > 0 ? stats.avgOverall.toFixed(1) : '—'}
          </div>
          <span className="text-[11px] text-neutral-500">Practice score estimate</span>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <span className="text-xs font-bold text-neutral-500">Highest Band Achieved</span>
          <div className="text-3xl font-black font-display tabular-nums text-[#0D0D11] mt-1">
            {stats.totalCompleted > 0 ? stats.bestOverall.toFixed(1) : '—'}
          </div>
          <span className="text-[11px] text-neutral-500">Personal best</span>
        </div>

        <div className="bg-[#0D0D11] text-white rounded-2xl p-5">
          <span className="text-xs font-bold text-neutral-400">Your Target Band</span>
          <div className="text-3xl font-black font-display tabular-nums text-white mt-1">
            {user.targetBand.toFixed(1)}
          </div>
          <span className="text-[11px] text-neutral-400 capitalize">
            {user.preferredTrack} Track
          </span>
        </div>
      </div>

      {/* Module Performance + Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Individual Module Performance */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold font-display text-[#0D0D11]">
            <BookOpen className="w-4 h-4 text-[#E11D2A]" />
            <span>Module Performance Averages</span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Listening', val: stats.listeningAvg },
              { label: 'Reading', val: stats.readingAvg },
              { label: 'Writing (Estimated)', val: stats.writingAvg },
              { label: 'Speaking (Estimated)', val: stats.speakingAvg },
            ].map((m) => {
              const pct = m.val !== null ? (m.val / 9) * 100 : 0;
              return (
                <div key={m.label}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-neutral-700">{m.label}</span>
                    <span className="tabular-nums text-[#0D0D11]">
                      {m.val !== null ? `Band ${m.val.toFixed(1)}` : 'No data yet'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-[#E11D2A] rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Band Progress Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-base font-bold font-display text-[#0D0D11]">
              <TrendingUp className="w-4 h-4 text-[#E11D2A]" />
              <span>Score Progress Tracking</span>
            </div>
            <span className="text-xs text-neutral-500">Target: {user.targetBand.toFixed(1)}</span>
          </div>

          {trendPoints.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              Complete your first mock test to see your band progression chart.
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 560 180" className="w-full h-44" role="img" aria-label="Band score trend chart">
                {/* Horizontal gridlines at Bands 5, 7, 9 */}
                {[5, 7, 9].map((band) => {
                  const y = 150 - (band / 9) * 125;
                  return (
                    <g key={band}>
                      <line x1="36" y1={y} x2="540" y2={y} stroke="#E5E5E5" strokeDasharray="3 3" />
                      <text x="8" y={y + 4} fontSize="10" fill="#737373" className="tabular-nums">
                        {band}.0
                      </text>
                    </g>
                  );
                })}

                {/* Target Band dashed reference line */}
                <line
                  x1="36"
                  y1={150 - (user.targetBand / 9) * 125}
                  x2="540"
                  y2={150 - (user.targetBand / 9) * 125}
                  stroke="#0D0D11"
                  strokeDasharray="5 4"
                  strokeWidth="1.2"
                />

                {/* Line Path */}
                {trendPoints.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#E11D2A"
                    strokeWidth="2.5"
                    points={trendPoints
                      .map((pt, idx) => {
                        const x = 56 + (idx * 460) / Math.max(1, trendPoints.length - 1);
                        const y = 150 - ((pt.overallBand || 0) / 9) * 125;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}

                {/* Data Points */}
                {trendPoints.map((pt, idx) => {
                  const x =
                    trendPoints.length === 1
                      ? 280
                      : 56 + (idx * 460) / Math.max(1, trendPoints.length - 1);
                  const y = 150 - ((pt.overallBand || 0) / 9) * 125;
                  return (
                    <g key={pt.id}>
                      <circle cx={x} cy={y} r="5" fill="#E11D2A" stroke="#FFFFFF" strokeWidth="2" />
                      <text x={x} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D0D11">
                        {(pt.overallBand || 0).toFixed(1)}
                      </text>
                      <text x={x} y={168} textAnchor="middle" fontSize="10" fill="#737373">
                        Test {idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Previous Test History Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h4 className="text-base font-bold font-display text-[#0D0D11]">
            Your Mock Test History
          </h4>
          {loading && <Loader2 className="w-4 h-4 animate-spin text-[#E11D2A]" />}
        </div>

        {error && <div className="p-4 text-xs text-red-600">{error}</div>}

        {attempts.length === 0 && !loading ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-sm text-neutral-600">You haven’t taken any mock tests yet.</p>
            <button
              type="button"
              onClick={() => onStartTest('full-academic-01')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D2A] text-white text-xs font-bold cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Take Your First Full Mock Test</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                <tr>
                  <th className="py-3 px-5">Mock Test</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Overall Band</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {attempts.map((a) => (
                  <tr key={a.id} className="hover:bg-neutral-50/60">
                    <td className="py-3.5 px-5 font-bold text-[#0D0D11]">
                      {a.testTitle || a.testId}
                    </td>
                    <td className="py-3.5 px-4 capitalize text-neutral-600">{a.category}</td>
                    <td className="py-3.5 px-4">
                      {a.status === 'completed' ? (
                        <span className="font-bold text-emerald-700">Completed</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                          <Clock className="w-3.5 h-3.5" />
                          In Progress
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-display font-black text-sm tabular-nums text-[#0D0D11]">
                      {a.overallBand !== undefined ? a.overallBand.toFixed(1) : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 tabular-nums">
                      {new Date(a.completedAt || a.startedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        {a.status === 'in_progress' ? (
                          <button
                            type="button"
                            onClick={() => onResumeAttempt(a.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#E11D2A] text-white font-bold cursor-pointer"
                          >
                            Resume
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => onViewResult(a.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 font-semibold text-[#0D0D11] cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Report</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => downloadAttemptReport(a)}
                              title="Download HTML Report"
                              className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onStartTest(a.testId)}
                              title="Retake Test"
                              className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-[#E11D2A] cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
