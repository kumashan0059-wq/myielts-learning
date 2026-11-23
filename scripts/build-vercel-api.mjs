import fs from 'node:fs';
import path from 'node:path';

const outfile = path.resolve(process.cwd(), 'api/_app.mjs');

async function buildVercelApi() {
  try {
    const esbuild = await import('esbuild');
    await esbuild.build({
      entryPoints: [path.resolve(process.cwd(), 'server/app.ts')],
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external',
      outfile,
    });
    console.log('Built Vercel API bundle: api/_app.mjs');
  } catch (err) {
    if (fs.existsSync(outfile)) {
      console.warn('Skipping esbuild step; using existing api/_app.mjs:', err instanceof Error ? err.message : err);
      return;
    }
    throw err;
  }
}

buildVercelApi();
