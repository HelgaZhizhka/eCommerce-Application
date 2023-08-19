export enum RoutePaths {
  MAIN = '/',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  ABOUT = 'about',
  PROFILE = 'profile',
  CATALOG = 'catalog/:category',
  PRODUCT = 'product/:id',
  CART = 'cart',
  ERROR = '*',
}

export enum Categories {
  SALES = 'sales',
  CLOTHES = 'clothes',
  DRINKWARE = 'drinkware',
  OFFICE = 'office',
  BAGS = 'bags'
}
