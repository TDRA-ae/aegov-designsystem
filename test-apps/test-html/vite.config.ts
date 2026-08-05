import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 4210,
    open: true,
    watch: {
      // Vite normally ignores node_modules; un-ignore the local workspace package
      // so the dev server picks up dist/ changes after npm run build.
      ignored: (p: string) => p.includes('node_modules') && !p.includes('@aegov/designsystem'),
    },
  },
  optimizeDeps: {
    // Never pre-bundle the workspace package — always serve it live from disk.
    exclude: ['@aegov/designsystem'],
  },
});
