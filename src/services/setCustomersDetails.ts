import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { Address } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

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

  const customerProfile = await customer2.me().get().execute();

  return customerProfile.body;
};


export const removeAddress = async (address: Record<string, string | boolean | number>): Promise<ClientResponse<Customer>> => {
  const customer = apiwithExistingTokenFlow();

  const body: MyCustomerUpdate = {
    version: +`${address.version}`,
    actions: [
      {
        action: 'removeAddress',
        addressId: `${address.id}`
      }
    ],
  };

  const response = await customer.me().post({ body }).execute()

  return response;
}

export const changeAddress = async (newAddress: Address & { version: number }): Promise<ClientResponse<Customer>> => {
  const customer = apiwithExistingTokenFlow();

  const {city, country, postalCode, streetName, id, version} = newAddress

  const body: MyCustomerUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: 'changeAddress',
        addressId: `${id}`,
        address: {
          "streetName": `${streetName}`,
          "postalCode": `${postalCode}`,
          "city": `${city}`,
          "country": `${country}`,
        }
      }
    ],
  };

  const response = await customer.me().post({ body }).execute()

  return response
}
