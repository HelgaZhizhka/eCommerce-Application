import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { RoutePaths } from '../../routes/routes.enum';

const ErrorPage: React.FC = () => (
  <Container maxWidth="xl">
    <h2>
      <span>WHOOPS!</span> Page they are looking for could not be found.
    </h2>
    <Link to={RoutePaths.MAIN}>
      <Button variant="contained" color="primary">
        Back to main
      </Button>
    </Link>
  </Container>
);
export default ErrorPage;
