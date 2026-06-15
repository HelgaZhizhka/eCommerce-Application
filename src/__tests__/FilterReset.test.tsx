import { render, fireEvent } from '@testing-library/react';
import FilterReset from '../components/baseComponents/FilterReset/FilterReset';

describe('FilterReset', () => {
  it('should render the component with the given props', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(<FilterReset mobile={true} onClick={onClickMock} />);
    const button = getByText('Reset filters');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
