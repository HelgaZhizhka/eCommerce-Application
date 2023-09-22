export interface RegistrationFormValues {
  email: string;
  password: string;
  checkPassword: string;
}

export interface RegistrationFormValuesSecond {
  firstName: string;
  lastName: string;
  date: string;
}

export interface RegistrationFormValuesThird {
  streetShipping: string;
  cityShipping: string;
  postalCodeShipping: string;
  countryShipping: string;
  streetBilling: string;
  cityBilling: string;
  postalCodeBilling: string;
  countryBilling: string;
  checkedShippingDefault: boolean;
  checkedAddBillingForm: boolean;
  checkedBillingDefault: boolean;
}

export type RegistrationFormValuesData = RegistrationFormValuesThird &
  RegistrationFormValuesSecond &
  RegistrationFormValues;

export type Message = {
  [key: string]: boolean;
};

export type FieldInput = 'email' | 'password' | 'checkPassword';
export type FieldInputSecond = 'firstName' | 'lastName' | 'date';
export type FieldInputthird =
  | 'streetShipping'
  | 'cityShipping'
  | 'postalCodeShipping'
  | 'streetBilling'
  | 'cityBilling'
  | 'postalCodeBilling';
