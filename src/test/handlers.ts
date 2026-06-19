import { http, HttpResponse } from 'msw';

import {
  cartWithItem,
  categoriesResponse,
  customerSignInResult,
  emptyCart,
  meCustomer,
  productByKeyResponse,
  productTypeResponse,
  productsListResponse,
  searchResponse,
} from './fixtures';

// Both the CT SDK (ctClient) and the handlers read the same import.meta.env, so
// the mocked host/projectKey always match the SDK's outgoing URL. Fallbacks keep
// CI green when no .env is present (see vite.config test.env).
const HOST = import.meta.env.VITE_API_URL_CLIENT ?? 'https://api.commercetools.test';
const PROJECT = import.meta.env.VITE_PROJECT_KEY_CLIENT ?? 'test-project';
export const CT = `${HOST}/${PROJECT}`;

const hourFromNow = (): number => Date.now() + 60 * 60 * 1000;
const token = (value: string) => HttpResponse.json({ token: value, expiresAt: hourFromNow() });

// Default happy-path handlers. Tests override per-case with server.use(...).
export const handlers = [
  // ---- auth BFF (/api/auth/*) ----
  http.post('/api/auth/visitor', () => token('visitor-token')),
  http.post('/api/auth/anonymous', () => token('anon-token')),
  http.post('/api/auth/refresh', () => token('refreshed-token')),
  http.post('/api/auth/login', () => token('customer-token')),
  http.post('/api/auth/logout', () => new HttpResponse(null, { status: 204 })),

  // ---- commercetools API ----
  http.get(`${CT}/categories`, () => HttpResponse.json(categoriesResponse)),
  http.get(`${CT}/products`, () => HttpResponse.json(productsListResponse)),
  http.get(`${CT}/products/:seg`, () => HttpResponse.json(productByKeyResponse)),
  http.get(`${CT}/product-projections/search`, () => HttpResponse.json(searchResponse())),
  http.get(`${CT}/product-types/:seg`, () => HttpResponse.json(productTypeResponse)),

  http.get(`${CT}/me`, () => HttpResponse.json(meCustomer)),
  http.post(`${CT}/me/login`, () => HttpResponse.json(customerSignInResult(), { status: 200 })),
  http.post(`${CT}/me/signup`, () => HttpResponse.json(customerSignInResult(), { status: 201 })),

  http.get(`${CT}/me/active-cart`, () => HttpResponse.json(cartWithItem)),
  http.post(`${CT}/me/carts`, () => HttpResponse.json(emptyCart, { status: 201 })),
  http.post(`${CT}/me/carts/:id`, () => HttpResponse.json(cartWithItem)),
  http.delete(`${CT}/me/carts/:id`, () => HttpResponse.json(cartWithItem)),
];
