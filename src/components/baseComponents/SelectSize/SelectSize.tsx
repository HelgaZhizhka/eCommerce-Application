import { useEffect, useState } from 'react';

import { SizeWithVariantId } from './SelectSize.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { cn } from '../../../shared/lib/cn';

type Props = {
  options: SizeWithVariantId[];
  value: SizeWithVariantId | null;
  variant?: string;
  className?: string;
  onChange?: (value: SizeWithVariantId) => void;
};

const SelectSize: React.FC<Props> = ({ value, options, onChange, variant, className }) => {
  const [size, setSize] = useState<SizeWithVariantId | null>(value);

  useEffect(() => {
    setSize(value);
  }, [value]);

  const handleChange = (selected: string): void => {
    const selectedOption = options.find((option) => option.size === selected);

    if (selectedOption) {
      setSize(selectedOption);
      onChange?.(selectedOption);
    }
  };

  return (
    <div className={className}>
      <Select value={size?.size ?? ''} onValueChange={handleChange}>
        <SelectTrigger aria-label="Size" className={cn('select-none', variant === 'small' && 'w-20')}>
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {options.map((sizeProduct) => (
            <SelectItem key={sizeProduct.variantId} value={sizeProduct.size}>
              {sizeProduct.size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSize;
