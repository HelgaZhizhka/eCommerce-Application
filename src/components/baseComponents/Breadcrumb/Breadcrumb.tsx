import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';

import { RoutePaths } from '../../../routes/routes.enum';
import styles from './Breadcrumb.module.scss';

type Props = {
  className?: string;
};

const Breadcrumb: React.FC<Props> = ({ className }) => (
  <div className={`${styles.root} ${className}`} role="presentation">
    <Breadcrumbs aria-label="breadcrumb">
      <Link className={styles.link} to={RoutePaths.MAIN}>
        Home
      </Link>
      <Link className={styles.link} to={RoutePaths.MAIN}>
        Category
      </Link>
      <Link className={styles.link} to={RoutePaths.MAIN} aria-current="page">
        Product
      </Link>
    </Breadcrumbs>
  </div>
);

export default Breadcrumb;
