import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';

import { BreadcrumbsItem } from './Breadcrumbs.type';
import styles from './Breadcrumbs.module.scss';

type Props = {
  className?: string;
  items: BreadcrumbsItem[];
};

const Breadcrumb: React.FC<Props> = ({ items, className }) => (
  <div className={`${styles.root} ${className}`} role="presentation">
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link
          key={index}
          className={styles.link}
          to={item.path || '#'}
          aria-current={index === items.length - 1 ? 'page' : undefined}
        >
          {item.text}
        </Link>
      ))}
    </Breadcrumbs>
  </div>
);

export default Breadcrumb;
