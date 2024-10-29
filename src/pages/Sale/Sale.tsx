import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { lightTheme } from '../../theme';
import fon1 from './images/sale1.jpg';
import fon1Mob from './images/sale1_mob.jpg';
import fon2 from './images/sale2.jpg';
import fon2Mob from './images/sale2_mob.jpg';

import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { GiftsAndPromoCodes } from '../../components/GiftsAndPromoCodes';
import styles from './Sale.module.scss';

const Sale: React.FC = () => {
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Sale', path: `${RoutePaths.SALE}` },
  ];

  return (
    <Container maxWidth="xl">
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
        <h2 className={styles.title}>Prime Monthly Deals & Discounts</h2>
        <p>
          Discover our curated collection of IT-themed merchandise this month. Dive into exclusive discounts on t-shirts
          and mugs featuring unique prints. Whether you&apos;re a coding aficionado or a tech enthusiast, our
          limited-time offers are tailored just for you. Don&apos;t miss out – elevate your tech style today
        </p>
        <Link to="/category/clothes/t-shirts">
          <picture>
            <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon1Mob} />
            <img className={styles.fon} src={fon1} alt="T-Shirt sale" />
          </picture>
        </Link>
        <Link to="/category/drinkware/mugs">
          <picture>
            <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon2Mob} />
            <img className={styles.fon} src={fon2} alt="Drinkware sale" />
          </picture>
        </Link>
        <GiftsAndPromoCodes />
      </div>
    </Container>
  );
};

export default Sale;
