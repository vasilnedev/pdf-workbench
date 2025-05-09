import path from 'node:path'
import { createRequire } from 'node:module'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const require = createRequire(import.meta.url);

const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
)

const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: '' },
        { src: standardFontsDir, dest: '' },
      ],
    })
  ],
  server: {
    allowedHosts: ['localhost','bim-app.laptop'], // allow access from localhost and the specified hostname
    port: 5501,
    proxy: {
      '/pdf-documents': 'http://minio:9000'
    }
  }
})
