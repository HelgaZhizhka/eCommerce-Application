export enum RoutePaths {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ABOUT = '/about',
  SALE = '/sale',
  PROFILE = '/profile',
  CATEGORY = '/category/:categoryId/:subcategoryId?',
  PRODUCT = '/product/:categoryId/:subcategoryId?/:productId',
  CART = 'cart',
  ERROR = '*',
}
