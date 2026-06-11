import { test, expect } from '@playwright/test';

// Pins the desktop catalog filter: size chips and reset.
// Size filter = MUI Chip (div) with the size as label; colors are unnamed
// swatch buttons (a11y gap, pinned as-is).

const productLinks = 'a[href^="/product/"]';
const productImages = `${productLinks} img`;

const productHrefs = (page: import('@playwright/test').Page): Promise<(string | null)[]> =>
  page.locator(productLinks).evaluateAll((els) => els.map((e) => e.getAttribute('href')));

test('size filter narrows products and reset restores them', async ({ page }) => {
  await page.goto('/category/clothes');
  await expect(page.locator(productImages).first()).toBeVisible();

  // NOTE: the products request has no stable sort, so page 1 content varies
  // between identical requests — assert on the set CHANGING and on counts,
  // not on exact equality with the initial set.
  const unfiltered = (await productHrefs(page)).join('|');
  const unfilteredCount = await page.locator(productLinks).count();

  const aside = page.locator('aside');
  await expect(aside.getByRole('heading', { name: 'Size' })).toBeVisible();
  await aside.locator('.MuiChip-root', { hasText: /^m$/ }).click();

  // the list empties for a moment while the filtered request is in flight —
  // poll until a non-empty set that differs from the unfiltered one appears
  await expect
    .poll(async () => {
      const hrefs = await productHrefs(page);
      return hrefs.length > 0 && hrefs.join('|') !== unfiltered;
    })
    .toBe(true);
  expect(await page.locator(productLinks).count()).toBeLessThanOrEqual(unfilteredCount);

  await aside.getByText('Reset filters').click();
  await expect.poll(async () => page.locator(productLinks).count()).toBe(unfilteredCount);
});
