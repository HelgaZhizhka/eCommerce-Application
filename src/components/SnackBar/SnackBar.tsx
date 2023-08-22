import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { userStore } from '../../stores';

const SnackBar: React.FC = () => {
  const { error } = userStore;

  const handleClose = (): void => {
    userStore.clearError();
  };

  return (
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
  );
};

export default observer(SnackBar);
