import { afterEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import App from '../App';
import { notifyQueryError, queryClient } from '../queries/queryClient';
import { subscribeToToasts, Toast } from '../queries/notifications';
import { server, recordRequests } from './server';
import { createTestQueryClient } from './utils';

// Regression guard for the "eternal loader": with the backend down (expired CT
// trial), App used to flip mount→refetch→unmount forever, hammering the BFF.

const backendDown = () =>
  server.use(
    http.post('/api/auth/visitor', () =>
      HttpResponse.json({ message: "The trial of project 'x' has expired" }, { status: 400 })
    )
  );

afterEach(() => queryClient.clear());

describe('graceful degradation when the backend is down', () => {
  it('renders the app shell instead of an eternal loader, with a single auth attempt', async () => {
    backendDown();
    const calls = recordRequests();

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(document.querySelector('header')).toBeInTheDocument());

    // let any feedback loop show itself, then confirm stability
    await new Promise((r) => setTimeout(r, 800));
    expect(document.querySelector('header')).toBeInTheDocument();
    expect(screen.getAllByText(/about us/i).length).toBeGreaterThan(0);

    // One attempt per query observer that mounts at boot (App + header menus),
    // then silence — before the App boot latch this was an unbounded storm
    // (~40 requests/second) because the shell kept unmounting and remounting.
    const visitorCalls = calls.filter((c) => c.url.endsWith('/api/auth/visitor'));
    expect(visitorCalls.length).toBeLessThanOrEqual(3);
  });

  it('reports the outage through the toast bus (real queryClient wiring)', async () => {
    backendDown();
    const toasts: Toast[] = [];
    const unsubscribe = subscribeToToasts((t) => toasts.push(t));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(toasts.length).toBeGreaterThan(0));
    expect(toasts[0]).toMatchObject({ type: 'error' });
    expect(toasts[0]!.message).toMatch(/trial of project 'x' has expired/i);
    unsubscribe();
  });

  it('dedupes repeated identical query errors into one toast', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToToasts(listener);

    notifyQueryError(new Error('boom-dedupe'));
    notifyQueryError(new Error('boom-dedupe'));
    expect(listener).toHaveBeenCalledTimes(1);

    notifyQueryError(new Error('boom-other'));
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
  });
});
