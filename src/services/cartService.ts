import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { MyCartUpdate } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { apiwithAnonymousSessionFlow, apiwithExistingTokenFlow } from './BuildClient';

export const createCart = async (): Promise<ClientResponse<Cart>> => {
  const existingToken = localStorage.getItem('token');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  const body =  {
      "currency" : "EUR"
  }

  const response = await customer.me().carts().post({body}).execute();
  const { anonymousId, version, id } = response.body;

  localStorage.setItem('cartAnonymousId', `${anonymousId}`);
  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${id}`);

  return response;
}

export const getActiveCart = async (customer: ByProjectKeyRequestBuilder): Promise<ClientResponse<Cart>> => {
  const activeCart = await customer.me().activeCart().get().execute();
  const { anonymousId, version, id } = activeCart.body;

  localStorage.setItem('cartAnonymousId', `${anonymousId}`);
  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${id}`);

  return activeCart
}

export const getCarts = async (customer: ByProjectKeyRequestBuilder): Promise<ClientResponse<CartPagedQueryResponse>> => {
  const cart = await customer.me().carts().get().execute();
  return cart;
}

export const addItemToCart = async (productId: string, variantId?: number): Promise<ClientResponse<Cart>> => {

  const existingToken = localStorage.getItem('token');
  let cartId = localStorage.getItem('cartId');
  let version = localStorage.getItem('cartVersion');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  if (!cartId) {
    await createCart();
    cartId = localStorage.getItem('cartId');
    version = localStorage.getItem('cartVersion');
  }

  // const activeCart = await getActiveCart(customer);
  // const cartId = activeCart.body.id;
  // const { version } = activeCart.body;

  const body: MyCartUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: `addLineItem`,
        productId,
        variantId
      }
    ]
  }

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).post({body}).execute();

  cartId = response.body.id;
  version = `${response.body.version}`;

  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${cartId}`);

  return response
}