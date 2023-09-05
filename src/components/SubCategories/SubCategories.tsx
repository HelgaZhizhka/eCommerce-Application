import { Link } from 'react-router-dom';

import { ExtendedCategory } from '../../stores/ProductStore.interfaces';
import styles from './SubCategories.module.scss';

type Props = {
  categoryId: string;
  subcategories: ExtendedCategory[];
  onClose?: () => void;
  className?: string;
};

const SubCategories: React.FC<Props> = ({ categoryId, subcategories, onClose, className }) => (
  <ul className={`${styles.root} ${className}`}>
    {subcategories.map((subCategory) => (
      <li className={styles.item} key={subCategory.id}>
        <Link
          className={styles.link}
          to={`/category/${categoryId}/${subCategory.slug.en}`}
          color="inherit"
          onClick={onClose ? (): void => onClose() : undefined}
        >
          {subCategory.name.en}
        </Link>
      </li>
    ))}
  </ul>
);

export default SubCategories;
