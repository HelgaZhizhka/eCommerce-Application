import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Импортируем иконку для крестика

const style = {
  position: 'absolute' as const,
  top: '50%' as const,
  left: '50%' as const,
  transform: 'translate(-50%, -50%)' as const,
  width: 400 as const,
  bgcolor: 'background.paper' as const,
  border: '2px solid #000' as const,
  boxShadow: 24 as const,
  pt: 2 as const,
  px: 4 as const,
  pb: 3 as const,
};

type Props = {
  openAddressModal: boolean;
  handleCloseAddressModal: () => void;
};

const ModalChangePassword: React.FC<Props> = ({ openAddressModal, handleCloseAddressModal }) => (
  <div>
    <Modal
      open={openAddressModal}
      onClose={handleCloseAddressModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <IconButton
          aria-label="close"
          onClick={handleCloseAddressModal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <h2 id="parent-modal-title">Text in a modal</h2>
      </Box>
    </Modal>
  </div>
);

export default ModalChangePassword;
