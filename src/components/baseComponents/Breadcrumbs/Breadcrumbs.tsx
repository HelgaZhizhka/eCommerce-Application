import { Link } from 'react-router-dom';

import { BreadcrumbsItem } from './Breadcrumbs.type';
import styles from './Breadcrumbs.module.scss';

type Props = {
  items: BreadcrumbsItem[];
  className?: string;
};

const Breadcrumb: React.FC<Props> = ({ items, className }) => (
  <nav className={`${styles.root} ${className}`} aria-label="breadcrumb">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-gray" aria-hidden>
              /
            </span>
          )}
          <Link
            className={styles.link}
            to={item.path || '#'}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
