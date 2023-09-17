import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { apiWithClientCredentialsFlow, apiWithPasswordFlow, apiwithExistingTokenFlow } from './BuildClient';
import { getActiveCart } from './cartService';

export const customerLogin = async (email: string, password: string):Promise<ClientResponse<CustomerSignInResult>> => {
  const existingToken = localStorage.getItem('token');

  const newCustomer = existingToken ? apiwithExistingTokenFlow() : apiWithPasswordFlow(email, password);

  const response = await newCustomer
  .me()
  .login()
  .post({
    body: {
      email,
      password,
    },
  })
  .execute();

  if (response.statusCode === 200) {
    await apiWithPasswordFlow(email, password).me().get().execute();
    await getActiveCart();
  };

  return response
};

export const customerSignUp = async (
  values: Record<string, string | number | boolean>
): Promise<ClientResponse<CustomerSignInResult>> => {
  const shippingAddress = {
    firstName: `${values.firstName}`,
    lastName: `${values.lastName}`,
    country: `${values.countryShipping}`,
    streetName: `${values.streetShipping}`,
    postalCode: `${values.postalCodeShipping}`,
    city: `${values.cityShipping}`,
    email: `${values.email}`,
  };

  let billingAddress;

  if (values.checkedAddBillingForm) {
    billingAddress = shippingAddress;
  } else {
    billingAddress = {
      firstName: `${values.firstName}`,
      lastName: `${values.lastName}`,
      country: `${values.countryBilling}`,
      streetName: `${values.streetBilling}`,
      postalCode: `${values.postalCodeBilling}`,
      city: `${values.cityBilling}`,
      email: `${values.email}`,
    };
  }

  const requestbody: MyCustomerDraft = {
    email: `${values.email}`,
    password: `${values.password}`,
    firstName: `${values.firstName}`,
    lastName: `${values.lastName}`,
    dateOfBirth: `${values.date}`,
    addresses: [shippingAddress, billingAddress],
    defaultShippingAddress: values.checkedShippingDefault ? 0 : undefined,
    defaultBillingAddress:
      values.checkedBillingDefault || (values.checkedAddBillingForm && values.checkedShippingDefault) ? 1 : undefined,
  };

  const existingToken = localStorage.getItem('token');

  const newCustomer = existingToken ? apiwithExistingTokenFlow() : apiWithClientCredentialsFlow();

  const signUpCustomer = newCustomer
    .me()
    .signup()
    .post({
      body: requestbody,
    })
    .execute();

  await getActiveCart();

  return signUpCustomer;
};
