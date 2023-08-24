import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

import { ProductCarousel } from '../ProductCarosel';
import styles from './Modal.module.scss';

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
  onClose: () => void;
  title?: string;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, title }) => (
  <Box>
    <BootstrapDialog sx={{ m: 4, p: 4 }} className={styles.modal} onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <ProductCarousel />
    </BootstrapDialog>
  </Box>
);

export default Modal;
