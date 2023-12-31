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
  const { version, id } = response.body;

  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${id}`);

  return response;
}

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => {
  const customer = apiwithExistingTokenFlow();
  const activeCart = await customer.me().activeCart().get().execute();
  const { version, id } = activeCart.body;

  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${id}`);

  return activeCart
}

export const getCarts = async (customer: ByProjectKeyRequestBuilder): Promise<ClientResponse<CartPagedQueryResponse>> => {
  const cart = await customer.me().carts().get().execute();
  return cart;
}

export const addItemToCart = async (productId: string, quantity?: number, variantId?: number): Promise<ClientResponse<Cart>> => {

  const existingToken = localStorage.getItem('token');
  let cartId = localStorage.getItem('cartId');
  let version = localStorage.getItem('cartVersion');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  if (!cartId) {
    await createCart();
    cartId = localStorage.getItem('cartId');
    version = localStorage.getItem('cartVersion');
  }

  const body: MyCartUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: `addLineItem`,
        productId,
        variantId,
        quantity
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

export const setLineItemQuantity = async (lineItemId: string, quantity = 0): Promise<ClientResponse<Cart>> => {

  let cartId = localStorage.getItem('cartId');
  let version = localStorage.getItem('cartVersion');

  const customer = apiwithExistingTokenFlow();

  const body: MyCartUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: `changeLineItemQuantity`,
        lineItemId,
        quantity
      }
    ]
  }

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).post({body}).execute();

  cartId = response.body.id;
  version = `${response.body.version}`;

  localStorage.setItem('cartVersion', `${version}`);
  localStorage.setItem('cartId', `${cartId}`);

  return response;
}

export const deleteCart = async (): Promise<ClientResponse<Cart>> => {
  const customer = apiwithExistingTokenFlow();

  const cartId = localStorage.getItem('cartId');
  const version = localStorage.getItem('cartVersion');

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).delete({ queryArgs: {version: +`${version}`}}).execute();

  localStorage.removeItem('cartId');
  localStorage.removeItem('cartVersion');

  return response;
}

export const addPromoCode = async (code: string): Promise<ClientResponse<Cart>> => {

  const existingToken = localStorage.getItem('token');
  const cartId = localStorage.getItem('cartId');
  let version = localStorage.getItem('cartVersion');

  const customer = existingToken ? apiwithExistingTokenFlow() : apiwithAnonymousSessionFlow();

  const body: MyCartUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: "addDiscountCode",
        code
      }
    ]
  }

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).post({body}).execute();

  version = `${response.body.version}`;

  localStorage.setItem('cartVersion', `${version}`);

  return response
}

export const removePromoCode = async (promoCodeId: string): Promise<ClientResponse<Cart>> => {
  const cartId = localStorage.getItem('cartId');
  let version = localStorage.getItem('cartVersion');

  const customer = apiwithExistingTokenFlow();

  const body: MyCartUpdate = {
    version: +`${version}`,
    actions: [
      {
        action: "removeDiscountCode",
        discountCode: {
          typeId: "discount-code",
          id: `${promoCodeId}`
        }
      }
    ]
  }

  const response = await customer.me().carts().withId({ ID: `${cartId}`}).post({body}).execute();

  version = `${response.body.version}`;

  localStorage.setItem('cartVersion', `${version}`);

  return response

}
