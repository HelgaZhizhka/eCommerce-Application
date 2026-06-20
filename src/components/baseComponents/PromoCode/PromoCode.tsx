import { useId, useState } from 'react';

import { promoCode } from '../../../constants';
import { cn } from '../../../shared/lib/cn';

type Props = {
  className?: string;
  onChange?: (code: string) => void;
};

const PromoCode: React.FC<Props> = ({ className, onChange }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const errorId = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
    setError(false);
  };

  const handleClick = (): void => {
    if (!code) return;

    if (code !== promoCode) {
      setError(true);
      return;
    }

    if (onChange) {
      onChange(code.trim());
      setCode('');
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        placeholder="Promo Code"
        type="text"
        value={code}
        onChange={handleChange}
        aria-label="Promo code"
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        className="appearance-none rounded-none border-0 border-b border-gray bg-transparent px-1 py-1 text-content outline-none focus:border-primary"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!code}
        className="rounded bg-primary px-4 py-1 text-white transition-colors hover:bg-orange-light disabled:opacity-50"
      >
        Ok
      </button>
      {error && (
        <span id={errorId} role="alert" className="text-red">
          Invalid promo code
        </span>
      )}
    </div>
  );
};

export default PromoCode;
