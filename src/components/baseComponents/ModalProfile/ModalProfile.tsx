import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AddressAdd } from '../../AddressAdd';
import { PasswordChange } from '../../PasswordChange';
import styles from './ModalProfile.module.scss';

const style = {
  bgcolor: 'background.paper' as const,
  border: '2px solid #000' as const,
  boxShadow: 24 as const,
  pt: 2 as const,
  px: 4 as const,
  pb: 3 as const,
};

type Props = {
  activeModal: string | null;
  handleCloseModal: () => void;
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

const ModalProfile: React.FC<Props> = ({ activeModal, handleCloseModal, onSaveChange }) => (
  <div>
    <Modal
      open={!!activeModal}
      onClose={handleCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={styles.popup} sx={{ ...style }}>
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
        {activeModal === 'address' && <AddressAdd onSaveChange={onSaveChange} />}
        {activeModal === 'password' && <PasswordChange onSaveChange={onSaveChange} />}
      </Box>
    </Modal>
  </div>
);

export default ModalProfile;
