// jest-dom adds custom matchers for asserting on DOM nodes (vitest build).
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});
