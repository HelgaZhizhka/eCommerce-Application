import { QueryCache, QueryClient } from '@tanstack/react-query';

import { notify } from './notifications';

// Queries fail silently by design (mutations carry their own toasts) — except
// that a dead backend used to look like an eternal loader. Surface query
// failures through the toast bus instead, deduped so a burst of failing
// queries (categories + products + cart on one screen) yields one toast.
const TOAST_DEDUPE_MS = 5000;
let lastErrorToast = { message: '', at: 0 };

export const notifyQueryError = (error: Error): void => {
  const message = error.message || 'Request failed';
  const now = Date.now();
  if (message === lastErrorToast.message && now - lastErrorToast.at < TOAST_DEDUPE_MS) return;
  lastErrorToast = { message, at: now };
  notify({ type: 'error', message: `Service is temporarily unavailable: ${message}` });
};

// Defaults tuned to match the legacy stores' behavior: no automatic retries
// and no focus refetching — the old code fetched exactly once per navigation.
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => notifyQueryError(error as Error),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
