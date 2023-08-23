export enum RoutePaths {
  MAIN = '/',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  ABOUT = 'about',
  PROFILE = 'profile',
  CATEGORY = ':category',
  PRODUCT = ':category/:id',
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
