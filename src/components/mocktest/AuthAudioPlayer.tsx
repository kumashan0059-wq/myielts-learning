import React, { useEffect, useState } from 'react';
import { Volume2, Loader2, AlertCircle } from 'lucide-react';
import { useMockTestAuth } from './MockTestAuthContext';
import { buildApiUrl } from '../../utils/apiClient';

interface AuthAudioPlayerProps {
  src: string;
  label?: string;
}

export const AuthAudioPlayer: React.FC<AuthAudioPlayerProps> = ({ src, label }) => {
  const { token } = useMockTestAuth();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(buildApiUrl(src), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        if (contentType.includes('text/html')) {
          throw new Error('Audio endpoint returned HTML instead of audio.');
        }
        if (!res.ok) {
          if (contentType.includes('application/json')) {
            const errText = await res.text();
            try {
              const errJson = JSON.parse(errText) as { error?: string };
              throw new Error(errJson.error || `Unable to load audio (${res.status}).`);
            } catch (parseErr) {
              if (parseErr instanceof Error && !(parseErr instanceof SyntaxError)) {
                throw parseErr;
              }
            }
          }
          throw new Error(`Unable to load audio recording (${res.status}).`);
        }
        const blob = await res.blob();
        if (!active) return;
        createdUrl = URL.createObjectURL(blob);
        setObjectUrl(createdUrl);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Audio error');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [src, token]);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-neutral-500 py-1.5">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E11D2A]" />
        <span>Loading recording...</span>
      </div>
    );
  }

  if (error || !objectUrl) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-red-600 py-1.5">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{error || 'Audio unavailable'}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
          <Volume2 className="w-3.5 h-3.5 text-[#E11D2A]" />
          {label}
        </span>
      )}
      <audio controls src={objectUrl} className="h-9 w-full max-w-xs" preload="metadata" />
    </div>
  );
};
