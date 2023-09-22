import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import EmptyCart from '../components/EmptyCart/EmptyCart';

test('renders EmptyCart component', () => {
  render(
    <MemoryRouter>
      <EmptyCart />
    </MemoryRouter>
  );

  const titleElements = screen.getAllByText(/The cart feels light/i);
  expect(titleElements).toHaveLength(1);

  const exploreButton = screen.getByRole('button', { name: /Explore/i });
  expect(exploreButton).toBeInTheDocument();
});

test('renders EmptyCart component with an image', () => {
  render(
    <MemoryRouter>
      <EmptyCart />
    </MemoryRouter>
  );

  const imageElement = screen.getByAltText(/racon/i);
  expect(imageElement).toBeInTheDocument();
});

test('renders EmptyCart component with a link to /category/clothes/t-shirts', () => {
  render(
    <MemoryRouter>
      <EmptyCart />
    </MemoryRouter>
  );

  const exploreButton = screen.getByRole('button', { name: /Explore/i });
  expect(exploreButton.closest('a')).toHaveAttribute('href', '/category/clothes/t-shirts');
});
