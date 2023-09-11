import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { Cart } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { MyCartUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { apiwithAnonymousSessionFlow, apiwithExistingTokenFlow } from './BuildClient';

export const createCart = async (): Promise<ClientResponse<Cart>> => {
  const existingToken = localStorage.getItem('token');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  const body =  {
      "currency" : "EUR"
  }

  const response = await customer.me().carts().post({body}).execute()

  return response;
}

export const getActiveCart = async (customer: ByProjectKeyRequestBuilder): Promise<ClientResponse<Cart>> => {
  const activeCart = await customer.me().activeCart().get().execute();

  return activeCart
}

export const addItemToCart = async (productId: string, variantId?: number): Promise<ClientResponse<Cart>> => {

  const existingToken = localStorage.getItem('token');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  const hasCart = localStorage.getItem('cart');

  if ((hasCart === 'false') || !hasCart) {
    await createCart();
    localStorage.setItem('cart', 'true');
  }


  const activeCart = await getActiveCart(customer);

  const cartId = activeCart.body.id;
  const { version } = activeCart.body;

  const body: MyCartUpdate = {
    version,
    actions: [
      {
        action: `addLineItem`,
        productId,
        variantId
      }
    ]
  }

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).post({body}).execute();

  return response
}