// Minimal toast bus (3.5): mutations report success/error here, the SnackBar
// subscribes. Replaces the legacy error/success string fields on the stores.

export type Toast = {
  type: 'success' | 'error';
  message: string;
};

type Listener = (toast: Toast) => void;

let listeners: Listener[] = [];

export const notify = (toast: Toast): void => {
  listeners.forEach((listener) => listener(toast));
};

export const subscribeToToasts = (listener: Listener): (() => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
