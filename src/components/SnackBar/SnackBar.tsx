import { observer } from 'mobx-react-lite';
import { Snackbar, Alert } from '@mui/material';

import { cartStore, userStore } from '../../stores';

const SnackBar: React.FC = () => {
  const userError = userStore.error;
  const userSuccess = userStore.success;
  const cartSuccess = cartStore.success;

  const cartError = cartStore.error;

  const handleClose = (): void => {
    userStore.clearError();
    userStore.clearSuccess();
    cartStore.clearError();
    cartStore.clearSuccess();
  };

  return (
    <>
      {(userError || cartError) && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!userError || !!cartError}
          message={userError || cartError}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {userError || cartError}
          </Alert>
        </Snackbar>
      )}

      {(userSuccess || cartSuccess) && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!userSuccess || !!cartSuccess}
          message={userSuccess || cartSuccess}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="success" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {userSuccess || cartSuccess}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default observer(SnackBar);
