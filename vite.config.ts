import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json' with { type: 'json' };
import pkg from './package.json' with { type: 'json' };

export default defineConfig(({ mode }) => {
  const isFirefox = process.env.BROWSER === 'firefox';
  
  const finalManifest = {
    ...manifest,
    version: pkg.version,
    background: isFirefox
      ? {
          scripts: [manifest.background.service_worker],
          type: 'module'
        }
      : manifest.background,
  };

  return {
    plugins: [
      solidPlugin(),
      tailwindcss(),
      crx({ manifest: finalManifest }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    build: {
      sourcemap: mode === 'development',
    },
    server: {
      port: 3000,
      strictPort: true,
      hmr: {
        port: 3000,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      cors: true,
    },
  };
});
