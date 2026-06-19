// jest-dom adds custom matchers for asserting on DOM nodes (vitest build).
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach } from 'vitest';

import { server } from './test/server';

// Start MSW at setup-file eval time — BEFORE any test module imports ctClient,
// which captures `httpClient: fetch` once at module load. Listening here patches
// globalThis.fetch first, so the SDK's captured reference is the intercepted one.
// (Putting listen() in beforeAll would be too late: the service modules import
// during test-file evaluation, which runs after setup but before beforeAll.)
server.listen({ onUnhandledRequest: 'error' });

afterEach(() => {
  server.resetHandlers();
  server.events.removeAllListeners();
});

afterAll(() => server.close());

window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(), // legacy MUI API
    removeListener: vi.fn(),
    addEventListener: vi.fn(), // modern API used by shared/lib/useMediaQuery
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
});
