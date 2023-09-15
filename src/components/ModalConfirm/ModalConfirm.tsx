import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

import styles from './ModalConfirm.module.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

type Props = {
  isOpen: boolean;
  title?: string;
  deleteItemsFromCart: () => void;
  onClose: () => void;
};

const ModalConfirm: React.FC<Props> = ({ isOpen, onClose, title, deleteItemsFromCart }) => (
  <Box>
    <BootstrapDialog className={styles.modal} onClose={onClose} open={isOpen}>
      <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 10,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <h4>Are you sure you want to delete all products?</h4>
      <Button onClick={deleteItemsFromCart}>Delete</Button>
    </BootstrapDialog>
  </Box>
);

export default ModalConfirm;
