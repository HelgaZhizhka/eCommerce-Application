import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

import { cartApi, sessionApi } from './ctClient';

// Thin typed cart functions. Optimistic-concurrency data (id/version) comes
// from the caller's cached Cart object — nothing lives in localStorage.

export const getActiveCart = async (): Promise<Cart | null> => {
  try {
    const response = await sessionApi.me().activeCart().get().execute();
    return response.body;
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;
    if (status === 404) return null;
    throw error;
  }
};

export const createCart = async (): Promise<Cart> => {
  const response = await cartApi
    .me()
    .carts()
    .post({ body: { currency: 'EUR' } })
    .execute();
  return response.body;
};

export const updateCart = async (cart: Cart, actions: MyCartUpdateAction[]): Promise<Cart> => {
  const response = await cartApi
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({ body: { version: cart.version, actions } })
    .execute();
  return response.body;
};

export const deleteCart = async (cart: Cart): Promise<void> => {
  await sessionApi
    .me()
    .carts()
    .withId({ ID: cart.id })
    .delete({ queryArgs: { version: cart.version } })
    .execute();
};
