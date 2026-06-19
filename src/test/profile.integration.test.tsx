import type { ReactElement, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  addAddress,
  changeAddress,
  changePassword,
  getUser,
  removeAddress,
  setAdress,
  updatePersonalData,
} from '../services/setCustomersDetails';
import { http, HttpResponse } from 'msw';

import { meKey, useMeQuery, useUpdateProfileMutation } from '../queries/customer';
import { createTestQueryClient } from './utils';
import { CT } from './handlers';
import { server, recordRequests } from './server';
import { meCustomer } from './fixtures';

const SESSION_KEY = 'ct_session';
const seedCustomer = (): void =>
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ token: 'seeded', expiresAt: Date.now() + 3_600_000, kind: 'customer' })
  );

const mePosts = (calls: Request[]): Request[] =>
  calls.filter((c) => c.method === 'POST' && /\/me$/.test(new URL(c.url).pathname));

const bodyOf = async (
  req: Request
): Promise<{ version: number; actions: { action: string; [k: string]: unknown }[] }> =>
  (await req.clone().json()) as { version: number; actions: { action: string; [k: string]: unknown }[] };

beforeEach(() => {
  localStorage.clear();
  seedCustomer();
});
afterEach(() => localStorage.clear());

describe('profile service (CT me-endpoints via MSW)', () => {
  it('reads the current customer', async () => {
    const user = await getUser();
    expect(user?.id).toBe('customer-1');
  });

  it('updatePersonalData posts the four personal-info actions', async () => {
    const calls = recordRequests();
    await updatePersonalData({
      firstName: 'Ann',
      lastName: 'Lee',
      dateOfBirth: '1990-05-01',
      email: 'ann@test.dev',
      version: 3,
    });

    const body = await bodyOf(mePosts(calls)[0]!);
    expect(body.version).toBe(3);
    expect(body.actions.map((a) => a.action)).toEqual(['setFirstName', 'setLastName', 'setDateOfBirth', 'changeEmail']);
    expect(body.actions[3]).toMatchObject({ action: 'changeEmail', email: 'ann@test.dev' });
  });

  it('removeAddress posts a removeAddress action', async () => {
    const calls = recordRequests();
    await removeAddress({ id: 'addr-9', version: 2 });

    const body = await bodyOf(mePosts(calls)[0]!);
    expect(body.actions[0]).toEqual({ action: 'removeAddress', addressId: 'addr-9' });
  });

  it('addAddress (shipping, default) adds the address then sets it as default shipping', async () => {
    const calls = recordRequests();
    await addAddress({
      address: 'Shipping',
      checkBox: true,
      city: 'Berlin',
      country: 'DE',
      postalCode: '10115',
      street: 'Main 1',
      version: 1,
    });

    const posts = mePosts(calls);
    expect((await bodyOf(posts[0]!)).actions[0]).toMatchObject({ action: 'addAddress' });
    expect((await bodyOf(posts[1]!)).actions[0]).toMatchObject({
      action: 'setDefaultShippingAddress',
      addressId: 'addr-1',
    });
  });

  it('addAddress (billing, non-default) adds the address then registers a billing address id', async () => {
    const calls = recordRequests();
    await addAddress({
      address: 'Billing',
      checkBox: false,
      city: 'Berlin',
      country: 'DE',
      postalCode: '10115',
      street: 'Main 1',
      version: 1,
    });

    const posts = mePosts(calls);
    expect((await bodyOf(posts[1]!)).actions[0]).toMatchObject({ action: 'addBillingAddressId', addressId: 'addr-1' });
  });

  it('changeAddress (shipping, default) edits then sets default shipping with the id', async () => {
    const calls = recordRequests();
    await changeAddress({
      id: 'addr-1',
      name: 'Shipping',
      checkBox: true,
      city: 'Berlin',
      country: 'DE',
      postalCode: '10115',
      streetName: 'Main 1',
      version: 1,
    });

    const posts = mePosts(calls);
    expect((await bodyOf(posts[0]!)).actions[0]).toMatchObject({ action: 'changeAddress', addressId: 'addr-1' });
    expect((await bodyOf(posts[1]!)).actions[0]).toMatchObject({
      action: 'setDefaultShippingAddress',
      addressId: 'addr-1',
    });
  });

  it('changeAddress (billing, non-default) clears the default billing address', async () => {
    const calls = recordRequests();
    await changeAddress({
      id: 'addr-1',
      name: 'Billing',
      checkBox: false,
      city: 'Berlin',
      country: 'DE',
      postalCode: '10115',
      streetName: 'Main 1',
      version: 1,
    });

    const second = (await bodyOf(mePosts(calls)[1]!)).actions[0];
    expect(second.action).toBe('setDefaultBillingAddress');
    expect(second.addressId).toBeUndefined();
  });

  it('changePassword posts to me/password with current + new password', async () => {
    const calls = recordRequests();
    await changePassword({ version: 1, currentPassword: 'Old123', newPassword: 'New456' });

    const pw = calls.find((c) => c.method === 'POST' && c.url.endsWith('/me/password'));
    expect(await pw!.clone().json()).toEqual({ version: 1, currentPassword: 'Old123', newPassword: 'New456' });
  });

  it('setAdress logs in then registers shipping + billing address ids', async () => {
    localStorage.clear(); // setAdress uses the password flow, not an existing session
    // post-registration the customer has both a shipping and billing address
    server.use(
      http.get(`${CT}/me`, () => HttpResponse.json({ ...meCustomer, addresses: [{ id: 'addr-1' }, { id: 'addr-2' }] }))
    );
    const calls = recordRequests();
    await setAdress('shopper@test.dev', 'Secret123');

    const body = await bodyOf(mePosts(calls)[0]!);
    expect(body.actions.map((a) => a.action)).toEqual(['addShippingAddressId', 'addBillingAddressId']);
  });
});

describe('profile query hooks (TanStack Query + MSW)', () => {
  const renderWithClient = <T,>(hook: () => T) => {
    const queryClient = createTestQueryClient();
    function Wrapper({ children }: { children: ReactNode }): ReactElement {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    return { queryClient, ...renderHook(hook, { wrapper: Wrapper }) };
  };

  it('useMeQuery loads the customer', async () => {
    const { result } = renderWithClient(() => useMeQuery());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe('customer-1');
  });

  it('changePersonalData mutation writes the updated customer into the me cache', async () => {
    const { queryClient, result } = renderWithClient(() => useUpdateProfileMutation());
    await result.current.mutateAsync({
      action: 'changePersonalData',
      firstName: 'Ann',
      email: 'ann@test.dev',
      version: 1,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(queryClient.getQueryData(meKey)).toMatchObject({ id: 'customer-1', version: 2 });
  });

  it('changeAddress mutation merges the cached address before sending', async () => {
    const { queryClient, result } = renderWithClient(() => useUpdateProfileMutation());
    queryClient.setQueryData(meKey, {
      version: 4,
      addresses: [{ id: 'addr-1', city: 'Berlin', country: 'DE', streetName: 'Old', postalCode: '10115' }],
    });
    const calls = recordRequests();
    await result.current.mutateAsync({ action: 'changeAddress', id: 'addr-1', name: 'Shipping', checkBox: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mePosts(calls).length).toBeGreaterThanOrEqual(1);
  });

  it('rejects an unknown profile action', async () => {
    const { result } = renderWithClient(() => useUpdateProfileMutation());
    await expect(result.current.mutateAsync({ action: 'noSuchAction' })).rejects.toThrow(/unknown profile action/i);
  });
});
