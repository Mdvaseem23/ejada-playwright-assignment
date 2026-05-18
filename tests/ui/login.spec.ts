import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  test('Valid Login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid Login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('invalid_user', 'wrong_password');

    await login.verifyError(
      'Username and password do not match'
    );
  });

  test('Locked User Login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('locked_out_user', 'secret_sauce');

    await login.verifyError(
      'Sorry, this user has been locked out'
    );
  });
});