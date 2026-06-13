import { test, expect } from '@playwright/test';

// Pins the current (pre-refactor) behavior of the home page.

test('home page renders navigation, hero and footer', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation').first();
  for (const category of ['Sale', 'Clothes', 'Drinkware', 'Office', 'Bags']) {
    await expect(nav.getByRole('link', { name: category, exact: true }).first()).toBeVisible();
  }

  await expect(page.getByRole('heading', { name: /Shopping easy with/ })).toBeVisible();
  await expect(page.getByText('All rights reserved.')).toBeVisible();
});

test('header shows auth controls for guests and cart icon', async ({ page }) => {
  await page.goto('/');

  // header auth controls are links styled as buttons (corrected a11y semantics)
  await expect(page.getByRole('link', { name: 'Sign in' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' }).first()).toBeVisible();
  await expect(page.locator('a[href="/cart"]').first()).toBeVisible();
});
