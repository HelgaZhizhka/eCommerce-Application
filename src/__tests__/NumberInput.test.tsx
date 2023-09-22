import { render, fireEvent } from '@testing-library/react';
import NumberInput from '../components/baseComponents/NumberInput/NumberInput';

describe('NumberInput', () => {
  it('should render the input with the given props', () => {
    const value = 42;
    const onChange = jest.fn();
    const min = 0;
    const max = 100;
    const label = 'Number:';
    const className = 'custom-class';

    const { getByLabelText } = render(
      <NumberInput value={value} onChange={onChange} min={min} max={max} label={label} className={className} />
    );

    const inputElement = getByLabelText(label);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'number');
    expect(inputElement).toHaveAttribute('min', min.toString());
    expect(inputElement).toHaveAttribute('max', max.toString());

    fireEvent.change(inputElement, { target: { value: '55' } });

    expect(onChange).toHaveBeenCalledWith(55);
  });
});
