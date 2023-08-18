import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { RoutePaths } from '../../routes/routes.enum';
import styles from './ErrorPage.module.scss';
import image404 from './images/404.png';

const ErrorPage: React.FC = () => (
  <Container maxWidth="xl">
    <div className={styles.root}>
      <div className={styles.glitch} data-text="404">
        404
      </div>
      <img className={styles.banner} src={image404} alt="404 page" />

      <h2 className={styles.title}>
        <span className={styles.marked}>WHOOPS!</span> Page they are looking for could not be found.
      </h2>
      <Link to={RoutePaths.MAIN}>
        <Button sx={{ fontSize: '1.5rem' }} className={styles.button} variant="contained" color="primary">
          Back to main
        </Button>
      </Link>
    </div>
  </Container>
);
export default ErrorPage;
