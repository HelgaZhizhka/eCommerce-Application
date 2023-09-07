import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { cartStore } from '../../stores';

const Cart: React.FC = () => {
  const { productsInCart, totalAmount } = cartStore;
  return (
    <Container maxWidth="xl">
      <h2>Cart page</h2>
      <ul>
        {productsInCart.map((product) => {
          const { key, productName, description } = product;
          return (
            <li key={key}>
              <div>
                <h4>{productName}</h4>
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            </li>
          );
        })}
      </ul>
      <div>{totalAmount}</div>
    </Container>
  );
};

export default observer(Cart);
