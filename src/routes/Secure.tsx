import { Navigate } from 'react-router-dom';
import { userStore } from '../stores';
import { RoutePaths } from './routes.enum';

type Props = {
  children: React.ReactNode;
  reverse?: boolean;
};

const Secure: React.FC<Props> = ({ children, reverse }) => {
  const { loggedIn } = userStore;

  if (reverse) {
    if (loggedIn) {
      return <Navigate to={RoutePaths.MAIN} replace />;
    }
    return <>{children}</>;
  }

  if (!loggedIn) {
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default Secure;
