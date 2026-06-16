import React from 'react';
import { useParams } from 'react-router-dom';

import { useProductQuery } from '../../queries/products';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { CurrentProduct } from '../../components/CurrentProduct';
import { PageContainer } from '../../components/baseComponents/PageContainer';

type Params = {
  categoryId: string;
  subcategoryId?: string;
  productId: string;
};

const Product: React.FC = () => {
  const { categoryId, subcategoryId, productId } = useParams<Params>();
  const { data: product, isFetching } = useProductQuery(productId);

  const breadcrumbItems = [{ text: 'Home', path: RoutePaths.MAIN }];

  if (categoryId) {
    breadcrumbItems.push({ text: categoryId, path: `${RoutePaths.MAIN}category/${categoryId}` as RoutePaths });
  }

  if (productId) {
    if (subcategoryId) {
      breadcrumbItems.push(
        {
          text: subcategoryId,
          path: `${RoutePaths.MAIN}category/${categoryId}/${subcategoryId}` as RoutePaths,
        },
        {
          text: productId,
          path: `${RoutePaths.MAIN}product/${categoryId}/${subcategoryId}/${productId}` as RoutePaths,
        }
      );
    } else {
      breadcrumbItems.push({
        text: productId,
        path: `${RoutePaths.MAIN}product/${categoryId}/${productId}` as RoutePaths,
      });
    }
  }

  return (
    <PageContainer>
      <section className="pt-[50px] pb-[60px] md:px-20">
        <Breadcrumbs items={breadcrumbItems} className="mb-5" />

        <CurrentProduct product={product} isLoading={isFetching} />
      </section>
    </PageContainer>
  );
};

export default Product;
