import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

import { ProductCarousel } from '../ProductCarousel';
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
  images?: string[];
  thumbs?: string[];
};

const Modal: React.FC<Props> = ({ isOpen, onClose, title, images }) => (
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
      {images && <ProductCarousel images={images} variant={'fullsize'} />}
    </BootstrapDialog>
  </Box>
);

export default Modal;
