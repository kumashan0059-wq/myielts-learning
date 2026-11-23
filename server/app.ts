import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import {
  db,
  UPLOADS_DIR,
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  getEnvAdminPasscode,
  getAdminClaimStatus,
  mapUserRow,
  mapTestRow,
  mapAttemptRow,
  mapAudioRow,
} from './db.ts';
import { seedInitialMockTests } from './seed.ts';
import { ensureCustomAcademicMockTest } from './practiceMockTest1.ts';
import {
  gradeObjectiveListening,
  gradeObjectiveReading,
  calculateOverallBand,
} from './scoring.ts';
import {
  evaluateWritingWithGemini,
  evaluateSpeakingWithGemini,
  generateListeningSectionWav,
} from './geminiEval.ts';
import type {
  UserProfile,
  MockTestPayload,
  TestCategory,
  ModuleType,
  AttemptAnswers,
  SingleModuleKey,
  AttemptResults,
  WritingEvaluationResult,
  SpeakingEvaluationResult,
  ObjectiveQuestionReview,
} from '../shared/mockTestTypes.ts';

let seeded = false;
function ensureSeeded(): void {
  if (seeded) return;
  seedInitialMockTests();
  ensureCustomAcademicMockTest();
  seeded = true;
}

interface AuthenticatedRequest extends Request {
  user?: UserProfile;
}

const ALLOWED_AUDIO_MIMES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/webm',
  'video/webm',
  'audio/ogg',
  'audio/mp4',
  'audio/m4a',
  'audio/x-m4a',
  'audio/aac',
]);

function resolveSafeUploadPath(filename: string): string {
  const safeBase = path.basename(filename);
  const resolved = path.resolve(UPLOADS_DIR, safeBase);
  if (!resolved.startsWith(UPLOADS_DIR + path.sep)) {
    throw new Error('Invalid upload path.');
  }
  return resolved;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = /^[a-z0-9.]{1,8}$/.test(ext) ? ext : '.audio';
    cb(null, `${crypto.randomUUID()}${safeExt}`);
  },
});

