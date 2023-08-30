export enum RoutePaths {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ABOUT = '/about',
  PROFILE = '/profile',
  CATEGORY = '/category/:categoryId/:subcategoryId?',
  PRODUCT = '/product/:categoryId/:subcategoryId?/:productId',
  CART = 'cart',
  ERROR = '*',
}
