import {apiRoot} from './Client'
import envConfig from '../constants/index';

interface LoginResponse {
  statusCode?: number;
  data: object;
  error?: Error;
}

const clientSecret = envConfig.CLIENT_SECRET;
const clientID = envConfig.CLIENT_ID
const encodedCredentials = btoa(`${clientID}:${clientSecret}`);
const authHeader = `Basic ${encodedCredentials}`;

const customerLogin = (email: string, password: string): Promise<any> => apiRoot
  .login()
  .post(
    {
      body: {
        email,
        password,
      },
    })
  .execute()
  .then((response) => {
    
    // Access the response status
    const status = response.statusCode;

    // You can also access other response data if needed
    const responseData = response.body;

    // Return the response status and data
    return { status, data: responseData};
  })
  .catch((err: Error) => {
    throw err;
  });

const getCustomerToken = async (email: string, password: string): Promise<any> => {
  const endpoint = `https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce-project-final-task/customers/token?grant_type=password&username=${email}&password=${password}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get customer token');
  }
  const data = await response.json();
  return data;
};

const loginStatus = async (email: string, password: string):Promise<any> => {
  const response = await customerLogin(email, password);
  console.log(response);

  if (response.status === 200) {
    await getCustomerToken(email, password)
    alert('Login successful');
  } else if (response.status === 400) {
    alert('statusCode": 400, Customer account with the given credentials not found.');
  } else {
    console.log(response.status)
    alert(`Unexpected response status: ${response.statusCode}`);
  }
}

export default loginStatus

