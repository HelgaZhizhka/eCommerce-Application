import cardImg from '../components/Card/images/TShirt.png';

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

export const contacts = {
  phone: '(+380) 68 018 45 67',
  email: 'yescode@gmail.com',
};

export const cards = [
  {
    id: '1',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
  {
    id: '2',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: false,
  },
  {
    id: '3',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
  {
    id: '4',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
  {
    id: '5',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
  {
    id: '6',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: false,
  },
  {
    id: '7',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
  {
    id: '8',
    productName: 'Standart raccoon t-shirt',
    description: 'Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt',
    price: '20',
    priceDiscount: '18',
    currency: 'eur',
    cardImage: cardImg,
    isDiscount: true,
  },
];
