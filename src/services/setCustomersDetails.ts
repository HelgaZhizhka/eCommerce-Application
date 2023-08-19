import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { Customer } from "@commercetools/platform-sdk/dist/declarations/src/generated/models/customer";
import { MyCustomerUpdateAction } from "@commercetools/platform-sdk/dist/declarations/src/generated/models/me";
import { ClientResponse } from "@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types";
import { apiWithPasswordFlow } from "./BuildClient";


const getCustomerInfo = async (customer: ByProjectKeyRequestBuilder): Promise<Customer> => {
  const response = await customer.me().get().execute();
  return response.body;
}

const setAddressRequest = async (customer: ByProjectKeyRequestBuilder, customerInfo: Customer): Promise<ClientResponse<Customer>> => {

  type Body = {
    version: number,
    actions: MyCustomerUpdateAction[]
  }

  const body: Body = {
    "version": customerInfo.version,
    "actions": [{
      "action": "addShippingAddressId",
      "addressId": `${customerInfo.addresses[0].id}`
    },
    {
      "action": "addBillingAddressId",
      "addressId": `${customerInfo.addresses[1].id}`
    }]
  }

  const response = await customer
    .me()
    .post({ body })
    .execute();

  return response;
}

const setAdress = async (email: string, password: string): Promise<void> => {
  const customer = apiWithPasswordFlow(email, password);
  try {
    const customerInfo = await getCustomerInfo(customer)
    await setAddressRequest(customer, customerInfo)
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

export default setAdress;
