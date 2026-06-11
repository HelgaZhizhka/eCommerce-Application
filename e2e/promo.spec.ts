import { test, expect } from '@playwright/test';

// Pins the promo-code flow on the cart page.
// BAGS15-SP validity was extended in Merchant Center on 2026-06-11
// (verified via API: addDiscountCode → MatchesCart).

test('applies promo code BAGS15-SP to a cart with a bag', async ({ page }) => {
  await page.goto('/category/bags/shoppers');

  const firstProductImage = page.locator('a[href^="/product/"] img').first();
  await expect(firstProductImage).toBeVisible();
  await firstProductImage.click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('a[href="/cart"]').first().getByText('1', { exact: true })).toBeVisible();

  await page.goto('/cart');
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('Promo Code').fill('BAGS15-SP');
  await page.getByRole('button', { name: 'Ok', exact: true }).click();

  await expect(page.getByText('Active Promo Code:')).toBeVisible();
  await expect(page.getByText('BAGS15-SP')).toBeVisible();
});
