import { render } from '@testing-library/react';
import PhoneNumber from '../components/baseComponents/PhoneNumber/PhoneNumber';

describe('PhoneNumber', () => {
  it('should render the phone number link with the given props', () => {
    const phoneNumber = '+1234567890';
    const className = 'custom-class';

    const { container, getByText, getByRole } = render(<PhoneNumber className={className}>{phoneNumber}</PhoneNumber>);

    const phoneNumberElement = getByText(phoneNumber);
    expect(phoneNumberElement).toBeInTheDocument();

    const containerElement = container.querySelector('span');
    expect(containerElement).toHaveClass(className);

    const phoneLink = getByRole('link', { name: phoneNumber });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', `tel: ${phoneNumber}`);
  });
});
