import { useRouteError } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

interface ErrorData {
  statusText?: string;
  message?: string;
}

export default function ErrorPage(): JSX.Element {
  const error = useRouteError() as ErrorData;
  return (
    <div id="error-page">
      <Logo />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
