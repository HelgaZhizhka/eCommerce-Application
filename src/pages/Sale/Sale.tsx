import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { lightTheme } from '../../theme';
import fon1 from './images/sale1.jpg';
import fon1Mob from './images/sale1_mob.jpg';
import fon2 from './images/sale2.jpg';
import fon2Mob from './images/sale2_mob.jpg';

import styles from './Sale.module.scss';

const Sale: React.FC = () => (
  <Container maxWidth="xl">
    <div className={styles.container}>
      <h2 className={styles.title}>Actual Sales this month</h2>
      <Link to="/category/clothes/t-shirts">
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon1Mob} />
          <img className={styles.fon} src={fon1} alt="T-Shirt sale" />
        </picture>
      </Link>
      <Link to="/category/drinkware">
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon2Mob} />
          <img className={styles.fon} src={fon2} alt="Drinkware sale" />
        </picture>
      </Link>
    </div>
  </Container>
);

export default Sale;
