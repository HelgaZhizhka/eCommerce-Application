import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
// import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { apiWithPasswordFlow, apiWithClientCredentialsFlow } from './BuildClient';

export const customerLogin = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  const customer = apiWithPasswordFlow(email, password);
  return customer
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
}

// export const customerSignUp = (body: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
export const customerSignUp = (): Promise<ClientResponse<CustomerSignInResult>> => {

  const email = 'myNewCustomer123@example.com';
  const password = 'Password123123';

  const newCustomer = apiWithClientCredentialsFlow();
  return newCustomer
  .me()
  .signup()
  .post(
    {
      body: {
        email,
        password,
      }
    }
  )
  .execute()
}
