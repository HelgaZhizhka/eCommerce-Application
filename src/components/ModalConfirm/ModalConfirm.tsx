import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

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
  deleteItemsFromCart: () => void;
  onClose: () => void;
};

const ModalConfirm: React.FC<Props> = ({ isOpen, onClose, deleteItemsFromCart }) => (
  <BootstrapDialog onClose={onClose} open={isOpen}>
    <DialogTitle sx={{ mt: 4 }} variant="h5">
      Are you sure you want to delete all products?
    </DialogTitle>
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
    <Box sx={{ p: 4, textAlign: 'canter', display: 'flex', gap: '5px' }}>
      <Button
        variant="contained"
        sx={{ fontSize: '24px', display: 'block', margin: 'auto' }}
        onClick={deleteItemsFromCart}
      >
        OK
      </Button>
      <Button variant="outlined" sx={{ fontSize: '24px', display: 'block', margin: 'auto' }} onClick={onClose}>
        Cancel
      </Button>
    </Box>
  </BootstrapDialog>
);

export default ModalConfirm;
