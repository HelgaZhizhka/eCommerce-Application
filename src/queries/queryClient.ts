import { QueryClient } from '@tanstack/react-query';

// Defaults tuned to match the legacy stores' behavior: no automatic retries
// and no focus refetching — the old code fetched exactly once per navigation.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
