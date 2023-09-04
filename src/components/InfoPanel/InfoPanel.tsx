import { Link } from 'react-router-dom';
import styles from './InfoPanel.module.scss';

type Props = {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  onClose?: () => void;
};

const InfoPanel: React.FC<Props> = ({ className, variant = 'horizontal', onClose }) => (
  <span className={`${styles.root} ${styles[variant]} ${className}`}>
    <span className={`badge badge_sm badge_primary ${styles.badge}`}>%</span>
    Free on everything{' '}
    <Link to="/category/clothes/t-shirts" className="text-brand" onClick={onClose ? (): void => onClose() : undefined}>
      T-Shirts
    </Link>{' '}
    this month!
  </span>
);

export default InfoPanel;
