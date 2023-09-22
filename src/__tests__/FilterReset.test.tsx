import { render, fireEvent } from '@testing-library/react';
import FilterReset from '../components/baseComponents/FilterReset/FilterReset';

describe('FilterReset', () => {
  it('should render the component with the given props', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<FilterReset mobile={true} onClick={onClickMock} />);
    const button = getByText('Reset filters');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('width: 100%');
    expect(button).toHaveStyle('color: orange');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
