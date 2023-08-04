import { API_AUTH_URL, API_SCOPE, API_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY } from './utils/constans';

function App(): JSX.Element {
  console.log(PROJECT_KEY, CLIENT_ID, CLIENT_SECRET, API_URL, API_AUTH_URL, API_SCOPE);
  return <div className="App">Init</div>;
}

export default App;
