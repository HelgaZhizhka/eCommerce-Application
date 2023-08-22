import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Categories, RoutePaths } from '../../routes/routes.enum';
import { Filter } from '../../components/Filter';

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
      <Filter />
      <h2>Category {category}</h2>
    </Container>
  );
};

export default Catalog;
