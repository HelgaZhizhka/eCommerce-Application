import { Check } from 'lucide-react';

import { ColorOptions } from './FilterColor.enum';

type Props = {
  className?: string;
  selected: string[];
  onChange: (updated: string[]) => void;
};

const colorEntries = Object.entries(ColorOptions);

const FilterColorCheckBox: React.FC<Props> = ({ selected, onChange }) => {
  const toggleOptions = (color: string): void => {
    onChange(selected.includes(color) ? selected.filter((c) => c !== color) : [...selected, color]);
  };

  return (
    <>
      <h3>Color</h3>
      <div className="flex flex-wrap gap-2">
        {colorEntries.map(([colorName, colorValue]) => {
          const isMulti = colorValue === 'multicolor';
          const isSelected = selected.includes(colorName);

          return (
            <button
              key={colorName}
              type="button"
              aria-label={colorName}
              aria-pressed={isSelected}
              onClick={(): void => toggleOptions(colorName)}
              style={{
                backgroundColor: isMulti ? undefined : colorValue,
                backgroundImage: isMulti ? 'var(--multicolor)' : undefined,
              }}
              className="flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border border-gray"
            >
              {isSelected && (
                <Check size={20} className={colorValue === 'var(--filter-black)' ? 'text-white' : 'text-black'} />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default FilterColorCheckBox;
