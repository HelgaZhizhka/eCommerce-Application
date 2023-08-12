export interface RegistrationFormValues {
  email: string;
  password: string;
  checkPassword: string,
}

export interface RegistrationFormValuesSecond {
  firstName: string;
  lastName: string;
  date: string,
}

export type Message = {
  [key: string]: boolean;
};


export type FieldInput = 'email' | 'password' | 'checkPassword';
export type FieldInputSecond = 'firstName' | 'lastName' | 'date';
