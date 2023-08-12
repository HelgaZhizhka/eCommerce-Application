import {apiWithPasswordFlow} from './BuildClient';

interface LoginResponse {
  status?: number;
  data: object;
  error?: Error;
}

const customerLogin = (email: string, password: string):Promise<LoginResponse> => apiWithPasswordFlow(email, password)
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
        return { status, data: responseData};
      })

const loginStatus = async (email: string, password: string):Promise<void> => {
  const response = await customerLogin(email, password);
  console.log(response);

  if (response.status === 200) {
    alert('Login successful');
  } else if (response.status === 400) {
    alert('statusCode": 400, Customer account with the given credentials not found.');
  } else {
    alert(`Unexpected response status: ${response.status}`);
  }
}

export default loginStatus
