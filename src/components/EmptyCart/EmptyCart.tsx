import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import racon from './images/imgEmptyCart.png';
import styles from './EmptyCart.module.scss';

const EmptyCart: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <img src={racon} alt="racon" />
    <h2 className={styles.title}>Hey,</h2>
    <h2 className={styles.title}>The cart feels light !</h2>
    <h4 className={styles.title}>Explore products and add your favorite items</h4>
    <Link to="/category/clothes/t-shirts">
      <Button sx={{ fontSize: '24px', width: '340px', m: '34px' }} variant="contained">
        Explore
      </Button>
    </Link>
  </Box>
);

export default EmptyCart;
