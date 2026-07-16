import React from 'react';

import { useCategoriesQuery } from './queries/categories';
import RoutesConfig from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SnackBar } from './components/SnackBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { errorUpdateCount, isLoading } = useCategoriesQuery();
  // Boot latch: show the spinner only until the FIRST categories fetch settles
  // (data or error), then keep the shell mounted for good. errorUpdateCount is
  // the latch — it persists on the query across refetches, and the header menus
  // inside the shell re-fetch this (data-less) query when they mount. If the
  // gate followed isLoading alone, that refetch would unmount the shell again,
  // looping mount→refetch→unmount forever when the backend is down (the
  // "infinite loader" + request storm). The outage itself surfaces as a toast.
  const isAppLoading = isLoading && errorUpdateCount === 0;

  return (
    <>
      <SnackBar />
      <div className="app">
        {isAppLoading ? (
          <div className="flex h-[var(--app-height)] w-full items-center justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"
            />
          </div>
        ) : (
          <>
            <Header />
            <main className="relative flex-1 pb-4">
              <ErrorBoundary>
                <RoutesConfig />
              </ErrorBoundary>
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default App;
