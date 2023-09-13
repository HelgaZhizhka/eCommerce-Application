import { render, fireEvent } from '@testing-library/react';
import Button from '../components/baseComponents/Button/Button';

test('renders a button with children', () => {
  const { getByText } = render(<Button>Click me</Button>);
  const buttonElement = getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
});

test('calls the onClick function when clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
  const buttonElement = getByText('Click me');

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('adds the "disabled" class when disabled prop is true', () => {
  const { container } = render(<Button disabled>Click me</Button>);
  const buttonElement = container.querySelector('button');
  expect(buttonElement).toHaveClass('disabled');
});

test('does not call the onClick function when disabled', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <Button onClick={onClickMock} disabled>
      Click me
    </Button>
  );
  const buttonElement = getByText('Click me');

  fireEvent.click(buttonElement);

  expect(onClickMock).not.toHaveBeenCalled();
});