const uploadAudio = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const baseMime = file.mimetype.split(';')[0].trim().toLowerCase();
    if (ALLOWED_AUDIO_MIMES.has(baseMime)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported audio file format: ${file.mimetype}`));
    }
  },
});

function extractUserFromRequest(req: Request): UserProfile | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  const session = verifySessionToken(token);
  if (!session) return null;
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(session.userId) as
    | Record<string, unknown>
    | undefined;
  if (!row) return null;
  return mapUserRow(row);
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const user = extractUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: 'Authentication required. Please sign in.' });
    return;
  }
  req.user = user;
  next();
}

function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const user = extractUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: 'Admin authentication required.' });
    return;
  }
  if (user.role !== 'admin') {
    res.status(403).json({ error: 'Admin privileges required for this action.' });
    return;
  }
  req.user = user;
  next();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function timingSafeStringMatch(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function getAllowedCorsOrigin(req: Request): string | null {
  const origin = req.headers.origin;
  if (!origin || typeof origin !== 'string') return null;

  const configuredOrigins = [
    process.env.APP_URL,
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
  ]
    .map((v) => v?.trim().replace(/\/+$/, ''))
    .filter((v): v is string => Boolean(v));

  if (configuredOrigins.includes(origin)) {
    return origin;
  }

  try {
    const parsedOrigin = new URL(origin);
    const requestHost = String(req.headers['x-forwarded-host'] || req.headers.host || '').toLowerCase();
    if (requestHost && parsedOrigin.host.toLowerCase() === requestHost) {
      return origin;
    }
  } catch {
    return null;
  }

  return null;
}

export function createApiApp(): express.Express {
  ensureSeeded();

  const app = express();
  app.set('trust proxy', 1);

  // Normalize serverless function prefixes (/.netlify/functions/api/* or Vercel stripped /api)
  app.use((req: Request, _res: Response, next: NextFunction) => {
    const fnPrefix = '/.netlify/functions/api';
    if (req.url === fnPrefix || req.url === `${fnPrefix}/`) {
      req.url = '/api/health';
    } else if (req.url.startsWith(`${fnPrefix}/`)) {
      const rest = req.url.slice(fnPrefix.length);
      req.url = rest.startsWith('/api/') || rest === '/api' ? rest : `/api${rest}`;
    } else if (
      (process.env.VERCEL || process.env.VERCEL_ENV || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) &&
      !req.url.startsWith('/api')
    ) {
      req.url = req.url === '/' ? '/api/health' : `/api${req.url.startsWith('/') ? req.url : `/${req.url}`}`;
    }
    next();
  });

  // Explicit origin-checked CORS for cross-origin / preview deployments
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigin = getAllowedCorsOrigin(req);
    if (allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    }
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  const jsonBodyParser = express.json({ limit: '4mb' });
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    if (req.body !== undefined) {
      next();
      return;
    }
    jsonBodyParser(req, res, next);
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================

  app.get('/api/auth/me', (req: AuthenticatedRequest, res: Response) => {
    const user = extractUserFromRequest(req);
    res.json({
      user,
      adminStatus: getAdminClaimStatus(),
    });
  });

  app.get('/api/auth/admin-status', (_req: Request, res: Response) => {
    res.json(getAdminClaimStatus());
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const name = String(req.body?.name ?? '').trim();
      const email = String(req.body?.email ?? '').trim().toLowerCase();
      const password = String(req.body?.password ?? '');
      const targetBand = Number(req.body?.targetBand ?? 7.5);
      const preferredTrack: TestCategory =
        req.body?.preferredTrack === 'general' ? 'general' : 'academic';

      if (name.length < 2 || name.length > 80) {
        res.status(400).json({ error: 'Please enter your full name (2–80 characters).' });
        return;
      }
      if (!isValidEmail(email)) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }
      if (password.length < 6 || password.length > 128) {
        res.status(400).json({ error: 'Password must be between 6 and 128 characters.' });
        return;
      }

      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existing) {
        res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
        return;
      }

      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const safeBand = Math.min(9, Math.max(4, Number.isFinite(targetBand) ? targetBand : 7.5));
      const passwordHash = hashPassword(password);

      db.prepare(`
        INSERT INTO users (id, name, email, password_hash, role, target_band, preferred_track, created_at)
        VALUES (?, ?, ?, ?, 'student', ?, ?, ?)
      `).run(id, name, email, passwordHash, safeBand, preferredTrack, now);

      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown>;
      const user = mapUserRow(row);
      const token = createSessionToken(user.id, user.role);
      res.status(201).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Registration failed.' });
    }
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const email = String(req.body?.email ?? '').trim().toLowerCase();
      const password = String(req.body?.password ?? '');

      if (!isValidEmail(email) || !password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
      }

      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
        | Record<string, unknown>
        | undefined;

      if (!row || !verifyPassword(password, String(row.password_hash))) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const user = mapUserRow(row);
      const token = createSessionToken(user.id, user.role);
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Login failed.' });
    }
  });

  app.post('/api/auth/admin-claim', (req: Request, res: Response) => {
    try {
      const status = getAdminClaimStatus();
      if (!status.needsInitialSetup) {
        res.status(403).json({
          error: 'Admin setup is already completed or controlled via ADMIN_PASSCODE.',
        });
        return;
      }

      const name = String(req.body?.name ?? 'IELTS Center Admin').trim();
      const email = String(req.body?.email ?? '').trim().toLowerCase();
      const password = String(req.body?.password ?? '');

      if (name.length < 2 || !isValidEmail(email) || password.length < 8) {
        res.status(400).json({
          error: 'Provide a valid admin name, email, and a password of at least 8 characters.',
        });
        return;
      }

      const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existingEmail) {
        res.status(409).json({ error: 'That email is already registered as a student. Use a dedicated admin email.' });
        return;
      }

      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const passwordHash = hashPassword(password);

      db.prepare(`
        INSERT INTO users (id, name, email, password_hash, role, target_band, preferred_track, created_at)
        VALUES (?, ?, ?, ?, 'admin', 9.0, 'academic', ?)
      `).run(id, name, email, passwordHash, now);

      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown>;
      const user = mapUserRow(row);
      const token = createSessionToken(user.id, 'admin');
      res.status(201).json({ token, user, adminStatus: getAdminClaimStatus() });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Admin setup failed.' });
    }
  });

  app.post('/api/auth/admin-login', (req: Request, res: Response) => {
    try {
      const email = String(req.body?.email ?? '').trim().toLowerCase();
      const password = String(req.body?.password ?? '');
      const envPasscode = getEnvAdminPasscode();

      if (!isValidEmail(email) || !password) {
        res.status(400).json({ error: 'Admin email and password/passcode are required.' });
        return;
      }

      if (envPasscode) {
        if (!timingSafeStringMatch(password, envPasscode)) {
          res.status(401).json({ error: 'Invalid admin passcode.' });
          return;
        }

        let row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
          | Record<string, unknown>
          | undefined;
        if (!row) {
          const id = crypto.randomUUID();
          const now = new Date().toISOString();
          db.prepare(`
            INSERT INTO users (id, name, email, password_hash, role, target_band, preferred_track, created_at)
            VALUES (?, ?, ?, ?, 'admin', 9.0, 'academic', ?)
          `).run(id, 'MY IELTS Admin', email, hashPassword(password), now);
          row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown>;
        } else if (row.role !== 'admin') {
          db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(String(row.id));
          row = db.prepare('SELECT * FROM users WHERE id = ?').get(String(row.id)) as Record<string, unknown>;
        }
        const user = mapUserRow(row);
        const token = createSessionToken(user.id, 'admin');
        res.json({ token, user });
        return;
      }

      const row = db.prepare("SELECT * FROM users WHERE email = ? AND role = 'admin'").get(email) as
        | Record<string, unknown>
        | undefined;

      if (!row || !verifyPassword(password, String(row.password_hash))) {
        res.status(401).json({ error: 'Invalid admin email or password.' });
        return;
      }

      const user = mapUserRow(row);
      const token = createSessionToken(user.id, 'admin');
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Admin login failed.' });
    }
  });

  // ==========================================
  // MOCK TEST CATALOG & AUDIO ROUTES
  // ==========================================

  app.get('/api/tests', (_req: Request, res: Response) => {
    const rows = db
      .prepare(
        `SELECT id, title, category, module_type, description, duration_minutes, question_count, is_published, created_at, updated_at
         FROM mock_tests
         WHERE is_published = 1
         ORDER BY CASE module_type WHEN 'full' THEN 0 ELSE 1 END, created_at ASC`
      )
      .all() as Record<string, unknown>[];

    const tests = rows.map((r) => ({
      id: String(r.id),
      title: String(r.title),
      category: r.category as TestCategory,
      moduleType: r.module_type as ModuleType,
      description: String(r.description),
      durationMinutes: Number(r.duration_minutes),
      questionCount: Number(r.question_count),
      isPublished: Number(r.is_published) === 1,
      createdAt: String(r.created_at),
      updatedAt: String(r.updated_at),
    }));

    res.json({ tests });
  });

  app.get('/api/tests/:id', (req: AuthenticatedRequest, res: Response) => {
    const row = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(req.params.id) as
      | Record<string, unknown>
      | undefined;
    if (!row) {
      res.status(404).json({ error: 'Mock test not found.' });
      return;
    }

    const user = extractUserFromRequest(req);
    const includeAnswers = user?.role === 'admin' && req.query.admin === '1';
    if (Number(row.is_published) !== 1 && user?.role !== 'admin') {
      res.status(404).json({ error: 'Mock test is currently unpublished.' });
      return;
    }

    res.json({ test: mapTestRow(row, includeAnswers) });
  });

  // Generate and cache real WAV audio for a listening section using Gemini TTS
  app.post('/api/tests/:testId/listening-audio/:sectionNumber', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const testId = req.params.testId;
      const sectionNumber = Number(req.params.sectionNumber);
      const row = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(testId) as
        | Record<string, unknown>
        | undefined;

      if (!row) {
        res.status(404).json({ error: 'Test not found.' });
        return;
      }

      const test = mapTestRow(row, true);
      const section = test.payload.listeningSections?.find((s) => s.sectionNumber === sectionNumber);
      if (!section) {
        res.status(404).json({ error: 'Listening section not found.' });
        return;
      }

      if (section.audioUrl) {
        res.json({ audioUrl: section.audioUrl });
        return;
      }

      const wavBuffer = await generateListeningSectionWav(section.transcript, sectionNumber);
      const assetId = crypto.randomUUID();
      const filename = `tts_${testId}_sec${sectionNumber}_${assetId.slice(0, 8)}.wav`;
      const filePath = resolveSafeUploadPath(filename);
      fs.writeFileSync(filePath, wavBuffer);

      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO audio_assets (id, filename, mime_type, size_bytes, kind, owner_user_id, created_at)
        VALUES (?, ?, 'audio/wav', ?, 'listening_tts', ?, ?)
      `).run(assetId, filename, wavBuffer.length, req.user!.id, now);

      const audioUrl = `/api/audio/${assetId}`;
      section.audioUrl = audioUrl;
      section.hasAudioFile = true;
      db.prepare('UPDATE mock_tests SET payload_json = ?, updated_at = ? WHERE id = ?').run(
        JSON.stringify(test.payload),
        now,
        testId
      );

      res.json({ audioUrl });
    } catch (err) {
      res.status(502).json({
        error: err instanceof Error ? err.message : 'Unable to generate listening audio.',
      });
    }
  });

  // ==========================================
  // TEST ATTEMPTS, AUTOSAVE & SCORING ROUTES
  // ==========================================

  app.post('/api/attempts/start', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    try {
      const testId = String(req.body?.testId ?? '').trim();
      const row = db.prepare('SELECT * FROM mock_tests WHERE id = ? AND is_published = 1').get(testId) as
        | Record<string, unknown>
        | undefined;

      if (!row) {
        res.status(404).json({ error: 'Mock test not found or unavailable.' });
        return;
      }

      const test = mapTestRow(row, false);
      const initialStage: SingleModuleKey =
        test.moduleType === 'full' ? 'listening' : test.moduleType;

      const initialAnswers: AttemptAnswers = {
        listening: {},
        reading: {},
        writing: {
          task1: { text: '', wordCount: 0 },
          task2: { text: '', wordCount: 0 },
        },
        speaking: {},
        flaggedQuestions: [],
      };

      const remainingSeconds: Record<SingleModuleKey, number> = {
        listening: 30 * 60,
        reading: 60 * 60,
        writing: 60 * 60,
        speaking: 14 * 60,
      };

      const attemptId = crypto.randomUUID();
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO test_attempts (
          id, user_id, test_id, category, module_type, status, current_stage,
          answers_json, remaining_seconds_json, started_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'in_progress', ?, ?, ?, ?, ?)
      `).run(
        attemptId,
        req.user!.id,
        test.id,
        test.category,
        test.moduleType,
        initialStage,
        JSON.stringify(initialAnswers),
        JSON.stringify(remainingSeconds),
        now,
        now
      );

      const attemptRow = db
        .prepare(
          `SELECT a.*, t.title AS test_title
           FROM test_attempts a
           JOIN mock_tests t ON t.id = a.test_id
           WHERE a.id = ?`
        )
        .get(attemptId) as Record<string, unknown>;

      res.status(201).json({
        attempt: mapAttemptRow(attemptRow),
        test,
      });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Could not start test attempt.' });
    }
  });

  app.get('/api/attempts/mine', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const rows = db
      .prepare(
        `SELECT a.*, t.title AS test_title
         FROM test_attempts a
         JOIN mock_tests t ON t.id = a.test_id
         WHERE a.user_id = ?
         ORDER BY a.started_at DESC`
      )
      .all(req.user!.id) as Record<string, unknown>[];

    res.json({ attempts: rows.map(mapAttemptRow) });
  });

  app.get('/api/attempts/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const row = db
      .prepare(
        `SELECT a.*, t.title AS test_title, u.name AS user_name, u.email AS user_email
         FROM test_attempts a
         JOIN mock_tests t ON t.id = a.test_id
         JOIN users u ON u.id = a.user_id
         WHERE a.id = ?`
      )
      .get(req.params.id) as Record<string, unknown> | undefined;

    if (!row) {
      res.status(404).json({ error: 'Test attempt not found.' });
      return;
    }
    if (String(row.user_id) !== req.user!.id && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Access denied.' });
      return;
    }

    const attempt = mapAttemptRow(row);
    const testRow = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(attempt.testId) as
      | Record<string, unknown>
      | undefined;
    const includeAnswers = attempt.status === 'completed' || req.user!.role === 'admin';
    const test = testRow ? mapTestRow(testRow, includeAnswers) : null;

    res.json({ attempt, test });
  });

  app.put('/api/attempts/:id/autosave', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    try {
      const row = db.prepare('SELECT * FROM test_attempts WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;

      if (!row) {
        res.status(404).json({ error: 'Attempt not found.' });
        return;
      }
      if (String(row.user_id) !== req.user!.id) {
        res.status(403).json({ error: 'Access denied.' });
        return;
      }
      if (String(row.status) === 'completed') {
        res.status(400).json({ error: 'Completed tests cannot be modified.' });
        return;
      }

      const existingAnswers = JSON.parse(String(row.answers_json)) as AttemptAnswers;
      const incomingAnswers = (req.body?.answers ?? {}) as Partial<AttemptAnswers>;

      const mergedAnswers: AttemptAnswers = {
        listening: incomingAnswers.listening ?? existingAnswers.listening ?? {},
        reading: incomingAnswers.reading ?? existingAnswers.reading ?? {},
        writing: incomingAnswers.writing ?? existingAnswers.writing ?? {},
        speaking: incomingAnswers.speaking ?? existingAnswers.speaking ?? {},
        flaggedQuestions: incomingAnswers.flaggedQuestions ?? existingAnswers.flaggedQuestions ?? [],
      };

      const existingRemaining = JSON.parse(String(row.remaining_seconds_json)) as Record<SingleModuleKey, number>;
      const mergedRemaining = {
        ...existingRemaining,
        ...(req.body?.remainingSeconds ?? {}),
      };

      const nextStage: SingleModuleKey =
        req.body?.currentStage && ['listening', 'reading', 'writing', 'speaking'].includes(req.body.currentStage)
          ? (req.body.currentStage as SingleModuleKey)
          : (row.current_stage as SingleModuleKey);

      const now = new Date().toISOString();
      db.prepare(`
        UPDATE test_attempts
        SET answers_json = ?, remaining_seconds_json = ?, current_stage = ?, updated_at = ?
        WHERE id = ?
      `).run(
        JSON.stringify(mergedAnswers),
        JSON.stringify(mergedRemaining),
        nextStage,
        now,
        req.params.id
      );

      res.json({ savedAt: now });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Autosave failed.' });
    }
  });

  app.post('/api/attempts/:id/submit', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const row = db.prepare('SELECT * FROM test_attempts WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;

      if (!row) {
        res.status(404).json({ error: 'Attempt not found.' });
        return;
      }
      if (String(row.user_id) !== req.user!.id) {
        res.status(403).json({ error: 'Access denied.' });
        return;
      }

      const testRow = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(String(row.test_id)) as
        | Record<string, unknown>
        | undefined;
      if (!testRow) {
        res.status(404).json({ error: 'Mock test definition missing.' });
        return;
      }

      const test = mapTestRow(testRow, true);
      const existingAnswers = JSON.parse(String(row.answers_json)) as AttemptAnswers;
      const incomingAnswers = (req.body?.answers ?? {}) as Partial<AttemptAnswers>;

      const finalAnswers: AttemptAnswers = {
        listening: incomingAnswers.listening ?? existingAnswers.listening ?? {},
        reading: incomingAnswers.reading ?? existingAnswers.reading ?? {},
        writing: incomingAnswers.writing ?? existingAnswers.writing ?? {},
        speaking: incomingAnswers.speaking ?? existingAnswers.speaking ?? {},
        flaggedQuestions: incomingAnswers.flaggedQuestions ?? existingAnswers.flaggedQuestions ?? [],
      };

      const now = new Date().toISOString();
      const moduleBands: number[] = [];
      const questionReviews: ObjectiveQuestionReview[] = [];
      const strengths: string[] = [];
      const weaknesses: string[] = [];
      const suggestions: string[] = [];

      let listeningBand: number | undefined;
      let readingBand: number | undefined;
      let writingBand: number | undefined;
      let speakingBand: number | undefined;
      let listeningScore: { correct: number; total: number } | undefined;
      let readingScore: { correct: number; total: number } | undefined;
      let writingEvaluation: WritingEvaluationResult | undefined;
      let speakingEvaluation: SpeakingEvaluationResult | undefined;
      let writingEvaluationNotice: string | undefined;
      let speakingEvaluationNotice: string | undefined;

      // 1. Grade Listening (if present in test)
      if (
        (test.moduleType === 'listening' || test.moduleType === 'full') &&
        test.payload.listeningSections?.length
      ) {
        const lRes = gradeObjectiveListening(test.payload.listeningSections, finalAnswers.listening);
        listeningBand = lRes.band;
        listeningScore = { correct: lRes.correct, total: lRes.total };
        moduleBands.push(lRes.band);
        questionReviews.push(...lRes.reviews);

        if (lRes.band >= 7.0) {
          strengths.push(`Strong Listening accuracy (${lRes.correct}/${lRes.total} correct, Est. Band ${lRes.band.toFixed(1)}).`);
        } else {
          weaknesses.push(`Listening accuracy (${lRes.correct}/${lRes.total}) shows missed distractor traps or spelling gaps.`);
          suggestions.push('Practice predicting word forms before listening and check singular/plural spelling on Section 1 & 4 gaps.');
        }
      }

      // 2. Grade Reading (if present in test)
      if (
        (test.moduleType === 'reading' || test.moduleType === 'full') &&
        test.payload.readingPassages?.length
      ) {
        const rRes = gradeObjectiveReading(test.payload.readingPassages, finalAnswers.reading, test.category);
        readingBand = rRes.band;
        readingScore = { correct: rRes.correct, total: rRes.total };
        moduleBands.push(rRes.band);
        questionReviews.push(...rRes.reviews);

        if (rRes.band >= 7.0) {
          strengths.push(`Solid Reading comprehension (${rRes.correct}/${rRes.total} correct, Est. Band ${rRes.band.toFixed(1)}).`);
        } else {
          weaknesses.push(`Reading score (${rRes.correct}/${rRes.total}) indicates difficulty with inference or matching questions.`);
          suggestions.push('Allocate 18–20 minutes per passage and verify True/False/Not Given claims strictly against passage wording.');
        }
      }

      // 3. Evaluate Writing via Gemini AI (graceful fallback when API key missing or empty)
      if (
        (test.moduleType === 'writing' || test.moduleType === 'full') &&
        test.payload.writingTasks?.length
      ) {
        const t1Text = finalAnswers.writing?.task1?.text ?? '';
        const t2Text = finalAnswers.writing?.task2?.text ?? '';

        if (t1Text.trim().length > 0 || t2Text.trim().length > 0) {
          try {
            writingEvaluation = await evaluateWritingWithGemini({
              category: test.category,
              tasks: test.payload.writingTasks,
              task1Text: t1Text,
              task2Text: t2Text,
            });
            writingBand = writingEvaluation.estimatedBand;
            moduleBands.push(writingBand);
            strengths.push(...writingEvaluation.strengths.slice(0, 2));
            weaknesses.push(...writingEvaluation.weaknesses.slice(0, 2));
            suggestions.push(...writingEvaluation.suggestions.slice(0, 2));
          } catch (aiErr) {
            writingEvaluationNotice =
              aiErr instanceof Error && aiErr.message.includes('GEMINI_API_KEY')
                ? 'Your Writing responses are saved. Automated AI Writing band scoring requires GEMINI_API_KEY, so no Writing band score was invented — review your essays using the model answer and evaluation criteria below.'
                : 'Your Writing responses are saved, but automated AI evaluation could not complete right now. Please compare your work against the model answer and official criteria below.';
            suggestions.push('Compare your Task 1 and Task 2 drafts against the Key Features, Suggested Structure, and Writing Evaluation Criteria unlocked below.');
          }
        } else {
          writingEvaluationNotice =
            'Writing tasks were left blank, so no Writing band score was calculated.';
          weaknesses.push('Writing tasks were left blank.');
          suggestions.push('Aim for at least 150 words on Task 1 and 250 words on Task 2 to avoid under-length penalties.');
        }
      }

      // 4. Evaluate Speaking via Gemini AI (graceful fallback when API key missing or empty)
      if (
        (test.moduleType === 'speaking' || test.moduleType === 'full') &&
        test.payload.speaking
      ) {
        const sp = finalAnswers.speaking ?? {};
        const recInputs: Array<{
          partKey: 'part1' | 'part2' | 'part3';
          filePath?: string;
          mimeType?: string;
          transcriptNotes?: string;
        }> = [];

        for (const pk of ['part1', 'part2', 'part3'] as const) {
          const partSub = sp[pk];
          if (partSub?.audioId) {
            const asset = db
              .prepare('SELECT * FROM audio_assets WHERE id = ?')
              .get(partSub.audioId) as Record<string, unknown> | undefined;
            if (asset) {
              recInputs.push({
                partKey: pk,
                filePath: resolveSafeUploadPath(String(asset.filename)),
                mimeType: String(asset.mime_type),
                transcriptNotes: partSub.transcriptNotes,
              });
            }
          } else if (partSub?.transcriptNotes?.trim()) {
            recInputs.push({
              partKey: pk,
              transcriptNotes: partSub.transcriptNotes.trim(),
            });
          }
        }

        if (recInputs.length > 0) {
          try {
            speakingEvaluation = await evaluateSpeakingWithGemini({
              speakingData: test.payload.speaking,
              recordings: recInputs,
            });
            speakingBand = speakingEvaluation.estimatedBand;
            moduleBands.push(speakingBand);
            strengths.push(...speakingEvaluation.strengths.slice(0, 2));
            weaknesses.push(...speakingEvaluation.weaknesses.slice(0, 2));
            suggestions.push(...speakingEvaluation.suggestions.slice(0, 2));
          } catch (aiErr) {
            speakingEvaluationNotice =
              aiErr instanceof Error && aiErr.message.includes('GEMINI_API_KEY')
                ? 'Your Speaking recordings/notes are saved. Automated AI Speaking evaluation requires GEMINI_API_KEY, so no Speaking band score was invented — review your playback with the Speaking self-review checklist below.'
                : 'Your Speaking submission is saved, but automated AI evaluation could not complete right now. Please review your recordings against the Speaking criteria below.';
            suggestions.push('Play back your Speaking recordings and assess your performance using the Speaking Evaluation Criteria and Self-Review Checklist below.');
          }
        } else {
          speakingEvaluationNotice =
            'No Speaking audio recordings or spoken notes were submitted, so no Speaking band score was calculated.';
          weaknesses.push('No Speaking recordings or notes were submitted.');
          suggestions.push('Use your microphone to record Parts 1, 2, and 3 or enter spoken notes for practice evaluation.');
        }
      }

      // Strict Overall Band Rule: For full 4-module exams, only calculate overallBand when all 4 modules have valid scores.
      const allFourComplete =
        typeof listeningBand === 'number' &&
        typeof readingBand === 'number' &&
        typeof writingBand === 'number' &&
        typeof speakingBand === 'number';

      const overallBand: number | undefined =
        test.moduleType === 'full'
          ? allFourComplete
            ? calculateOverallBand([listeningBand, readingBand, writingBand, speakingBand])
            : undefined
          : moduleBands.length > 0
          ? calculateOverallBand(moduleBands)
          : undefined;

      const metaLabelSuffix = test.payload.meta?.label ? ` (${test.payload.meta.label})` : '';
      const results: AttemptResults = {
        overallBand,
        listeningBand,
        readingBand,
        writingBand,
        speakingBand,
        listeningScore,
        readingScore,
        questionReviews,
        writingEvaluation,
        speakingEvaluation,
        writingEvaluationNotice,
        speakingEvaluationNotice,
        strengths: strengths.length ? Array.from(new Set(strengths)) : ['Completed the timed IELTS practice simulation cleanly.'],
        weaknesses: weaknesses.length ? Array.from(new Set(weaknesses)) : ['Focus on refining precision for Band 8.0+ criteria.'],
        suggestions: suggestions.length ? Array.from(new Set(suggestions)) : ['Review missed items and schedule a 1-on-1 feedback session with MY IELTS mentors.'],
        evaluatedAt: now,
        disclaimer:
          `Unofficial Practice Estimate${metaLabelSuffix}: Objective Reading/Listening bands use an approximate conversion table, and Writing, Speaking, and overall bands (only calculated when all required modules are evaluated) are practice estimates — not official IELTS exam results.`,
      };

      db.prepare(`
        UPDATE test_attempts
        SET status = 'completed',
            answers_json = ?,
            results_json = ?,
            overall_band = ?,
            listening_band = ?,
            reading_band = ?,
            writing_band = ?,
            speaking_band = ?,
            completed_at = ?,
            updated_at = ?
        WHERE id = ?
      `).run(
        JSON.stringify(finalAnswers),
        JSON.stringify(results),
        overallBand ?? null,
        listeningBand ?? null,
        readingBand ?? null,
        writingBand ?? null,
        speakingBand ?? null,
        now,
        now,
        req.params.id
      );

      const updatedRow = db
        .prepare(
          `SELECT a.*, t.title AS test_title
           FROM test_attempts a
           JOIN mock_tests t ON t.id = a.test_id
           WHERE a.id = ?`
        )
        .get(req.params.id) as Record<string, unknown>;

      res.json({
        attempt: mapAttemptRow(updatedRow),
        test,
      });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to grade mock test submission.',
      });
    }
  });

  // ==========================================
  // AUDIO UPLOAD & STREAMING ROUTES
  // ==========================================

  app.post(
    '/api/audio/speaking',
    requireAuth,
    uploadAudio.single('audio'),
    (req: AuthenticatedRequest, res: Response) => {
      try {
        if (!req.file) {
          res.status(400).json({ error: 'No audio recording uploaded.' });
          return;
        }

        const attemptId = String(req.body?.attemptId ?? '').trim();
        const partKey = String(req.body?.partKey ?? '').trim();
        if (!attemptId || !['part1', 'part2', 'part3'].includes(partKey)) {
          fs.unlinkSync(req.file.path);
          res.status(400).json({ error: 'Valid attemptId and partKey (part1, part2, part3) are required.' });
          return;
        }

        const attemptRow = db.prepare('SELECT user_id FROM test_attempts WHERE id = ?').get(attemptId) as
          | { user_id: string }
          | undefined;
        if (!attemptRow || attemptRow.user_id !== req.user!.id) {
          fs.unlinkSync(req.file.path);
          res.status(403).json({ error: 'Cannot attach recording to this attempt.' });
          return;
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const cleanMime = req.file.mimetype.split(';')[0].trim().toLowerCase() || 'audio/webm';

        db.prepare(`
          INSERT INTO audio_assets (
            id, filename, mime_type, size_bytes, kind, owner_user_id, attempt_id, part_key, created_at
          ) VALUES (?, ?, ?, ?, 'speaking_recording', ?, ?, ?, ?)
        `).run(
          id,
          req.file.filename,
          cleanMime,
          req.file.size,
          req.user!.id,
          attemptId,
          partKey,
          now
        );

        res.status(201).json({
          audioId: id,
          url: `/api/audio/${id}`,
          mimeType: cleanMime,
        });
      } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Speaking upload failed.' });
      }
    }
  );

  app.get('/api/audio/:id', (req: AuthenticatedRequest, res: Response) => {
    try {
      const row = db.prepare('SELECT * FROM audio_assets WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;

      if (!row) {
        res.status(404).json({ error: 'Audio file not found.' });
        return;
      }

      const kind = String(row.kind);
      if (kind === 'speaking_recording') {
        const user = extractUserFromRequest(req);
        if (!user || (user.role !== 'admin' && user.id !== String(row.owner_user_id))) {
          res.status(403).json({ error: 'Unauthorized to stream this recording.' });
          return;
        }
      }

      const filePath = resolveSafeUploadPath(String(row.filename));
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'Audio file missing on disk.' });
        return;
      }

      const stat = fs.statSync(filePath);
      const mimeType = String(row.mime_type || 'audio/mpeg');
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunkSize = end - start + 1;

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': mimeType,
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': mimeType,
          'Accept-Ranges': 'bytes',
        });
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to stream audio.' });
    }
  });

  // ==========================================
  // ADMIN DASHBOARD ROUTES
  // ==========================================

  app.get('/api/admin/overview', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
    const testRows = db
      .prepare('SELECT * FROM mock_tests ORDER BY created_at DESC')
      .all() as Record<string, unknown>[];
    const userRows = db
      .prepare('SELECT * FROM users ORDER BY created_at DESC')
      .all() as Record<string, unknown>[];
    const attemptRows = db
      .prepare(
        `SELECT a.*, t.title AS test_title, u.name AS user_name, u.email AS user_email
         FROM test_attempts a
         JOIN mock_tests t ON t.id = a.test_id
         JOIN users u ON u.id = a.user_id
         ORDER BY a.started_at DESC
         LIMIT 100`
      )
      .all() as Record<string, unknown>[];
    const audioRows = db
      .prepare('SELECT * FROM audio_assets ORDER BY created_at DESC LIMIT 100')
      .all() as Record<string, unknown>[];

    res.json({
      tests: testRows.map((r) => mapTestRow(r, true)),
      users: userRows.map(mapUserRow),
      attempts: attemptRows.map(mapAttemptRow),
      audioAssets: audioRows.map(mapAudioRow),
    });
  });

  app.post('/api/admin/tests', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    try {
      const title = String(req.body?.title ?? '').trim();
      const category: TestCategory = req.body?.category === 'general' ? 'general' : 'academic';
      const moduleType: ModuleType = ['listening', 'reading', 'writing', 'speaking', 'full'].includes(
        req.body?.moduleType
      )
        ? (req.body.moduleType as ModuleType)
        : 'reading';
      const description = String(req.body?.description ?? '').trim();
      const durationMinutes = Math.max(5, Number(req.body?.durationMinutes ?? 60));
      const questionCount = Math.max(1, Number(req.body?.questionCount ?? 1));
      const isPublished = req.body?.isPublished !== false;
      const payload = (req.body?.payload ?? {}) as MockTestPayload;

      if (title.length < 3) {
        res.status(400).json({ error: 'Test title must be at least 3 characters.' });
        return;
      }

      const id = `custom-${crypto.randomUUID().slice(0, 8)}`;
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO mock_tests (
          id, title, category, module_type, description,
          duration_minutes, question_count, is_published, payload_json, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        title,
        category,
        moduleType,
        description || 'Custom IELTS mock module configured by admin.',
        durationMinutes,
        questionCount,
        isPublished ? 1 : 0,
        JSON.stringify(payload),
        now,
        now
      );

      const row = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(id) as Record<string, unknown>;
      res.status(201).json({ test: mapTestRow(row, true) });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to create mock test.' });
    }
  });

  app.put('/api/admin/tests/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    try {
      const existing = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;

      if (!existing) {
        res.status(404).json({ error: 'Mock test not found.' });
        return;
      }

      const current = mapTestRow(existing, true);
      const title = req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
      const category: TestCategory =
        req.body?.category === 'general' || req.body?.category === 'academic'
          ? req.body.category
          : current.category;
      const description =
        req.body?.description !== undefined ? String(req.body.description).trim() : current.description;
      const durationMinutes =
        req.body?.durationMinutes !== undefined
          ? Math.max(5, Number(req.body.durationMinutes))
          : current.durationMinutes;
      const questionCount =
        req.body?.questionCount !== undefined
          ? Math.max(1, Number(req.body.questionCount))
          : current.questionCount;
      const isPublished =
        req.body?.isPublished !== undefined ? Boolean(req.body.isPublished) : current.isPublished;
      const payload: MockTestPayload = req.body?.payload ?? current.payload;
      const now = new Date().toISOString();

      db.prepare(`
        UPDATE mock_tests
        SET title = ?, category = ?, description = ?, duration_minutes = ?,
            question_count = ?, is_published = ?, payload_json = ?, updated_at = ?
        WHERE id = ?
      `).run(
        title,
        category,
        description,
        durationMinutes,
        questionCount,
        isPublished ? 1 : 0,
        JSON.stringify(payload),
        now,
        req.params.id
      );

      const updated = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(req.params.id) as Record<
        string,
        unknown
      >;
      res.json({ test: mapTestRow(updated, true) });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to update mock test.' });
    }
  });

  app.delete('/api/admin/tests/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const result = db.prepare('DELETE FROM mock_tests WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Mock test not found.' });
      return;
    }
    res.json({ deleted: true });
  });

  app.post(
    '/api/admin/audio',
    requireAdmin,
    uploadAudio.single('audio'),
    (req: AuthenticatedRequest, res: Response) => {
      try {
        if (!req.file) {
          res.status(400).json({ error: 'Please select an audio file (MP3, WAV, OGG, M4A, WebM).' });
          return;
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const cleanMime = req.file.mimetype.split(';')[0].trim().toLowerCase() || 'audio/mpeg';

        db.prepare(`
          INSERT INTO audio_assets (
            id, filename, mime_type, size_bytes, kind, owner_user_id, created_at
          ) VALUES (?, ?, ?, ?, 'listening_upload', ?, ?)
        `).run(id, req.file.filename, cleanMime, req.file.size, req.user!.id, now);

        const row = db.prepare('SELECT * FROM audio_assets WHERE id = ?').get(id) as Record<string, unknown>;
        res.status(201).json({ asset: mapAudioRow(row) });
      } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Audio upload failed.' });
      }
    }
  );

  app.delete('/api/admin/audio/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    try {
      const row = db.prepare('SELECT * FROM audio_assets WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;
      if (!row) {
        res.status(404).json({ error: 'Audio asset not found.' });
        return;
      }

      const filePath = resolveSafeUploadPath(String(row.filename));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      db.prepare('DELETE FROM audio_assets WHERE id = ?').run(req.params.id);
      res.json({ deleted: true });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to delete audio.' });
    }
  });

  app.put('/api/admin/attempts/:id/note', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    try {
      const row = db.prepare('SELECT * FROM test_attempts WHERE id = ?').get(req.params.id) as
        | Record<string, unknown>
        | undefined;
      if (!row) {
        res.status(404).json({ error: 'Attempt not found.' });
        return;
      }

      const note = String(req.body?.instructorNote ?? '').trim().slice(0, 2000);
      const results = row.results_json ? (JSON.parse(String(row.results_json)) as AttemptResults) : null;
      if (!results) {
        res.status(400).json({ error: 'Cannot add instructor note until attempt is completed.' });
        return;
      }

      results.instructorNote = note;
      const now = new Date().toISOString();
      db.prepare('UPDATE test_attempts SET results_json = ?, updated_at = ? WHERE id = ?').run(
        JSON.stringify(results),
        now,
        req.params.id
      );

      res.json({ updated: true, instructorNote: note });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to save instructor note.' });
    }
  });

  app.delete('/api/admin/attempts/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const result = db.prepare('DELETE FROM test_attempts WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Attempt not found.' });
      return;
    }
    res.json({ deleted: true });
  });

  app.put('/api/admin/users/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const targetBand = Math.min(9, Math.max(4, Number(req.body?.targetBand ?? 7.5)));
    const preferredTrack: TestCategory = req.body?.preferredTrack === 'general' ? 'general' : 'academic';

    const result = db
      .prepare('UPDATE users SET target_band = ?, preferred_track = ? WHERE id = ?')
      .run(targetBand, preferredTrack, req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id) as Record<string, unknown>;
    res.json({ user: mapUserRow(updated) });
  });

  app.delete('/api/admin/users/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    if (req.params.id === req.user!.id) {
      res.status(400).json({ error: 'You cannot delete your active admin account.' });
      return;
    }
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json({ deleted: true });
  });

  // ==========================================
  // STUDENT INQUIRIES & CONSULTATION ROUTES
  // ==========================================

  app.post('/api/inquiries', (req: Request, res: Response) => {
    try {
      const rawType = String(req.body?.inquiryType ?? 'consultation').trim().toLowerCase();
      const inquiryType = ['consultation', 'batch', 'contact'].includes(rawType)
        ? rawType
        : 'consultation';

      const name = String(req.body?.name ?? '').trim().slice(0, 120);
      const phone = String(req.body?.phone ?? '').trim().slice(0, 40);
      const email = String(req.body?.email ?? '').trim().slice(0, 140);
      const service = String(req.body?.service ?? '').trim().slice(0, 120);
      const destination = String(req.body?.destination ?? '').trim().slice(0, 80);
      const timing = String(req.body?.timing ?? '').trim().slice(0, 120);
      const message = String(req.body?.message ?? '').trim().slice(0, 2000);

      if (name.length < 2) {
        res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
        return;
      }
      if (phone.length < 6) {
        res.status(400).json({ error: 'Please enter a valid contact phone or WhatsApp number.' });
        return;
      }
      if (email && !isValidEmail(email)) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }

      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      db.prepare(`
        INSERT INTO inquiries (
          id, inquiry_type, name, phone, email, service, destination, timing, message, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        inquiryType,
        name,
        phone,
        email || null,
        service || null,
        destination || null,
        timing || null,
        message || null,
        createdAt
      );

      res.status(201).json({
        id,
        inquiryType,
        createdAt,
        message: 'Your inquiry has been received. Our academic counselor will reach out shortly.',
      });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unable to submit inquiry.' });
    }
  });

  app.get('/api/admin/inquiries', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
    const rows = db
      .prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200')
      .all() as Record<string, unknown>[];
    res.json({ inquiries: rows });
  });

  // Strict /api/* 404 JSON catch-all so unmatched API routes never fall through to SPA HTML
  app.all('/api/*', (req: Request, res: Response) => {
    res.status(404).json({
      error: `API endpoint not found: ${req.method} ${req.path}`,
    });
  });

  // Handle malformed JSON bodies, Multer upload errors, and unexpected API errors as JSON
  app.use('/api', (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: err.message });
      return;
    }
    const maybeParseErr = err as { type?: string; status?: number; message?: string };
    if (err instanceof SyntaxError && maybeParseErr.type === 'entity.parse.failed') {
      res.status(400).json({ error: 'Invalid JSON request body.' });
      return;
    }
    const status = typeof maybeParseErr?.status === 'number' && maybeParseErr.status >= 400
      ? maybeParseErr.status
      : 500;
    const message = err instanceof Error ? err.message : 'Unexpected server error.';
    res.status(status).json({ error: message });
  });

  return app;
}
