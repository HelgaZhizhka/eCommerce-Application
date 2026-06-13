import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/platform-sdk';
import { apiWithPasswordFlow, cartApi, sessionApi } from './ctClient';
import { hasSession } from './session';

export const customerLogin = async (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  const newCustomer = hasSession() ? sessionApi : await apiWithPasswordFlow(email, password);

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
    await (await apiWithPasswordFlow(email, password)).me().get().execute();
  }

  return response;
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

  // me/signup needs a session-bound token; cartApi lazily creates the anonymous
  // session (and CT then merges the guest cart into the new account)
  const newCustomer = cartApi;

  const signUpCustomer = await newCustomer
    .me()
    .signup()
    .post({
      body: requestbody,
    })
    .execute();

  if (signUpCustomer.statusCode === 201) {
    await (await apiWithPasswordFlow(`${values.email}`, `${values.password}`)).me().get().execute();
  }

  return signUpCustomer;
};
