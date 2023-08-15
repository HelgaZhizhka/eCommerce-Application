import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { userStore } from '../../stores';

const SnackBar: React.FC = () => {
  const { error } = userStore;

  const handleClose = (): void => {
    console.log('closed');
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
        This is an error message!
      </Alert>
    </Snackbar>
  );
};

export default observer(SnackBar);
