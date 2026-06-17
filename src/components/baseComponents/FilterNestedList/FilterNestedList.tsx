import { useState } from 'react';
import { ChevronDown, ChevronUp, Inbox } from 'lucide-react';

import { Categories } from '../../Categories';

const FilterNestedList: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <nav aria-labelledby="nested-list" className="border-b border-black">
      <button
        type="button"
        onClick={(): void => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-4 py-2 text-left transition-colors hover:bg-black/5"
      >
        <Inbox size={24} className="shrink-0" />
        <span className="grow">Category</span>
        {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {open && (
        <div>
          <Categories theme={'dark'} variant={'filter'} />
        </div>
      )}
    </nav>
  );
};

export default FilterNestedList;
