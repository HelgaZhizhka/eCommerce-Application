import { Dialog, DialogContent, DialogTitle } from '../baseComponents/Dialog';
import { ProductCarousel } from '../ProductCarousel';

type Props = {
  isOpen: boolean;
  title?: string;
  images?: string[];
  activeImageIndex?: number;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ isOpen, activeImageIndex = 0, onClose, title, images }) => (
  <Dialog
    open={isOpen}
    onOpenChange={(open): void => {
      if (!open) onClose();
    }}
  >
    <DialogContent className="max-w-2xl">
      <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
      {images && <ProductCarousel images={images} activeImageIndex={activeImageIndex} variant={'full'} />}
    </DialogContent>
  </Dialog>
);

export default Modal;
