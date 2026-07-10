import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/a11y',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3333',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx stencil build --dev --watch=false --serve',
    url: 'http://localhost:3333',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
