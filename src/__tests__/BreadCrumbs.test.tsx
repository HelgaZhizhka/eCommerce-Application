import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumb from '../components/baseComponents/Breadcrumbs/Breadcrumbs';

const breadcrumbItems = [
  { text: 'Home', path: '/' },
  { text: 'Category', path: '/category' },
  { text: 'Product', path: '/category/product' },
];

test('renders Breadcrumb component with correct links and text', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Breadcrumb items={breadcrumbItems} />
    </MemoryRouter>
  );

  breadcrumbItems.forEach((item) => {
    const linkElement = getByText(item.text);
    expect(linkElement).toBeInTheDocument();

    if (item.path) {
      expect(linkElement).toHaveAttribute('href', item.path);
    }
  });
});
