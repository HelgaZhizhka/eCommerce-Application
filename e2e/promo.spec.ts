import { test, expect } from '@playwright/test';

// Pins the promo-code flow on the cart page.
//
// BLOCKED: discount code BAGS15-SP expired 2026-03-15 (verified via API on
// 2026-06-11). Un-fixme after extending its validity in Merchant Center
// (Discounts → Discount codes → BAGS15-SP). Tracked in docs/refactor/phase-0.md.

test.fixme('applies promo code BAGS15-SP to a cart with a bag', async ({ page }) => {
  await page.goto('/category/bags/shoppers');

  const firstProductImage = page.locator('a[href^="/product/"] img').first();
  await expect(firstProductImage).toBeVisible();
  await firstProductImage.click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('a[href="/cart"]').first().getByText('1', { exact: true })).toBeVisible();

  await page.goto('/cart');
  await page.getByPlaceholder('Promo Code').fill('BAGS15-SP');
  await page.getByRole('button', { name: /apply/i }).click();

  await expect(page.getByText('Active Promo Code:')).toBeVisible();
  await expect(page.getByText('BAGS15-SP')).toBeVisible();
});
