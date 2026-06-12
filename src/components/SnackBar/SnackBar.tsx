import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Snackbar, Alert } from '@mui/material';

import { userStore } from '../../stores';
import { subscribeToToasts, Toast } from '../../queries/notifications';

const SnackBar: React.FC = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => subscribeToToasts(setToast), []);

  const userError = userStore.error;
  const userSuccess = userStore.success;

  const error = userError ?? (toast?.type === 'error' ? toast.message : null);
  const success = userSuccess ?? (toast?.type === 'success' ? toast.message : null);

  const handleClose = (): void => {
    userStore.clearError();
    userStore.clearSuccess();
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

export default observer(SnackBar);
