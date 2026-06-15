import { Dialog, DialogContent, DialogTitle } from '../Dialog';
import { AddressAdd } from '../../AddressAdd';
import { PasswordChange } from '../../PasswordChange';

type Props = {
  activeModal: string | null;
  handleCloseModal: () => void;
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

const ModalProfile: React.FC<Props> = ({ activeModal, handleCloseModal, onSaveChange }) => (
  <Dialog
    open={!!activeModal}
    onOpenChange={(open): void => {
      if (!open) handleCloseModal();
    }}
  >
    <DialogContent className="max-w-[400px] border-2 border-black">
      <DialogTitle className="sr-only">{activeModal === 'address' ? 'Add address' : 'Change password'}</DialogTitle>
      {activeModal === 'address' && <AddressAdd onSaveChange={onSaveChange} />}
      {activeModal === 'password' && <PasswordChange onSaveChange={onSaveChange} />}
    </DialogContent>
  </Dialog>
);

export default ModalProfile;
