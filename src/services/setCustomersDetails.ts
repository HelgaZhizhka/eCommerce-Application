import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { MyCustomerUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { apiWithPasswordFlow, apiwithExistingTokenFlow } from './BuildClient';

const getCustomerInfo = async (customer: ByProjectKeyRequestBuilder): Promise<Customer> => {
  const response = await customer.me().get().execute();
  return response.body;
};

const setDefaultShippingAddress = async (customer: ByProjectKeyRequestBuilder, version: number, id?: string): Promise<ClientResponse<Customer>> => {
  let response;
  if (!id) {
    response = await customer.me().post({
      body: {
        version: +`${version}`,
        actions: [
          {
            action: 'setDefaultShippingAddress',
          }
        ],
      }
     }).execute()

  } else {
    response = await customer
      .me()
      .post({
        body: {
          version: +`${version}`,
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }

   return response

}

const setDefaultBillingAddress = async (customer: ByProjectKeyRequestBuilder, version: number, id?: string): Promise<ClientResponse<Customer>> => {
  let response;
  if (!id) {
    response = await customer.me().post({
    body: {
      version: +`${version}`,
      actions: [
        {
          action: 'setDefaultBillingAddress',
        }
      ],
    }
   }).execute()
  } else {
    response = await customer
      .me()
      .post({
        body: {
          version: +`${version}`,
          actions: [
            {
              action: 'setDefaultBillingAddress',
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }


   return response

}

const addBillingAddressId = async (customer: ByProjectKeyRequestBuilder, version: number, id: string): Promise<ClientResponse<Customer>> => {
  const response = await customer.me().post({
    body: {
      version: +`${version}`,
      actions: [
        {
          action: 'addBillingAddressId',
          addressId: `${id}`
        }
      ],
    }
   }).execute()

   return response

}

const addShippingAddressId = async (customer: ByProjectKeyRequestBuilder, version: number, id: string): Promise<ClientResponse<Customer>> => {
  const response = await customer.me().post({
    body: {
      version: +`${version}`,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId: `${id}`
        }
      ],
    }
   }).execute()

   return response

}

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

  const customer = apiwithExistingTokenFlow();

  const customerProfile = await customer.me().get().execute();

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

export const changeAddress = async (newAddress: Record<string, string | boolean | number>): Promise<ClientResponse<Customer>> => {
  const customer = apiwithExistingTokenFlow();

  const {city, country, postalCode, streetName, id, version, checkBox, name} = newAddress;

  const body: MyCustomerUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: 'changeAddress',
        addressId: `${id}`,
        address: {
          streetName: `${streetName}`,
          postalCode: `${postalCode}`,
          city: `${city}`,
          country: `${country}`,
        }
      }
    ],
  };

  const response = await customer.me().post({ body }).execute();

  const newVersion = response.body.version;

  let newResponce;

  const adressid = id as string | undefined;

  if (name === 'Billing') newResponce = checkBox ? await setDefaultBillingAddress(customer, newVersion, adressid) : await setDefaultBillingAddress(customer, newVersion)
  if (name === 'Shipping') newResponce = checkBox ? await setDefaultShippingAddress(customer, newVersion, adressid) : await setDefaultShippingAddress(customer, newVersion)

  return newResponce as ClientResponse<Customer>
}


export const addAddress = async (newAddress: Record<string, string | boolean | number>): Promise<ClientResponse<Customer>> => {
  const customer = apiwithExistingTokenFlow();

  let response: ClientResponse<Customer> | undefined;

  const {address, checkBox, city, country, postalCode, street, version} = newAddress;

  const body: MyCustomerUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName: `${street}`,
          postalCode: `${postalCode}`,
          city: `${city}`,
          country: `${country}`,
        }
      }
    ],
  };

  const responseAddAddress = await customer.me().post({ body }).execute()

  const id = responseAddAddress.body.addresses.at(-1)?.id as string;
  const newVersion = responseAddAddress.body.version


  if (address === "Shipping") {
    if (checkBox) {
      response = await setDefaultShippingAddress(customer, newVersion, id)
    } else {
      response = await addShippingAddressId(customer, newVersion, id)
    }
  }

  if (address === "Billing") {
    if (checkBox) {
      response = await setDefaultBillingAddress(customer, newVersion, id)
    } else {
      response = await addBillingAddressId(customer, newVersion, id)
    }
  }

  return response as ClientResponse<Customer>;
}

export const updatePesonalData = async (userInfo: Record<string, string>): Promise<ClientResponse<Customer>> => {

  const { firstName, lastName, dateOfBirth, version } = userInfo;

  const customer = apiwithExistingTokenFlow();

  const body: MyCustomerUpdate = {
    version: +`${version}`,
    actions: [
      {
        "action": "setFirstName",
        firstName
      },
      {
        "action": "setLastName",
        lastName
      },
      {
        "action": "setDateOfBirth",
        dateOfBirth
      }
    ],
  };

  const response = await customer.me().post({ body }).execute();

  return response;
}