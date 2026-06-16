import { Link } from 'react-router-dom';

import { ExtendedCategory } from '../../stores/ProductStore.interfaces';
import { cn } from '../../shared/lib/cn';

type Props = {
  categoryId: string;
  subcategories: ExtendedCategory[];
  onClose?: () => void;
  className?: string;
};

const SubCategories: React.FC<Props> = ({ categoryId, subcategories, onClose, className }) => (
  <ul className={cn('m-0 flex list-none flex-wrap gap-[15px] rounded p-2.5', className)}>
    {subcategories.map((subCategory) => (
      <li key={subCategory.id}>
        <Link
          className="text-inherit transition-colors hover:text-gray"
          to={`/category/${categoryId}/${subCategory.slug.en}`}
          onClick={onClose ? (): void => onClose() : undefined}
        >
          {subCategory.name.en}
        </Link>
      </li>
    ))}
  </ul>
);

export default SubCategories;
