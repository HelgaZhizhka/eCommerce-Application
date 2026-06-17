import { Link } from 'react-router-dom';
import { Coffee, NotebookPen, Shirt, ShoppingBag, TrendingDown, type LucideIcon } from 'lucide-react';

import { cn } from '../../shared/lib/cn';
import { useCategoriesQuery } from '../../queries/categories';
import { SubCategories } from '../SubCategories';
import { SIZE, THEME, VARIANT, CategorySlug } from './Categories.types';
import { RoutePaths } from '../../routes/routes.enum';
import salesImg from './images/sales.png';
import clothImg from './images/cloth.png';
import drinkwareImg from './images/drinkware.png';
import officeImg from './images/office.png';
import bagsImg from './images/bags.png';

type Props = {
  size?: SIZE;
  variant?: VARIANT;
  theme?: THEME;
  className?: string;
  onClose?: () => void;
};

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  sale: TrendingDown,
  clothes: Shirt,
  drinkware: Coffee,
  office: NotebookPen,
  bags: ShoppingBag,
};

// rounded variant: per-category circle (bg image + colour + hover glow)
const roundedStyles: Record<CategorySlug, { img: string; bg: string; glow: string }> = {
  sale: { img: salesImg, bg: 'var(--red)', glow: 'hover:[filter:drop-shadow(0px_0px_16px_rgba(246,23,23,0.8))]' },
  clothes: {
    img: clothImg,
    bg: 'var(--orange)',
    glow: 'hover:[filter:drop-shadow(0px_0px_16px_rgba(255,152,67,0.8))]',
  },
  drinkware: {
    img: drinkwareImg,
    bg: 'var(--purple)',
    glow: 'hover:[filter:drop-shadow(0px_0px_16px_rgba(182,45,211,0.8))]',
  },
  office: { img: officeImg, bg: 'var(--green)', glow: 'hover:[filter:drop-shadow(0px_0px_16px_rgba(0,148,68,0.8))]' },
  bags: { img: bagsImg, bg: 'var(--blue)', glow: 'hover:[filter:drop-shadow(0px_0px_16px_rgba(62,23,255,0.8))]' },
};

const sizeFont: Record<SIZE, string> = {
  s: 'text-base',
  m: 'text-xl',
  l: 'text-2xl',
};

const themeLink: Record<THEME, string> = {
  light:
    'text-[var(--nav-color-light)] after:bg-[var(--nav-color-light-hover)] hover:text-[var(--nav-color-light-hover)]',
  dark: 'text-[var(--nav-color-dark)] after:bg-[var(--nav-color-dark-hover)] hover:text-[var(--nav-color-dark-hover)]',
};

const Categories: React.FC<Props> = ({ className, size = 'm', variant = 'vertical', theme = 'light', onClose }) => {
  const { data: categories = [] } = useCategoriesQuery();

  const enhancedCategories = [
    {
      id: 'saleId',
      slug: { en: 'sale' },
      name: { en: 'Sale' },
      subcategories: [],
    },
    ...categories,
  ];

  const ulClass = cn(
    'm-0 list-none p-0',
    variant === 'horizontal' && 'flex items-center',
    variant === 'rounded' && 'mb-[50px]',
    className
  );

  const liClass = cn(
    'select-none',
    variant === 'horizontal' && 'mr-[60px]',
    (variant === 'vertical' || variant === 'mobile') && 'mb-2 block'
  );

  return (
    <ul className={ulClass}>
      {enhancedCategories.map((category) => {
        const slug = category.slug.en as CategorySlug;
        const isSale = slug === 'sale';
        const IconComponent = categoryIcons[slug];
        const rounded = roundedStyles[slug];

        const linkClass =
          variant === 'rounded'
            ? cn(
                'relative mb-5 flex h-[95px] w-[95px] cursor-pointer flex-col rounded-full bg-center bg-no-repeat px-[5px] text-center text-base',
                'transition-[filter] duration-[350ms] ease-[cubic-bezier(0.5,0,0.5,1)]',
                isSale ? 'bg-[length:95px_95px] sm:bg-[length:160px_160px]' : 'bg-[length:50%] sm:bg-auto',
                'sm:h-[160px] sm:w-[160px] sm:text-2xl',
                isSale
                  ? 'text-red'
                  : theme === 'dark'
                    ? 'text-[var(--nav-color-dark)]'
                    : 'text-[var(--nav-color-light)]',
                rounded?.glow
              )
            : cn('link', sizeFont[size], isSale ? 'text-red after:bg-red hover:text-red' : themeLink[theme]);

        return (
          <li key={category.id} className={liClass}>
            {variant === 'filter' ? (
              <>
                <Link
                  className="flex items-center gap-3 py-2 pl-8 transition-colors hover:bg-black/5"
                  to={isSale ? RoutePaths.SALE : `/category/${slug}`}
                  onClick={onClose}
                >
                  {IconComponent && <IconComponent />}
                  <span>{category.name.en}</span>
                </Link>

                {category.subcategories && category.subcategories.length > 0 && (
                  <SubCategories className="bg-panel" subcategories={category.subcategories} categoryId={slug} />
                )}
              </>
            ) : (
              <>
                <Link
                  className={linkClass}
                  style={
                    variant === 'rounded'
                      ? { backgroundImage: `url(${rounded?.img})`, backgroundColor: rounded?.bg }
                      : undefined
                  }
                  to={isSale ? RoutePaths.SALE : `/category/${slug}`}
                  onClick={onClose ? (): void => onClose() : undefined}
                >
                  <span
                    className={
                      variant === 'rounded'
                        ? 'absolute bottom-[-25%] left-1/2 mt-auto -translate-x-1/2 pt-[110%]'
                        : undefined
                    }
                  >
                    {category.name.en}
                  </span>
                </Link>

                {variant === 'mobile' && category.subcategories && category.subcategories.length > 0 && (
                  <SubCategories
                    subcategories={category.subcategories}
                    categoryId={slug}
                    onClose={onClose ? (): void => onClose() : undefined}
                  />
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
