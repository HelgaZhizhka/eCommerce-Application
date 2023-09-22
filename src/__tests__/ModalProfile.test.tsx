import { render, fireEvent } from '@testing-library/react';
import ModalProfile from '../components/baseComponents/ModalProfile/ModalProfile';

describe('ModalProfile', () => {
  it('should render the modal with the given props', () => {
    const activeModal = 'address';
    const handleCloseModal = jest.fn();
    const onSaveChange = jest.fn();

    const { getByRole, getByText } = render(
      <ModalProfile activeModal={activeModal} handleCloseModal={handleCloseModal} onSaveChange={onSaveChange} />
    );

    const modal = getByRole('presentation');
    expect(modal).toBeInTheDocument();

    const closeButton = getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
    expect(onSaveChange).not.toHaveBeenCalled();
  });
});
