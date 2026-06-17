import { Dialog, DialogContent, DialogTitle } from '../baseComponents/Dialog';
import { Button } from '../baseComponents/Button';

type Props = {
  title: string;
  isOpen: boolean;
  content?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
};

const ModalConfirm: React.FC<Props> = ({ title, content, isOpen, onClose, onConfirm }) => (
  <Dialog
    open={isOpen}
    onOpenChange={(open): void => {
      if (!open) onClose();
    }}
  >
    <DialogContent>
      <DialogTitle className="mt-4 text-center text-2xl">{title}</DialogTitle>
      {content && <div className="p-4">{content}</div>}
      {onConfirm && (
        <div className="flex justify-center gap-2 p-4">
          <Button variant="contained" className="text-2xl" onClick={onConfirm}>
            OK
          </Button>
          <Button variant="outlined" className="text-2xl" onClick={onClose}>
            Cancel
          </Button>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default ModalConfirm;
