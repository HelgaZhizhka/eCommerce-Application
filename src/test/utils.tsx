import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Fresh client per test, no retries/refetch — failures surface immediately
// instead of being retried into a timeout. gcTime is left at the default: with
// gcTime 0, a setQueryData entry written by a mutation (no active observer) is
// garbage-collected before the assertion can read it.
export const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });

export const createWrapper = (): ((props: { children: ReactNode }) => ReactElement) => {
  const queryClient = createTestQueryClient();
  function QueryWrapper({ children }: { children: ReactNode }): ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }
  return QueryWrapper;
};
