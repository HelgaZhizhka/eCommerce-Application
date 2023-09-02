import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { productStore, userStore } from '../../stores';

const SnackBar: React.FC = () => {
  const userError = userStore.error;

  const productError = productStore.error;

  const handleClose = (): void => {
    userStore.clearError();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={!!userError || !!productError}
      message={userError || productError}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <Alert severity="error" sx={{ fontSize: '24px', fontWeight: '600' }}>
        {userError || productError}
      </Alert>
    </Snackbar>
  );
};

export default observer(SnackBar);
