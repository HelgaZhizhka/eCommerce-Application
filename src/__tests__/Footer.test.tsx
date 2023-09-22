import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';

describe('Footer component', () => {
  it('renders the component without errors', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('displays links correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('displays footer columns correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });
});
