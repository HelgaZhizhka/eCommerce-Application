import { test, expect } from '@playwright/test';

// Pins the registration wizard (3 windows) and the login/logout flow.
// Creates a unique customer per run in the commercetools test project.

const email = `e2e-${Date.now()}@example.com`;
const password = 'Test123!Aa';

test.describe.serial('registration, logout, login', () => {
  test('registers a new customer through the 3-step wizard', async ({ page }) => {
    await page.goto('/registration');

    // window 1: credentials
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('input[name="checkPassword"]').fill(password);
    await page.getByRole('button', { name: 'Continue' }).click();

    // window 2: personal data
    await page.locator('input[name="firstName"]').fill('Olga');
    await page.locator('input[name="lastName"]').fill('Testova');
    await page.locator('input[name="date"]').fill('2000-01-01');
    await page.getByRole('button', { name: 'Continue' }).click();

    // window 3: shipping address
    await page.locator('input[name="streetShipping"], textarea[name="streetShipping"]').first().fill('Khreshchatyk 1');
    await page.locator('input[name="cityShipping"]').fill('Kyiv');
    await page.getByLabel('Country').first().click();
    await page.getByRole('option', { name: 'Ukraine' }).click();
    await page.locator('input[name="postalCodeShipping"]').fill('01001');

    // hides the otherwise-required billing form (rendered by default)
    await page.getByLabel('Use this address for billing').check();

    // "Sing up" typo fixed in phase 4 (forms rewrite); scope to the form —
    // the header also has a "Sign up" link button
    await page.getByRole('main').getByRole('button', { name: 'Sign up' }).click();

    // logged-in header state is the success signal (Exit is a link)
    await expect(page.getByRole('link', { name: 'Exit' })).toBeVisible();
  });

  test('logs out and logs back in with the same credentials', async ({ page }) => {
    await page.goto('/login');

    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    // the LoginForm submit is a real button; the header "Sign in" is a link
    await page.getByRole('button', { name: 'Sign in' }).last().click();

    await expect(page.getByRole('link', { name: 'Exit' })).toBeVisible();

    // profile page is reachable and shows the registered data
    await page.goto('/profile');
    await expect(page.getByText(email).first()).toBeVisible();
    await expect(page.getByText('Olga').first()).toBeVisible();
    await expect(page.getByText('Khreshchatyk 1').first()).toBeVisible();

    // edit mode opens the profile form
    await page.getByText('Edit profile').click();
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await page.goto('/profile');

    // logout returns the guest header
    await page.getByRole('link', { name: 'Exit' }).click();
    await expect(page.getByRole('link', { name: 'Sign in' }).first()).toBeVisible();
  });
});
