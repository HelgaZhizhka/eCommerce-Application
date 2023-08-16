import styles from './InfoPanel.module.scss';

type Props = {
  className?: string;
  variant?: 'horizontal' | 'vertical';
};

const InfoPanel: React.FC<Props> = ({ className, variant = 'horizontal' }) => (
  <span className={`${styles.root} ${styles[variant]} ${className}`}>
    <span className={`badge badge_sm badge_primary ${styles.badge}`}>%</span>
    Free shipping on everything <span className="text-brand">DrinkWare</span> this month!
  </span>
);

export default InfoPanel;
