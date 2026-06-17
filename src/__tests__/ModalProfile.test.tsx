import { render, fireEvent } from '@testing-library/react';
import ModalProfile from '../components/baseComponents/ModalProfile/ModalProfile';

describe('ModalProfile', () => {
  it('should render the modal with the given props', () => {
    const activeModal = 'address';
    const handleCloseModal = vi.fn();
    const onSaveChange = vi.fn();

    const { getByRole } = render(
      <ModalProfile activeModal={activeModal} handleCloseModal={handleCloseModal} onSaveChange={onSaveChange} />
    );

    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const closeButton = getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
    expect(onSaveChange).not.toHaveBeenCalled();
  });
});
