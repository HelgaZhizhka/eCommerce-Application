import React from 'react';

import { useCategoriesQuery } from './queries/categories';
import RoutesConfig from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SnackBar } from './components/SnackBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { isLoading: isAppLoading } = useCategoriesQuery();

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
