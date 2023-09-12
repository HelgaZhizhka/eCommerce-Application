import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { cartStore, productStore, userStore } from '../../stores';

const SnackBar: React.FC = () => {
  const userError = userStore.error;
  const userSuccess = userStore.success;
  const cartSuccess = cartStore.success;

  const productError = productStore.error;
  const cartError = cartStore.error;

  const handleClose = (): void => {
    userStore.clearError();
    userStore.clearSuccess();
    cartStore.clearError();
    cartStore.clearSuccess();
  };

  return (
    <>
      {(userError || productError || cartError) && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!userError || !!productError || !!cartError}
          message={userError || productError || cartError}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {userError || productError || cartError}
          </Alert>
        </Snackbar>
      )}

      {userSuccess ||
        (cartSuccess && (
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
        ))}
    </>
  );
};

export default observer(SnackBar);
