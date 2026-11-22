export type ApiErrorCode =
  | 'NETWORK_ERROR'
  | 'HTML_RESPONSE'
  | 'INVALID_JSON'
  | 'HTTP_ERROR';

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;

  constructor(message: string, status: number, code: ApiErrorCode) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

export function buildApiUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }
  const base = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || '')
    .trim()
    .replace(/\/+$/, '');
  const normalizedPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
}

function isHtmlPayload(rawText: string, contentType: string): boolean {
  if (contentType.includes('text/html') || contentType.includes('application/xhtml+xml')) {
    return true;
  }
  const trimmed = rawText.trimStart().toLowerCase();
  return (
    trimmed.startsWith('<!doctype') ||
    trimmed.startsWith('<html') ||
    trimmed.startsWith('<head') ||
    trimmed.startsWith('<body') ||
    trimmed.startsWith('<')
  );
}

export async function fetchJson<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = buildApiUrl(endpoint);
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (err) {
    const detail = err instanceof Error && err.message ? ` (${err.message})` : '';
    throw new ApiRequestError(
      `Unable to reach the server${detail}. Please check your internet connection or server status.`,
      0,
      'NETWORK_ERROR'
    );
  }

  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  let rawText = '';

  try {
    rawText = await res.text();
  } catch {
    throw new ApiRequestError(
      `Failed to read server response (HTTP ${res.status}).`,
      res.status,
      'NETWORK_ERROR'
    );
  }

  if (isHtmlPayload(rawText, contentType)) {
    const msg =
      res.status === 404
        ? `API endpoint not found (${endpoint}) — the host returned an HTML page instead of JSON.`
        : `API returned HTML instead of JSON from ${endpoint} (HTTP ${res.status}). Ensure the backend server or Netlify Function is running.`;
    throw new ApiRequestError(msg, res.status, 'HTML_RESPONSE');
  }

  const trimmed = rawText.trim();
  if (!trimmed) {
    if (!res.ok) {
      throw new ApiRequestError(`Request failed with HTTP ${res.status}.`, res.status, 'HTTP_ERROR');
    }
    throw new ApiRequestError('Server returned an empty response when JSON was expected.', res.status, 'INVALID_JSON');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new ApiRequestError(
      res.ok
        ? `Received invalid JSON from ${endpoint}.`
        : `Request failed (HTTP ${res.status}) with an invalid JSON response.`,
      res.status,
      'INVALID_JSON'
    );
  }

  if (!res.ok) {
    const message =
      typeof parsed === 'object' && parsed !== null
        ? ('error' in parsed && typeof (parsed as { error?: unknown }).error === 'string'
            ? (parsed as { error: string }).error
            : 'message' in parsed && typeof (parsed as { message?: unknown }).message === 'string'
            ? (parsed as { message: string }).message
            : `Request failed (HTTP ${res.status}).`)
        : `Request failed (HTTP ${res.status}).`;

    throw new ApiRequestError(message, res.status, 'HTTP_ERROR');
  }

  return parsed as T;
}
