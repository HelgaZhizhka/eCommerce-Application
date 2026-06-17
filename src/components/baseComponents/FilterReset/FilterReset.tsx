import { X } from 'lucide-react';

import { cn } from '../../../shared/lib/cn';

type Props = {
  mobile?: boolean;
  onClick?: () => void;
};

const FilterReset: React.FC<Props> = ({ mobile, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'mt-4 inline-flex items-center justify-center gap-2 rounded border border-[orange] px-4 py-1.5 text-[orange] transition-colors hover:bg-[orange]/10',
      mobile ? 'w-full' : 'w-auto'
    )}
  >
    Reset filters
    <X size={18} />
  </button>
);

export default FilterReset;
