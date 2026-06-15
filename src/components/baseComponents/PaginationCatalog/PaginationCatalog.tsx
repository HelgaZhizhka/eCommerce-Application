import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../../../shared/lib/cn';

type Props = {
  handleChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

const range = (start: number, end: number): number[] => Array.from({ length: end - start + 1 }, (_, i) => start + i);

// Mirrors MUI Pagination defaults (boundaryCount=1, siblingCount=1): collapse
// long ranges with ellipses around the current page.
const buildPages = (current: number, total: number): Array<number | 'ellipsis'> => {
  if (total <= 7) return range(1, total);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  const pages: Array<number | 'ellipsis'> = [1];

  if (left > 2) pages.push('ellipsis');
  pages.push(...range(left, right));
  if (right < total - 1) pages.push('ellipsis');
  pages.push(total);

  return pages;
};

const itemBase = 'flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-lg transition-colors';

const PaginationCatalog: React.FC<Props> = ({ handleChange, totalPages, currentPage }) => (
  <nav aria-label="pagination" className="mt-10 flex items-center justify-center gap-1">
    <button
      type="button"
      aria-label="Previous page"
      disabled={currentPage <= 1}
      onClick={(): void => handleChange(currentPage - 1)}
      className={cn(itemBase, 'text-content hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40')}
    >
      <ChevronLeft size={20} />
    </button>

    {buildPages(currentPage, totalPages).map((page, index) =>
      page === 'ellipsis' ? (
        <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-gray">
          …
        </span>
      ) : (
        <button
          key={page}
          type="button"
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={(): void => handleChange(page)}
          className={cn(itemBase, page === currentPage ? 'bg-primary text-white' : 'text-content hover:bg-black/5')}
        >
          {page}
        </button>
      )
    )}

    <button
      type="button"
      aria-label="Next page"
      disabled={currentPage >= totalPages}
      onClick={(): void => handleChange(currentPage + 1)}
      className={cn(itemBase, 'text-content hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40')}
    >
      <ChevronRight size={20} />
    </button>
  </nav>
);

export default PaginationCatalog;
