import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { RoutePaths } from '../../routes/routes.enum';

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
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Something went wrong</Typography>
          <Typography color="text.secondary">An unexpected error occurred. Try reloading the page.</Typography>
          <Button variant="contained" onClick={(): void => window.location.assign(RoutePaths.MAIN)}>
            Back to home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
