import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { apiWithPasswordFlow } from './BuildClient';

const customerLogin = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
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

export default customerLogin;
