import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import type {
  UserProfile,
  MockTestRecord,
  TestAttemptRecord,
  AudioAssetRecord,
  TestCategory,
  ModuleType,
  MockTestPayload,
  AttemptAnswers,
  SingleModuleKey,
  AttemptResults,
} from '../shared/mockTestTypes.ts';

const IS_SERVERLESS = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const ROOT_DIR = process.cwd();
const STORAGE_ROOT = IS_SERVERLESS ? path.resolve('/tmp', 'myielts') : ROOT_DIR;
export const DATA_DIR = path.resolve(STORAGE_ROOT, 'data');
export const UPLOADS_DIR = path.resolve(STORAGE_ROOT, 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DB_PATH = path.resolve(DATA_DIR, 'myielts.db');
export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode and foreign keys for reliability
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('student', 'admin')),
    target_band REAL NOT NULL DEFAULT 7.5,
    preferred_track TEXT NOT NULL DEFAULT 'academic',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS mock_tests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('academic', 'general')),
    module_type TEXT NOT NULL CHECK(module_type IN ('listening', 'reading', 'writing', 'speaking', 'full')),
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    question_count INTEGER NOT NULL,
    is_published INTEGER NOT NULL DEFAULT 1,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS test_attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    test_id TEXT NOT NULL,
    category TEXT NOT NULL,
    module_type TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('in_progress', 'completed')),
    current_stage TEXT NOT NULL,
    answers_json TEXT NOT NULL,
    remaining_seconds_json TEXT NOT NULL,
    results_json TEXT,
    overall_band REAL,
    listening_band REAL,
    reading_band REAL,
    writing_band REAL,
    speaking_band REAL,
    started_at TEXT NOT NULL,
    completed_at TEXT,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES mock_tests(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS audio_assets (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    kind TEXT NOT NULL,
    owner_user_id TEXT,
    attempt_id TEXT,
    part_key TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    inquiry_type TEXT NOT NULL CHECK(inquiry_type IN ('consultation', 'batch', 'contact')),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT,
    destination TEXT,
    timing TEXT,
    message TEXT,
    created_at TEXT NOT NULL
  );
`);

// Ephemeral in-memory fallback for signing session tokens when SESSION_SECRET isn't configured
const IN_MEMORY_SESSION_KEY = crypto.randomBytes(32).toString('hex');

function getSessionSecret(): string {
  const envSecret = process.env.SESSION_SECRET?.trim();
  return envSecret && envSecret.length >= 16 ? envSecret : IN_MEMORY_SESSION_KEY;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, hashHex] = parts;
  const expectedBuf = Buffer.from(hashHex, 'hex');
  const actualBuf = crypto.scryptSync(password, salt, 64);
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

export interface SessionPayload {
  userId: string;
  role: 'student' | 'admin';
  exp: number;
}

export function createSessionToken(userId: string, role: 'student' | 'admin'): string {
  const payload: SessionPayload = {
    userId,
    role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encoded, sig] = parts;
    const expectedSig = crypto
      .createHmac('sha256', getSessionSecret())
      .update(encoded)
      .digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.userId || !payload.role || typeof payload.exp !== 'number') return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getEnvAdminPasscode(): string | null {
  const raw = process.env.ADMIN_PASSCODE?.trim();
  if (!raw || raw === '""' || raw === "''") return null;
  return raw;
}

export function getAdminClaimStatus(): {
  hasEnvPasscode: boolean;
  hasClaimedAdmin: boolean;
  needsInitialSetup: boolean;
} {
  const hasEnvPasscode = Boolean(getEnvAdminPasscode());
  const row = db
    .prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1")
    .get() as { id: string } | undefined;
  const hasClaimedAdmin = Boolean(row);
  return {
    hasEnvPasscode,
    hasClaimedAdmin,
    needsInitialSetup: !hasEnvPasscode && !hasClaimedAdmin,
  };
}

export function mapUserRow(row: Record<string, unknown>): UserProfile {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    role: (row.role === 'admin' ? 'admin' : 'student'),
    targetBand: Number(row.target_band ?? 7.5),
    preferredTrack: (row.preferred_track === 'general' ? 'general' : 'academic'),
    createdAt: String(row.created_at),
  };
}

export function mapTestRow(row: Record<string, unknown>, includeAnswers = true): MockTestRecord {
  const payload = JSON.parse(String(row.payload_json)) as MockTestPayload;
  if (!includeAnswers) {
    // Strip answer keys, explanations, model answers, and evaluation criteria during active tests
    if (payload.listeningSections) {
      payload.listeningSections = payload.listeningSections.map((sec) => ({
        ...sec,
        questions: sec.questions.map((q) => ({
          ...q,
          acceptedAnswers: [],
          explanation: '',
        })),
        richGroups: sec.richGroups?.map((grp) => ({
          ...grp,
          questions: grp.questions.map((q) => ({
            ...q,
            acceptedAnswers: [],
            explanation: '',
          })),
        })),
      }));
    }
    if (payload.readingPassages) {
      payload.readingPassages = payload.readingPassages.map((pas) => ({
        ...pas,
        questions: pas.questions.map((q) => ({
          ...q,
          acceptedAnswers: [],
          explanation: '',
        })),
        richGroups: pas.richGroups?.map((grp) => ({
          ...grp,
          questions: grp.questions.map((q) => ({
            ...q,
            acceptedAnswers: [],
            explanation: '',
          })),
        })),
      }));
    }
    if (payload.writingTasks) {
      payload.writingTasks = payload.writingTasks.map((task) => {
        const cleanTask = { ...task };
        delete cleanTask.modelAnswer;
        delete cleanTask.keyFeatures;
        delete cleanTask.suggestedStructure;
        return cleanTask;
      });
    }
    delete payload.writingEvaluationCriteria;
    if (payload.speaking) {
      const cleanSpeaking = { ...payload.speaking };
      delete cleanSpeaking.evaluationCriteria;
      payload.speaking = cleanSpeaking;
    }
  }
  return {
    id: String(row.id),
    title: String(row.title),
    category: row.category as TestCategory,
    moduleType: row.module_type as ModuleType,
    description: String(row.description),
    durationMinutes: Number(row.duration_minutes),
    questionCount: Number(row.question_count),
    isPublished: Number(row.is_published) === 1,
    payload,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export function mapAttemptRow(row: Record<string, unknown>): TestAttemptRecord {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    userName: row.user_name ? String(row.user_name) : undefined,
    userEmail: row.user_email ? String(row.user_email) : undefined,
    testId: String(row.test_id),
    testTitle: row.test_title ? String(row.test_title) : undefined,
    category: row.category as TestCategory,
    moduleType: row.module_type as ModuleType,
    status: row.status as 'in_progress' | 'completed',
    currentStage: row.current_stage as SingleModuleKey,
    answers: JSON.parse(String(row.answers_json)) as AttemptAnswers,
    remainingSeconds: JSON.parse(String(row.remaining_seconds_json)) as Record<SingleModuleKey, number>,
    results: row.results_json ? (JSON.parse(String(row.results_json)) as AttemptResults) : undefined,
    overallBand: row.overall_band !== null && row.overall_band !== undefined ? Number(row.overall_band) : undefined,
    listeningBand: row.listening_band !== null && row.listening_band !== undefined ? Number(row.listening_band) : undefined,
    readingBand: row.reading_band !== null && row.reading_band !== undefined ? Number(row.reading_band) : undefined,
    writingBand: row.writing_band !== null && row.writing_band !== undefined ? Number(row.writing_band) : undefined,
    speakingBand: row.speaking_band !== null && row.speaking_band !== undefined ? Number(row.speaking_band) : undefined,
    startedAt: String(row.started_at),
    completedAt: row.completed_at ? String(row.completed_at) : undefined,
    updatedAt: String(row.updated_at),
  };
}

export function mapAudioRow(row: Record<string, unknown>): AudioAssetRecord {
  const id = String(row.id);
  return {
    id,
    filename: String(row.filename),
    mimeType: String(row.mime_type),
    sizeBytes: Number(row.size_bytes),
    kind: row.kind as AudioAssetRecord['kind'],
    ownerUserId: row.owner_user_id ? String(row.owner_user_id) : undefined,
    attemptId: row.attempt_id ? String(row.attempt_id) : undefined,
    partKey: row.part_key ? String(row.part_key) : undefined,
    url: `/api/audio/${id}`,
    createdAt: String(row.created_at),
  };
}
