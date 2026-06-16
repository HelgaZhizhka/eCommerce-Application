import { Link } from 'react-router-dom';

import { cn } from '../../shared/lib/cn';

type Props = {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  onClose?: () => void;
};

const InfoPanel: React.FC<Props> = ({ className, variant = 'horizontal', onClose }) => (
  <span
    className={cn(
      'relative block',
      variant === 'horizontal' && 'flex items-center',
      variant === 'vertical' && 'mx-auto w-4/5 border-t border-primary pt-8 text-center text-xl',
      className
    )}
  >
    <span className={cn('badge badge_sm badge_primary', variant === 'horizontal' ? 'mr-2.5' : 'mx-auto mb-2.5')}>
      %
    </span>
    Discount on all t-shirts{' '}
    <Link to="/category/clothes/t-shirts" className="text-brand" onClick={onClose ? (): void => onClose() : undefined}>
      T-Shirts
    </Link>{' '}
    this month!
  </span>
);

export default InfoPanel;
