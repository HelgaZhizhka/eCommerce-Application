import { render } from '@testing-library/react';
import Price from '../components/baseComponents/Price/Price';

describe('Price', () => {
  it('should render the price with the given props', () => {
    const price = '100';
    const currency = 'USD';
    const className = 'custom-class';
    const variant = 'new';

    const { getByText, container } = render(
      <Price className={className} variant={variant} currency={currency}>
        {price}
      </Price>
    );

    const priceElement = getByText(price);
    expect(priceElement).toBeInTheDocument();

    const currencyElement = getByText(currency);
    expect(currencyElement).toBeInTheDocument();

    const rootElement = container.firstChild;
    expect(rootElement).toHaveClass('root');
    expect(rootElement).toHaveClass('new');
    expect(rootElement).toHaveClass(className);
  });
});
