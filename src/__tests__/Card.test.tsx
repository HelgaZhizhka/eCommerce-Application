import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from '../components/Card';

test('renders the card with default props', () => {
  render(
    <BrowserRouter>
      <Card />
    </BrowserRouter>
  );

  const cardImage = screen.getByAltText('TShirt with label');
  const cardButton = screen.getByRole('link', { name: '' });

  expect(cardImage).toBeInTheDocument();
  expect(cardButton).toBeInTheDocument();
});

test('renders the card with discount badge when isDiscount is true', () => {
  render(
    <BrowserRouter>
      <Card isDiscount={true} />
    </BrowserRouter>
  );

  const discountBadge = screen.getByText('Sale');
  expect(discountBadge).toBeInTheDocument();
});

test('renders the card without discount badge when isDiscount is false', () => {
  render(
    <BrowserRouter>
      <Card isDiscount={false} />
    </BrowserRouter>
  );

  const discountBadge = screen.queryByText('Sale');
  expect(discountBadge).toBeNull();
});

test('renders the card description correctly', () => {
  render(
    <BrowserRouter>
      <Card />
    </BrowserRouter>
  );

  const cardDescription = screen.getByText(/Standart raccoon t-shirt raccoon t-shirt/i);
  expect(cardDescription).toBeInTheDocument();
});
