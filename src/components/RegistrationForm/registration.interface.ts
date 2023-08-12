export interface RegistrationFormValues {
  email: string;
  password: string;
  checkPassword: string,
}

export type Message = {
  [key: string]: boolean;
};

export type FieldInput = 'email' | 'password' | 'checkPassword' | 'address';
