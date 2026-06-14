import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

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

const Filter: React.FC<Props> = ({ className, ...controls }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* desktop sidebar */}
      <aside className={cn('hidden max-w-[350px] bg-component p-4 md:block', className)}>
        <FilterControls {...controls} />
      </aside>

      {/* mobile trigger */}
      <button type="button" aria-label="filter" onClick={(): void => setOpen(true)} className="md:hidden">
        <FilterListIcon />
      </button>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[1000] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={(): void => setOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 left-0 w-[85vw] max-w-sm overflow-y-auto bg-page p-4 shadow-xl">
            <button
              type="button"
              aria-label="close"
              onClick={(): void => setOpen(false)}
              className="absolute right-2 top-2 text-gray"
            >
              <CloseIcon />
            </button>
            <FilterControls {...controls} mobile />
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
