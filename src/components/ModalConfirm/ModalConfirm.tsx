import { styled, Dialog, DialogTitle, IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

type Props = {
  title: string;
  isOpen: boolean;
  content?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
};

const ModalConfirm: React.FC<Props> = ({ title, content, isOpen, onClose, onConfirm }) => (
  <BootstrapDialog onClose={onClose} open={isOpen}>
    <DialogTitle sx={{ mt: 4, textAlign: 'center' }} variant="h5">
      {title}
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
    {content && <Box sx={{ p: 4 }}>{content}</Box>}
    <Box sx={{ p: 4, textAlign: 'canter', display: 'flex', gap: '5px' }}>
      {onConfirm && (
        <>
          <Button variant="contained" sx={{ fontSize: '24px', display: 'block', margin: 'auto' }} onClick={onConfirm}>
            OK
          </Button>
          <Button variant="outlined" sx={{ fontSize: '24px', display: 'block', margin: 'auto' }} onClick={onClose}>
            Cancel
          </Button>
        </>
      )}
    </Box>
  </BootstrapDialog>
);

export default ModalConfirm;
