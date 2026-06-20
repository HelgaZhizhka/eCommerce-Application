import type { ReactElement, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';

import { createCart, deleteCart, getActiveCart, updateCart } from '../services/cartService';
import {
  cartKey,
  useAddToCartMutation,
  useApplyPromoMutation,
  useCartActions,
  useCartQuery,
  useChangeQuantityMutation,
  useClearCartMutation,
  useRemoveLineItemMutation,
  useRemovePromoMutation,
} from '../queries/cart';
import { CT } from './handlers';
import { server, recordRequests } from './server';
import { createTestQueryClient } from './utils';
import { cartWithItem } from './fixtures';

const SESSION_KEY = 'ct_session';
const seedSession = (kind: 'anonymous' | 'customer' = 'anonymous'): void =>
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token: 'seeded', expiresAt: Date.now() + 3_600_000, kind }));

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('cart service (CT API via MSW)', () => {
  it('reads the active cart for a session', async () => {
    seedSession();
    const cart = await getActiveCart();
    expect(cart?.id).toBe('cart-1');
  });

  it('returns null when the session has no active cart (404)', async () => {
    seedSession();
    server.use(
      http.get(`${CT}/me/active-cart`, () =>
        HttpResponse.json(
          { statusCode: 404, message: 'No active cart found.', errors: [{ code: 'ResourceNotFound', message: 'x' }] },
          { status: 404 }
        )
      )
    );
    await expect(getActiveCart()).resolves.toBeNull();
  });

  it('rethrows non-404 errors from active-cart', async () => {
    seedSession();
    server.use(
      http.get(`${CT}/me/active-cart`, () =>
        HttpResponse.json(
          { statusCode: 500, message: 'Server error', errors: [{ code: 'General', message: 'boom' }] },
          { status: 500 }
        )
      )
    );
    await expect(getActiveCart()).rejects.toBeDefined();
  });

  it('creates an anonymous session on the BFF when none exists, then creates a cart in EUR', async () => {
    const calls = recordRequests();
    const cart = await createCart();

    expect(cart.id).toBe('cart-1');
    expect(calls.some((c) => c.url.endsWith('/api/auth/anonymous'))).toBe(true);
    const createCall = calls.find((c) => c.method === 'POST' && c.url.endsWith('/me/carts'));
    expect(await createCall!.clone().json()).toEqual({ currency: 'EUR' });
    expect(localStorage.getItem(SESSION_KEY)).toContain('anonymous');
  });

  it('sends version + actions on update', async () => {
    seedSession();
    const calls = recordRequests();
    await updateCart(cartWithItem as never, [{ action: 'addLineItem', productId: 'prod-red-tee', quantity: 1 }]);

    const updateCall = calls.find((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname));
    expect(updateCall).toBeDefined();
    expect(await updateCall!.clone().json()).toEqual({
      version: 2,
      actions: [{ action: 'addLineItem', productId: 'prod-red-tee', quantity: 1 }],
    });
  });

  it('passes the cart version as a query arg on delete', async () => {
    seedSession();
    const calls = recordRequests();
    await deleteCart(cartWithItem as never);

    const deleteCall = calls.find((c) => c.method === 'DELETE');
    expect(new URL(deleteCall!.url).searchParams.get('version')).toBe('2');
  });
});

