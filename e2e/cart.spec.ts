import { test, expect } from '@playwright/test';

// Pins the guest cart flow: add from product page, badge counter,
// cart listing, clear cart. Uses a mug (single variant, no size selection).

test.describe.serial('guest cart flow', () => {
  test('change quantity and remove a single line item', async ({ page }) => {
    await page.goto('/category/drinkware/mugs');

    const firstProductImage = page.locator('a[href^="/product/"] img').first();
    await expect(firstProductImage).toBeVisible();
    await firstProductImage.click();

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    const cartLink = page.locator('a[href="/cart"]').first();
    await expect(cartLink.getByText('1', { exact: true })).toBeVisible();

    await page.goto('/cart');
    // breadcrumbs are also a list inside <main> — pick the item with the
    // quantity spinbutton
    const lineItem = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('spinbutton') })
      .first();
    await expect(lineItem.getByRole('spinbutton')).toBeVisible();
    await page.waitForLoadState('networkidle');

    // quantity 1 → 2 doubles the line total and the header badge
    await lineItem.getByRole('spinbutton').fill('2');
    await expect(cartLink.getByText('2', { exact: true })).toBeVisible();

    // the only named-less button inside the line item is the delete control
    await page.waitForLoadState('networkidle');
    await lineItem.locator('button').last().click();

    await expect(page.getByText('The cart feels light !')).toBeVisible();
  });

  test('add product to cart, see it in cart, clear cart', async ({ page }) => {
    await page.goto('/category/drinkware/mugs');

    const firstProductImage = page.locator('a[href^="/product/"] img').first();
    await expect(firstProductImage).toBeVisible();
    await firstProductImage.click();

    const addButton = page.getByRole('button', { name: 'Add to cart' }).first();
    await expect(addButton).toBeVisible();

    const productName = (await page.getByRole('heading').first().innerText()).trim();
    await addButton.click();

    const cartLink = page.locator('a[href="/cart"]').first();
    await expect(cartLink.getByText('1', { exact: true })).toBeVisible();

    await page.goto('/cart');
    await expect(page.getByText(productName).first()).toBeVisible();
    // the item renders from store state while the cart-page getCart() refetch is
    // still in flight; deleting before it settles races on the cart version (409)
    await page.waitForLoadState('networkidle');

    await page.getByText('Delete all products').click();
    await page.getByRole('button', { name: 'OK' }).click();

    await expect(page.getByText('The cart feels light !')).toBeVisible();
  });
});
