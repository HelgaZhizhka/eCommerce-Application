import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { apiWithClientCredentialsFlow, apiWithPasswordFlow, apiwithAnonymousSessionFlow } from './BuildClient';

export const customerLogin = async (email: string, password: string):Promise<ClientResponse<CustomerSignInResult>> => {
const newCustomer = apiwithAnonymousSessionFlow();

  const response =  newCustomer
  .me()
  .login()
  .post({
    body: {
      email,
      password,
    },
  })
  .execute();

  const customer = apiWithPasswordFlow(email, password);
  await customer.me().get().execute();

  return response
};

export const customerSignUp = (
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
    // shippingAddresses: [0],
    defaultBillingAddress:
      values.checkedBillingDefault || (values.checkedAddBillingForm && values.checkedShippingDefault) ? 1 : undefined,
    // billingAddresses: [1],
  };

  // if (values.checkedShippingDefault) requestbody.defaultShippingAddress = 0;
  // deafultbilling when Use this address for billing is checked

  const newCustomer = apiWithClientCredentialsFlow();

  const signUpCustomer = newCustomer
    .me()
    .signup()
    .post({
      body: requestbody,
    })
    .execute();

  return signUpCustomer;
};