describe('cart mutations (TanStack Query cache)', () => {
  const renderWithClient = <T,>(hook: () => T) => {
    const queryClient = createTestQueryClient();
    function Wrapper({ children }: { children: ReactNode }): ReactElement {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    return { queryClient, ...renderHook(hook, { wrapper: Wrapper }) };
  };

  it('add-to-cart creates a cart then writes the server cart into the cache', async () => {
    const { queryClient, result } = renderWithClient(() => useAddToCartMutation());

    await result.current.mutateAsync({ productId: 'prod-red-tee', quantity: 2 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(queryClient.getQueryData(cartKey)).toMatchObject({ id: 'cart-1', version: 2 });
  });

  it('clear-cart deletes the cached cart and resets the cache to null', async () => {
    seedSession();
    const { queryClient, result } = renderWithClient(() => useClearCartMutation());
    queryClient.setQueryData(cartKey, cartWithItem);

    const calls = recordRequests();
    await result.current.mutateAsync(undefined);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(calls.some((c) => c.method === 'DELETE')).toBe(true);
    expect(queryClient.getQueryData(cartKey)).toBeNull();
  });

  it('apply-promo sends an addDiscountCode action against the cached cart', async () => {
    const { queryClient, result } = renderWithClient(() => useApplyPromoMutation());
    queryClient.setQueryData(cartKey, cartWithItem);

    server.use(http.post(`${CT}/me/carts/:id`, () => HttpResponse.json({ ...cartWithItem, version: 3 })));
    const calls = recordRequests();
    await result.current.mutateAsync('BAGS15-SP');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const updateCall = calls.find((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname));
    const body = (await updateCall!.clone().json()) as { actions: { action: string; code?: string }[] };
    expect(body.actions[0]).toEqual({ action: 'addDiscountCode', code: 'BAGS15-SP' });
    expect(queryClient.getQueryData(cartKey)).toMatchObject({ version: 3 });
  });

  it('useCartQuery derives products, totals and discount from the active cart', async () => {
    seedSession();
    const { result } = renderWithClient(() => useCartQuery());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toHaveLength(1);
    expect(result.current.totalAmount).toBe(2);
    expect(result.current.totalPrice).toBe(4000);
  });

  it('change-quantity sends a changeLineItemQuantity action for the cached cart', async () => {
    seedSession();
    const { queryClient, result } = renderWithClient(() => useChangeQuantityMutation());
    queryClient.setQueryData(cartKey, cartWithItem); // mutationFn no-ops without a cached cart

    const calls = recordRequests();
    await result.current.mutateAsync({ lineItemId: 'line-1', quantity: 5 });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const update = calls.find((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname));
    const body = (await update!.clone().json()) as { actions: { action: string; quantity: number }[] };
    expect(body.actions[0]).toMatchObject({ action: 'changeLineItemQuantity', quantity: 5 });
  });

  it('remove-line-item sets the quantity to zero', async () => {
    seedSession();
    const { queryClient, result } = renderWithClient(() => useRemoveLineItemMutation());
    queryClient.setQueryData(cartKey, cartWithItem);

    const calls = recordRequests();
    await result.current.mutateAsync('line-1');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const update = calls.find((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname));
    const body = (await update!.clone().json()) as { actions: { action: string; quantity: number }[] };
    expect(body.actions[0]).toMatchObject({ action: 'changeLineItemQuantity', lineItemId: 'line-1', quantity: 0 });
  });

  it('remove-promo sends a removeDiscountCode action', async () => {
    seedSession();
    const { queryClient, result } = renderWithClient(() => useRemovePromoMutation());
    queryClient.setQueryData(cartKey, cartWithItem);

    const calls = recordRequests();
    await result.current.mutateAsync('disc-1');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const update = calls.find((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname));
    const body = (await update!.clone().json()) as { actions: { action: string; discountCode: unknown }[] };
    expect(body.actions[0]).toMatchObject({
      action: 'removeDiscountCode',
      discountCode: { typeId: 'discount-code', id: 'disc-1' },
    });
  });

  it('useCartActions reports cart membership by sku and removes by sku', async () => {
    seedSession();
    const { queryClient, result } = renderWithClient(() => useCartActions());
    queryClient.setQueryData(cartKey, cartWithItem);
    await waitFor(() => expect(result.current.isProductInCart('RED-TEE-1')).toBe(true));

    expect(result.current.isProductInCart('NOPE')).toBe(false);
    const calls = recordRequests();
    await result.current.removeProductFromCart('RED-TEE-1');
    expect(calls.some((c) => c.method === 'POST' && /\/me\/carts\/cart-1$/.test(new URL(c.url).pathname))).toBe(true);
  });
});
