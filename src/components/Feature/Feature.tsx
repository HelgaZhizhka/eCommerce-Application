import { lightTheme } from '../../theme';

import styles from './Feature.module.scss';

type Props = {
  className?: string;
  image: string;
  title: string;
  description: string;
};

const Features: React.FC<Props> = ({ className, image, title, description }) => (
  <div className={`${styles.root} ${className}`}>
    <div className={styles.img}>
      <picture>
        <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={image} />
        <img src={image} alt={title} />
      </picture>
    </div>
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </div>
);

export default Features;
