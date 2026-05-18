import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,

  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ]
});