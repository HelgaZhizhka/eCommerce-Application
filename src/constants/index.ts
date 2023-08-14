const envConfig = {
  PROJECT_KEY: process.env.REACT_APP_PROJECT_KEY,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
  API_URL: process.env.REACT_APP_API_URL,
  API_AUTH_URL: process.env.REACT_APP_AUTH_URL,
  API_SCOPES: process.env.REACT_APP_SCOPES,
  PROJECT_KEY_CLIENT: process.env.REACT_APP_PROJECT_KEY_CLIENT,
  CLIENT_ID_CLIENT: process.env.REACT_APP_CLIENT_ID_CLIENT,
  CLIENT_SECRET_CLIENT: process.env.REACT_APP_CLIENT_SECRET_CLIENT,
  API_URL_CLIENT: process.env.REACT_APP_API_URL_CLIENT,
  API_AUTH_URL_CLIENT: process.env.REACT_APP_AUTH_URL_CLIENT,
  API_SCOPE_CLIENT: process.env.REACT_APP_SCOPES_CLIENT,
};

export default envConfig;

export const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'UAH',
    label: '₴',
  },
];
