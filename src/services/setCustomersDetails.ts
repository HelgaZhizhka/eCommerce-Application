import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { apiWithPasswordFlow, apiwithExistingTokenFlow } from './BuildClient';

const getCustomerInfo = async (customer: ByProjectKeyRequestBuilder): Promise<Customer> => {
  const response = await customer.me().get().execute();
  return response.body;
};

const setAddressRequest = async (
  customer: ByProjectKeyRequestBuilder,
  customerInfo: Customer
): Promise<ClientResponse<Customer>> => {
  const body: MyCustomerUpdate = {
    version: customerInfo.version,
    actions: [
      {
        action: 'addShippingAddressId',
        addressId: `${customerInfo.addresses[0].id}`,
      },
      {
        action: 'addBillingAddressId',
        addressId: `${customerInfo.addresses[1].id}`,
      },
    ],
  };

  const response = await customer.me().post({ body }).execute();

  return response;
};

export const setAdress = async (email: string, password: string): Promise<void> => {
  const customer = apiWithPasswordFlow(email, password);
  try {
    const customerInfo = await getCustomerInfo(customer);
    await setAddressRequest(customer, customerInfo);
  } catch (error) {
    throw new Error('Error');
  }
};

export const getUser = async (): Promise<Customer | null> => {
  // const token = 'ecommerce-project-final-task:WS5N3w5JYARU3TxjFb4BtLy7eSX7JRhQyeoTY6uuUyQ';

  const customer2 = apiwithExistingTokenFlow();

  // if (localStorage.getItem('token') === undefined || '') localStorage.setItem('token', myToken.get().token);
  // console.log(myToken.get(), localStorage.getItem('token'));

  const customerProfile = await customer2.me().get().execute();

  return customerProfile.body;
};
