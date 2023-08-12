import {apiRoot} from './Client'
import envConfig from '../constants/index';

interface LoginResponse {
  status?: number;
  data: object;
  error?: Error;
}

const clientSecret = envConfig.CLIENT_SECRET_CLIENT;
const clientID = envConfig.CLIENT_ID_CLIENT;
const encodedCredentials = btoa(`${clientID}:${clientSecret}`);
const authHeader = `Basic ${encodedCredentials}`;

// const customerLogin = (email: string, password: string): Promise<LoginResponse> => apiRoot
//   .login()
//   .post(
//     {
//       body: {
//         email,
//         password,
//       },
//     })
//   .execute()
//   .then((response) => {
//     const status = response.statusCode;
//     const responseData = response.body;
//     return { status, data: responseData};
//   })
//   .catch((err: Error) => {
//     throw err;
//   });

const customerLogin = (email: string, password: string) => apiRoot
  .me()
  .login()
  .post(
    {
      body: {
        email,
        password,
    }
  }
  )
  .execute()
  .then((response) => {
        const status = response.statusCode;
        const responseData = response.body;
        console.log(responseData)
        return { status, data: responseData};
      })


const getCustomerToken = async (email: string, password: string): Promise<JSON> => {
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

const loginStatus = async (email: string, password: string):Promise<void> => {
  const response = await customerLogin(email, password);
  console.log(response);

  if (response.status === 200) {
    await getCustomerToken(email, password)

    await apiRoot.me().get().execute()
    console.log(apiRoot)
    alert('Login successful');
  } else if (response.status === 400) {
    alert('statusCode": 400, Customer account with the given credentials not found.');
  } else {
    console.log(response.status)
    alert(`Unexpected response status: ${response.status}`);
  }
}

export default loginStatus

