import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AddressAdd } from '../../AddressAdd';
import { PasswordChange } from '../../PasswordChange';

const style = {
  position: 'absolute' as const,
  top: '50%' as const,
  left: '50%' as const,
  transform: 'translate(-50%, -50%)' as const,
  bgcolor: 'background.paper' as const,
  border: '2px solid #000' as const,
  boxShadow: 24 as const,
  pt: 2 as const,
  px: 4 as const,
  pb: 3 as const,
  m: '0 15px' as const,
};

type Props = {
  activeModal: string | null;
  handleCloseModal: () => void;
};

const ModalProfile: React.FC<Props> = ({ activeModal, handleCloseModal }) => (
  <div>
    <Modal
      open={!!activeModal}
      onClose={handleCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {activeModal === 'address' && <AddressAdd />}
        {activeModal === 'password' && <PasswordChange />}
      </Box>
    </Modal>
  </div>
);

export default ModalProfile;
