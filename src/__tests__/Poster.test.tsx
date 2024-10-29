import { render } from '@testing-library/react';
import { Poster } from '../components/Poster';

describe('Poster component', () => {
  it('renders the component without errors', () => {
    render(<Poster />);
  });

  it('displays all posters correctly', () => {
    const { getAllByAltText } = render(<Poster />);

    const posterImages = getAllByAltText('');
    expect(posterImages).toHaveLength(6);

    posterImages.forEach((image) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src');
    });
  });
});
