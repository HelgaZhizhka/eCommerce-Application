import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Categories, RoutePaths } from '../../routes/routes.enum';

type CatalogParams = {
  category: string;
};

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();

  if (!category || !Object.values(Categories).includes(category as Categories)) {
    return <Navigate to={RoutePaths.ERROR} replace />;
  }

  return (
    <Container maxWidth="xl">
      <h2>Category {category}</h2>
    </Container>
  );
};

export default Catalog;
