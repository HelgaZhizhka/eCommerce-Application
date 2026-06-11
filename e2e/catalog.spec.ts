import { test, expect } from '@playwright/test';

// Pins catalog rendering, subcategory navigation and pagination.
// NOTE: product card <a> wrappers have no own layout box (Playwright treats
// them as hidden) — current behavior; assert on the images inside instead.

const productLinks = 'a[href^="/product/"]';
const productImages = `${productLinks} img`;

const productHrefs = (page: import('@playwright/test').Page): Promise<(string | null)[]> =>
  page.locator(productLinks).evaluateAll((els) => els.map((e) => e.getAttribute('href')));

test('category page lists products', async ({ page }) => {
  await page.goto('/category/clothes');

  await expect(page.locator(productImages).first()).toBeVisible();
  expect(await page.locator(productLinks).count()).toBeGreaterThan(0);
});

test('pagination switches pages and changes the product set', async ({ page }) => {
  await page.goto('/category/clothes');
  await expect(page.locator(productImages).first()).toBeVisible();

  const firstPage = (await productHrefs(page)).join('|');

  await page.getByLabel('Go to page 2').click();
  await expect(page.locator(productImages).first()).toBeVisible();

  await expect.poll(async () => (await productHrefs(page)).join('|')).not.toBe(firstPage);
});

test('subcategory navigation narrows the list', async ({ page }) => {
  await page.goto('/category/drinkware/mugs');

  await expect(page.locator(productImages).first()).toBeVisible();
  const hrefs = await productHrefs(page);
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href).toContain('/product/drinkware');
  }
});
