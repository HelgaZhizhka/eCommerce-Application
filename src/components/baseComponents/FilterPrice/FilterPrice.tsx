import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

import { initialPriceRange } from '../../../constants';

type Props = {
  className?: string;
  value: number[];
  onChange: (committed: number[]) => void;
};

const FilterPrice: React.FC<Props> = ({ value, onChange }) => {
  // local state while dragging; the URL/query updates on commit only
  const [draft, setDraft] = useState<number[]>(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div className="px-2.5">
      <div className="flex items-center justify-between">
        <h3>Price</h3>
        <div className="text-xl tracking-[0.4px] text-gray">
          EUR {draft[0]} - {draft[1]}
        </div>
      </div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none items-center select-none"
        value={draft}
        onValueChange={setDraft}
        onValueCommit={onChange}
        min={initialPriceRange.min}
        max={initialPriceRange.max}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-gray/40">
          <Slider.Range className="absolute h-full rounded-full bg-primary" />
        </Slider.Track>
        {draft.map((_, index) => (
          <Slider.Thumb
            key={index}
            aria-label={index === 0 ? 'Minimum price' : 'Maximum price'}
            className="block h-4 w-4 rounded-full bg-primary shadow outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        ))}
      </Slider.Root>
    </div>
  );
};

export default FilterPrice;
