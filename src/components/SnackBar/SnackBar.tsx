import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

import { useAuthStore } from '../../stores/authStore';
import { subscribeToToasts, Toast } from '../../queries/notifications';

const SnackBar: React.FC = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => subscribeToToasts(setToast), []);

  const userError = useAuthStore((state) => state.error);
  const userSuccess = useAuthStore((state) => state.success);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccess = useAuthStore((state) => state.clearSuccess);

  const error = userError ?? (toast?.type === 'error' ? toast.message : null);
  const success = userSuccess ?? (toast?.type === 'success' ? toast.message : null);

  const handleClose = (): void => {
    clearError();
    clearSuccess();
    setToast(null);
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!error}
          message={error}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!success}
          message={success}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="success" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {success}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
