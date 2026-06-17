import { cn } from '../../../shared/lib/cn';
import { VARIANT } from './Price.types';

type Props = {
  children?: number;
  className?: string;
  variant?: VARIANT;
  currency?: string;
};

const Price: React.FC<Props> = ({ children, currency, className, variant }) => (
  <span
    className={cn(
      'block font-medium',
      variant === 'new' && 'text-xl text-[color:var(--state-info)]',
      variant === 'old' && 'text-base text-gray line-through',
      !variant && 'text-lg text-content',
      className
    )}
  >
    <span className="mr-0.5">{children}</span>
    <span className="uppercase">{currency}</span>
  </span>
);

export default Price;
