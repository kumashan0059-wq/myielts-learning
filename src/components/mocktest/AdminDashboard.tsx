import React, { useEffect, useState, useCallback } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Users,
  FileAudio,
  ClipboardList,
  Loader2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type {
  MockTestRecord,
  UserProfile,
  TestAttemptRecord,
  AudioAssetRecord,
  TestCategory,
  ModuleType,
} from '../../../shared/mockTestTypes';
import { useMockTestAuth } from './MockTestAuthContext';
import { buildApiUrl } from '../../utils/apiClient';
import { AuthAudioPlayer } from './AuthAudioPlayer';

interface AdminDashboardProps {
  onOpenAdminAuth: () => void;
  onTestsUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenAdminAuth,
  onTestsUpdated,
}) => {
  const { user, apiFetch } = useMockTestAuth();
  const [activeTab, setActiveTab] = useState<'tests' | 'audio' | 'submissions' | 'students'>('tests');
  const [tests, setTests] = useState<MockTestRecord[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [attempts, setAttempts] = useState<TestAttemptRecord[]>([]);
  const [audioAssets, setAudioAssets] = useState<AudioAssetRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Create/Edit Test modal state
  const [editingTest, setEditingTest] = useState<MockTestRecord | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<TestCategory>('academic');
  const [formModuleType, setFormModuleType] = useState<ModuleType>('reading');
  const [formDuration, setFormDuration] = useState(60);
  const [formQuestionCount, setFormQuestionCount] = useState(10);
  const [formDescription, setFormDescription] = useState('');
  const [formPublished, setFormPublished] = useState(true);
  const [formPayloadStr, setFormPayloadStr] = useState('{}');

  // Quick Structured Editors inside Edit Test Modal
  const [quickWritingT1, setQuickWritingT1] = useState('');
  const [quickWritingT2, setQuickWritingT2] = useState('');
  const [quickCueTopic, setQuickCueTopic] = useState('');
  const [quickReadingTitle, setQuickReadingTitle] = useState('');
  const [quickReadingText, setQuickReadingText] = useState('');

  // Audio upload state
  const [uploadingAudio, setUploadingAudio] = useState(false);

  // Selected submission detail modal
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttemptRecord | null>(null);
  const [instructorNote, setInstructorNote] = useState('');

  const loadOverview = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await apiFetch<{
        tests: MockTestRecord[];
        users: UserProfile[];
        attempts: TestAttemptRecord[];
        audioAssets: AudioAssetRecord[];
      }>('/api/admin/overview');
      setTests(data.tests);
      setUsers(data.users);
      setAttempts(data.attempts);
      setAudioAssets(data.audioAssets);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to load admin overview.');
    } finally {
      setLoading(false);
    }
  }, [user, apiFetch]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#0D0D11] text-white flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7 text-[#E11D2A]" />
        </div>
        <h3 className="text-2xl font-bold font-display text-[#0D0D11] mb-2">
          Admin Panel Access Required
        </h3>
        <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
          Sign in with your administrator credentials to create or edit IELTS mock tests, upload listening audio tracks, review speaking recordings, and manage student results.
        </p>
        <button
          type="button"
          onClick={onOpenAdminAuth}
          className="px-6 py-3 rounded-xl bg-[#0D0D11] hover:bg-neutral-800 text-white text-sm font-bold cursor-pointer"
        >
          Admin Sign In / Initial Setup
        </button>
      </div>
    );
  }

  const openCreateModal = () => {
    setEditingTest(null);
    setIsCreatingNew(true);
    setFormTitle('New Custom IELTS Practice Test');
    setFormCategory('academic');
    setFormModuleType('writing');
    setFormDuration(60);
    setFormQuestionCount(2);
    setFormDescription('Custom mock test created by MY IELTS Admin.');
    setFormPublished(true);

    const starterPayload = {
      writingTasks: [
        {
          id: 'custom-w1',
          taskNumber: 1,
          title: 'Writing Task 1',
          instructions: 'Write at least 150 words in 20 minutes.',
          prompt: 'Summarize the key trends shown in the regional graduate employment report.',
          minWords: 150,
          recommendedMinutes: 20,
        },
        {
          id: 'custom-w2',
          taskNumber: 2,
          title: 'Writing Task 2',
          instructions: 'Write at least 250 words in 40 minutes.',
          prompt: 'Some people think remote education will replace physical university campuses. To what extent do you agree or disagree?',
          minWords: 250,
          recommendedMinutes: 40,
        },
      ],
    };
    setFormPayloadStr(JSON.stringify(starterPayload, null, 2));
    setQuickWritingT1(starterPayload.writingTasks[0].prompt);
    setQuickWritingT2(starterPayload.writingTasks[1].prompt);
    setQuickCueTopic('');
    setQuickReadingTitle('');
    setQuickReadingText('');
  };

  const openEditModal = (t: MockTestRecord) => {
    setIsCreatingNew(false);
    setEditingTest(t);
    setFormTitle(t.title);
    setFormCategory(t.category);
    setFormModuleType(t.moduleType);
    setFormDuration(t.durationMinutes);
    setFormQuestionCount(t.questionCount);
    setFormDescription(t.description);
    setFormPublished(t.isPublished);
    setFormPayloadStr(JSON.stringify(t.payload, null, 2));

    setQuickWritingT1(t.payload.writingTasks?.[0]?.prompt || '');
    setQuickWritingT2(t.payload.writingTasks?.[1]?.prompt || '');
    setQuickCueTopic(t.payload.speaking?.part2?.cueCard?.topic || '');
    setQuickReadingTitle(t.payload.readingPassages?.[0]?.title || '');
    setQuickReadingText(t.payload.readingPassages?.[0]?.paragraphs?.[0]?.text || '');
  };

  const handleSaveTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const parsedPayload = JSON.parse(formPayloadStr);

      // Apply quick structured prompt edits if present
      if (parsedPayload.writingTasks?.[0] && quickWritingT1.trim()) {
        parsedPayload.writingTasks[0].prompt = quickWritingT1.trim();
      }
      if (parsedPayload.writingTasks?.[1] && quickWritingT2.trim()) {
        parsedPayload.writingTasks[1].prompt = quickWritingT2.trim();
      }
      if (parsedPayload.speaking?.part2?.cueCard && quickCueTopic.trim()) {
        parsedPayload.speaking.part2.cueCard.topic = quickCueTopic.trim();
      }
      if (parsedPayload.readingPassages?.[0] && quickReadingTitle.trim()) {
        parsedPayload.readingPassages[0].title = quickReadingTitle.trim();
        if (parsedPayload.readingPassages[0].paragraphs?.[0] && quickReadingText.trim()) {
          parsedPayload.readingPassages[0].paragraphs[0].text = quickReadingText.trim();
        }
      }

      if (isCreatingNew) {
        await apiFetch('/api/admin/tests', {
          method: 'POST',
          body: JSON.stringify({
            title: formTitle,
            category: formCategory,
            moduleType: formModuleType,
            durationMinutes: formDuration,
            questionCount: formQuestionCount,
            description: formDescription,
            isPublished: formPublished,
            payload: parsedPayload,
          }),
        });
        setStatusMsg('New mock test created and published.');
      } else if (editingTest) {
        await apiFetch(`/api/admin/tests/${editingTest.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: formTitle,
            category: formCategory,
            durationMinutes: formDuration,
            questionCount: formQuestionCount,
            description: formDescription,
            isPublished: formPublished,
            payload: parsedPayload,
          }),
        });
        setStatusMsg(`Updated "${formTitle}".`);
      }

      setEditingTest(null);
      setIsCreatingNew(false);
      await loadOverview();
      onTestsUpdated();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save test (check JSON syntax).');
    }
  };

  const handleDeleteTest = async (id: string) => {
    setErrorMsg(null);
    try {
      await apiFetch(`/api/admin/tests/${id}`, { method: 'DELETE' });
      setStatusMsg('Mock test deleted.');
      await loadOverview();
      onTestsUpdated();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  const handleUploadListeningAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAudio(true);
    setErrorMsg(null);
    setStatusMsg(null);
    try {
      const formData = new FormData();
      formData.append('audio', file);
      const data = await apiFetch<{ asset: AudioAssetRecord }>('/api/admin/audio', {
        method: 'POST',
        body: formData,
      });
      setStatusMsg(`Uploaded audio file (${data.asset.url}). Assign it to any Listening section below.`);
      await loadOverview();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Audio upload error.');
    } finally {
      setUploadingAudio(false);
      e.target.value = '';
    }
  };

  const handleAssignAudioToSection = async (testId: string, sectionNumber: number, audioUrl: string) => {
    const targetTest = tests.find((t) => t.id === testId);
    if (!targetTest || !targetTest.payload.listeningSections) return;

    const updatedPayload = {
      ...targetTest.payload,
      listeningSections: targetTest.payload.listeningSections.map((sec) =>
        sec.sectionNumber === sectionNumber
          ? { ...sec, audioUrl: audioUrl || undefined, hasAudioFile: Boolean(audioUrl) }
          : sec
      ),
    };

    try {
      await apiFetch(`/api/admin/tests/${testId}`, {
        method: 'PUT',
        body: JSON.stringify({ payload: updatedPayload }),
      });
      setStatusMsg(`Assigned audio to ${targetTest.title} — Section ${sectionNumber}.`);
      await loadOverview();
      onTestsUpdated();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to assign audio.');
    }
  };

  const handleSaveInstructorNote = async () => {
    if (!selectedAttempt) return;
    try {
      await apiFetch(`/api/admin/attempts/${selectedAttempt.id}/note`, {
        method: 'PUT',
        body: JSON.stringify({ instructorNote }),
      });
      setStatusMsg('Instructor review note saved.');
      setSelectedAttempt(null);
      await loadOverview();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not save note.');
    }
  };

  const handleDeleteAttempt = async (attemptId: string) => {
    try {
      await apiFetch(`/api/admin/attempts/${attemptId}`, { method: 'DELETE' });
      setStatusMsg('Test submission removed.');
      await loadOverview();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      setStatusMsg('Student account deleted.');
      await loadOverview();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not delete user.');
    }
  };

  const listeningTests = tests.filter((t) => t.payload.listeningSections && t.payload.listeningSections.length > 0);
  const uploadedListeningAudio = audioAssets.filter((a) => a.kind !== 'speaking_recording');

  return (
    <div className="space-y-6">
      {/* Admin Tabs & Status Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-neutral-200 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'tests', label: 'Mock Tests', icon: <ClipboardList className="w-4 h-4" /> },
            { id: 'audio', label: 'Listening Audio', icon: <FileAudio className="w-4 h-4" /> },
            { id: 'submissions', label: 'Submissions & Speaking', icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: 'students', label: 'Students & Accounts', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0D0D11] text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin text-[#E11D2A]" />}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Mock Test</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TAB 1: MOCK TESTS */}
      {activeTab === 'tests' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                <tr>
                  <th className="py-3 px-5">Test Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4 text-right">Duration</th>
                  <th className="py-3 px-4 text-right">Questions</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {tests.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50/70">
                    <td className="py-3.5 px-5 font-bold text-[#0D0D11]">{t.title}</td>
                    <td className="py-3.5 px-4 capitalize text-neutral-700">{t.category}</td>
                    <td className="py-3.5 px-4 capitalize text-neutral-700">{t.moduleType}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums">{t.durationMinutes} min</td>
                    <td className="py-3.5 px-4 text-right tabular-nums">{t.questionCount}</td>
                    <td className="py-3.5 px-4">
                      <span className={`font-bold ${t.isPublished ? 'text-emerald-700' : 'text-neutral-500'}`}>
                        {t.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(t)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 font-bold text-[#0D0D11] cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTest(t.id)}
                          aria-label={`Delete ${t.title}`}
                          className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-red-50 text-[#E11D2A] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LISTENING AUDIO LIBRARY */}
      {activeTab === 'audio' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold font-display text-[#0D0D11]">
                Upload Listening Audio Files
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Supported formats: MP3, WAV, OGG, M4A, WebM (max 25 MB). Assign uploaded tracks to any Listening section.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D0D11] hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer shrink-0">
              {uploadingAudio ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-[#E11D2A]" />}
              <span>{uploadingAudio ? 'Uploading...' : 'Upload Audio File'}</span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleUploadListeningAudio}
                disabled={uploadingAudio}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Uploaded Audio Files */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
              <h5 className="text-sm font-bold text-[#0D0D11]">Uploaded &amp; Cached Audio Library</h5>
              {uploadedListeningAudio.length === 0 ? (
                <p className="text-xs text-neutral-500 py-4">
                  No custom audio files uploaded yet. Upload an MP3/WAV above or generate studio TTS tracks during exams.
                </p>
              ) : (
                <div className="space-y-3">
                  {uploadedListeningAudio.map((asset) => (
                    <div key={asset.id} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0D0D11] truncate">{asset.filename}</span>
                        <span className="text-neutral-500 tabular-nums">
                          {Math.round(asset.sizeBytes / 1024)} KB
                        </span>
                      </div>
                      <audio controls src={buildApiUrl(asset.url)} className="w-full h-9" preload="metadata" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assign Audio to Listening Sections */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
              <h5 className="text-sm font-bold text-[#0D0D11]">Assign Audio to Test Sections</h5>
              <div className="space-y-4">
                {listeningTests.map((lt) => (
                  <div key={lt.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                    <div className="text-xs font-bold text-[#0D0D11]">{lt.title}</div>
                    {lt.payload.listeningSections?.map((sec) => (
                      <div key={sec.id} className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-neutral-700 font-medium">Section {sec.sectionNumber}</span>
                        <select
                          value={sec.audioUrl || ''}
                          onChange={(e) => handleAssignAudioToSection(lt.id, sec.sectionNumber, e.target.value)}
                          className="max-w-[220px] px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs text-[#0D0D11]"
                        >
                          <option value="">Default (On-demand TTS / Narrator)</option>
                          {uploadedListeningAudio.map((a) => (
                            <option key={a.id} value={a.url}>
                              {a.filename}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT SUBMISSIONS & SPEAKING REVIEW */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {attempts.length === 0 ? (
            <div className="p-10 text-center text-xs text-neutral-500">
              No student submissions recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                  <tr>
                    <th className="py-3 px-5">Student</th>
                    <th className="py-3 px-4">Test</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Band</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-5 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {attempts.map((a) => (
                    <tr key={a.id} className="hover:bg-neutral-50/70">
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-[#0D0D11]">{a.userName || 'Student'}</div>
                        <div className="text-[11px] text-neutral-500">{a.userEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-800">{a.testTitle}</td>
                      <td className="py-3.5 px-4 capitalize">{a.status.replace('_', ' ')}</td>
                      <td className="py-3.5 px-4 text-right font-display font-black tabular-nums text-[#E11D2A]">
                        {a.overallBand !== undefined ? a.overallBand.toFixed(1) : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-500 tabular-nums">
                        {new Date(a.completedAt || a.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAttempt(a);
                              setInstructorNote(a.results?.instructorNote || '');
                            }}
                            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 font-bold text-[#0D0D11] cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAttempt(a.id)}
                            className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-red-50 text-[#E11D2A] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: STUDENTS & ACCOUNTS */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                <tr>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4 text-right">Target Band</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-50/70">
                    <td className="py-3.5 px-5 font-bold text-[#0D0D11]">{u.name}</td>
                    <td className="py-3.5 px-4 text-neutral-600">{u.email}</td>
                    <td className="py-3.5 px-4 uppercase font-bold text-[11px]">{u.role}</td>
                    <td className="py-3.5 px-4 capitalize">{u.preferredTrack}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums font-bold">{u.targetBand.toFixed(1)}</td>
                    <td className="py-3.5 px-5 text-right">
                      {u.id !== user.id && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id)}
                          aria-label={`Delete ${u.email}`}
                          className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-red-50 text-[#E11D2A] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MOCK TEST MODAL */}
      {(isCreatingNew || editingTest) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
            <div className="px-6 py-4 bg-[#0D0D11] text-white flex items-center justify-between">
              <h4 className="text-base font-bold font-display">
                {isCreatingNew ? 'Create New Mock Test' : `Edit Mock Test: ${editingTest?.title}`}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setEditingTest(null);
                  setIsCreatingNew(false);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTest} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Test Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as TestCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm"
                    >
                      <option value="academic">Academic</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Module</label>
                    <select
                      value={formModuleType}
                      disabled={!isCreatingNew}
                      onChange={(e) => setFormModuleType(e.target.value as ModuleType)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm disabled:bg-neutral-100"
                    >
                      <option value="full">Full Mock</option>
                      <option value="listening">Listening</option>
                      <option value="reading">Reading</option>
                      <option value="writing">Writing</option>
                      <option value="speaking">Speaking</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    min={5}
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Questions</label>
                  <input
                    type="number"
                    min={1}
                    value={formQuestionCount}
                    onChange={(e) => setFormQuestionCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm tabular-nums"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="accent-[#E11D2A]"
                    />
                    Published to Students
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Description</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              {/* Quick Content Editors */}
              {(quickWritingT1 || quickWritingT2) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Writing Task 1 Prompt</label>
                    <textarea
                      rows={3}
                      value={quickWritingT1}
                      onChange={(e) => setQuickWritingT1(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Writing Task 2 Prompt</label>
                    <textarea
                      rows={3}
                      value={quickWritingT2}
                      onChange={(e) => setQuickWritingT2(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                    />
                  </div>
                </div>
              )}

              {quickCueTopic && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Speaking Part 2 Cue Card Topic</label>
                  <input
                    type="text"
                    value={quickCueTopic}
                    onChange={(e) => setQuickCueTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                  />
                </div>
              )}

              {quickReadingTitle && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <label className="block text-xs font-bold text-neutral-800">Reading Passage 1 Title</label>
                  <input
                    type="text"
                    value={quickReadingTitle}
                    onChange={(e) => setQuickReadingTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                  />
                  <label className="block text-xs font-bold text-neutral-800">Passage 1 Paragraph A</label>
                  <textarea
                    rows={3}
                    value={quickReadingText}
                    onChange={(e) => setQuickReadingText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Full Structured Test Payload (Passages, Questions, Listening Transcripts, Tasks)
                </label>
                <textarea
                  rows={8}
                  value={formPayloadStr}
                  onChange={(e) => setFormPayloadStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono text-xs bg-neutral-50"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTest(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D2A] text-white text-xs font-bold cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Mock Test</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSPECT SUBMISSION & SPEAKING AUDIO MODAL */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
            <div className="px-6 py-4 bg-[#0D0D11] text-white flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold font-display">
                  Submission Review — {selectedAttempt.userName}
                </h4>
                <p className="text-xs text-neutral-400">
                  {selectedAttempt.testTitle} · Overall Band: {selectedAttempt.overallBand?.toFixed(1) ?? '—'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAttempt(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Speaking Recordings Playback */}
              {(['part1', 'part2', 'part3'] as const).some((pk) => selectedAttempt.answers.speaking?.[pk]?.audioUrl) && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Student Speaking Recordings
                  </h5>
                  {(['part1', 'part2', 'part3'] as const).map((pk) => {
                    const part = selectedAttempt.answers.speaking?.[pk];
                    if (!part?.audioUrl) return null;
                    return (
                      <div key={pk} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                        <AuthAudioPlayer src={part.audioUrl} label={`${pk.toUpperCase()} Audio Recording`} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Writing Essays */}
              {(selectedAttempt.answers.writing?.task1?.text || selectedAttempt.answers.writing?.task2?.text) && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Submitted Writing Responses
                  </h5>
                  {selectedAttempt.answers.writing?.task1?.text && (
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <strong className="block text-[#0D0D11] mb-1">
                        Task 1 ({selectedAttempt.answers.writing.task1.wordCount} words)
                      </strong>
                      <p className="whitespace-pre-line text-neutral-700 leading-relaxed">
                        {selectedAttempt.answers.writing.task1.text}
                      </p>
                    </div>
                  )}
                  {selectedAttempt.answers.writing?.task2?.text && (
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <strong className="block text-[#0D0D11] mb-1">
                        Task 2 ({selectedAttempt.answers.writing.task2.wordCount} words)
                      </strong>
                      <p className="whitespace-pre-line text-neutral-700 leading-relaxed">
                        {selectedAttempt.answers.writing.task2.text}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Instructor Note */}
              {selectedAttempt.status === 'completed' && (
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <label className="block text-xs font-bold text-[#0D0D11]">
                    Instructor Feedback Note (visible in Student Report)
                  </label>
                  <textarea
                    rows={3}
                    value={instructorNote}
                    onChange={(e) => setInstructorNote(e.target.value)}
                    placeholder="Add personalized coaching feedback for this student..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveInstructorNote}
                      className="px-4 py-2 rounded-xl bg-[#E11D2A] text-white text-xs font-bold cursor-pointer"
                    >
                      Save Instructor Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
