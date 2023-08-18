import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

type CatalogParams = {
  category: string;
};

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();

  return (
    <Container maxWidth="xl">
      <h2>Category {category}</h2>
    </Container>
  );
};

export default Catalog;
