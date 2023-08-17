import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { apiWithPasswordFlow, apiWithClientCredentialsFlow } from './BuildClient';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';

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
export const customerSignUp = (values: RegistrationFormValuesData): Promise<ClientResponse<CustomerSignInResult>> => {

  // const email = 'myNewCustomer123123@example.com';
  // const password = 'Password123123123';

  const body: MyCustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
  }

  const newCustomer = apiWithClientCredentialsFlow();
  return newCustomer
  .me()
  .signup()
  .post(
    {
      body
    }
  )
  .execute()
}
