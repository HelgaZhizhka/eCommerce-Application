import { Component, ErrorInfo, ReactNode } from 'react';

import { RoutePaths } from '../../routes/routes.enum';
import { Button } from '../baseComponents/Button';

// Global error boundary (5.5): catches render-time crashes so a broken page
// shows a recovery prompt instead of a blank screen.

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-4xl">Something went wrong</h2>
          <p className="text-gray">An unexpected error occurred. Try reloading the page.</p>
          <Button variant="contained" onClick={(): void => window.location.assign(RoutePaths.MAIN)}>
            Back to home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
