import { CircularProgress } from '@mui/material';

import { ProductType } from '../../stores/Store.types';
import { Card } from '../Card';
import { cn } from '../../shared/lib/cn';

type Props = {
  className?: string;
  categoryId: string;
  subcategoryId?: string | null;
  products: ProductType[];
  isLoading: boolean;
};

const ProductList: React.FC<Props> = ({ className, categoryId, subcategoryId, products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-10">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <ul className={cn('grid list-none gap-6 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]', className)}>
      {products.map((product) => (
        <li key={product.productKey}>
          <Card
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            productId={product.productId}
            productKey={product.productKey}
            productName={product.productName}
            description={product.description}
            images={product.images}
            price={product.price}
            priceDiscount={product.priceDiscount}
            currency={product.currency}
            variants={product.variants}
            isDiscount={product.isDiscount}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
