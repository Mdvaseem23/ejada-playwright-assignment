import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  username = '#user-name';
  password = '#password';
  loginBtn = '#login-button';
  errorMsg = '[data-test="error"]';

  async navigate() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }

  async verifyError(message: string) {
    await expect(this.page.locator(this.errorMsg))
      .toContainText(message);
  }
}