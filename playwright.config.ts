import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:3107',
    channel: 'msedge',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm.cmd run start -- --port 3107',
    url: 'http://127.0.0.1:3107',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
