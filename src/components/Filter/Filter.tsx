import { useEffect, useRef, useState } from 'react';
import { ListFilter, X } from 'lucide-react';

import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import { cn } from '../../shared/lib/cn';

export type FilterControlsProps = {
  isFilterSize: boolean;
  isFilterColor: boolean;
  sizes: string[];
  colors: string[];
  price: number[];
  onSizesChange: (sizes: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onPriceChange: (price: number[]) => void;
  onReset: () => void;
};

type Props = FilterControlsProps & {
  className?: string;
};

// Adaptive filter (5.3): inline sidebar on md+, slide-over drawer below md.
// The Filter/FilterMobile fork is gone — this owns both presentations.
const FilterControls: React.FC<FilterControlsProps & { mobile?: boolean }> = ({
  isFilterSize,
  isFilterColor,
  sizes,
  colors,
  price,
  onSizesChange,
  onColorsChange,
  onPriceChange,
  onReset,
  mobile,
}) => (
  <>
    {!mobile && <FilterNestedList />}
    {isFilterSize && <FilterChip selected={sizes} onChange={onSizesChange} />}
    {isFilterColor && <FilterColorCheckBox selected={colors} onChange={onColorsChange} />}
    <FilterPrice value={price} onChange={onPriceChange} />
    <FilterReset mobile={mobile} onClick={onReset} />
  </>
);

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Filter: React.FC<Props> = ({ className, ...controls }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // a11y (drawer): Esc closes; focus moves to the close button on open, is
  // trapped inside while open, and returns to the trigger on close.
  useEffect(() => {
    if (!open) return undefined;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return (): void => {
      document.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      {/* desktop sidebar */}
      <aside className={cn('hidden max-w-[350px] bg-component p-4 md:block', className)}>
        <FilterControls {...controls} />
      </aside>

      {/* mobile trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="filter"
        onClick={(): void => setOpen(true)}
        className="md:hidden"
      >
        <ListFilter />
      </button>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[1000] md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={(): void => setOpen(false)} aria-hidden />
          <div
            ref={panelRef}
            className="absolute inset-y-0 left-0 w-[85vw] max-w-sm overflow-y-auto bg-page p-4 shadow-xl"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="close"
              onClick={(): void => setOpen(false)}
              className="absolute right-2 top-2 text-gray"
            >
              <X />
            </button>
            <FilterControls {...controls} mobile />
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
