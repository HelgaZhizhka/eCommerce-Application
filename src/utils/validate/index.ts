import { LoginFormValues } from '../../components/LoginForm/login.interface';

type UpdateMessageFunction = (key: string, value: boolean) => void;

const emailRequired = 'Email is required';
const emailInvalid = 'Invalid email address';

const passwordRequired = 'Password is required';
const passwordLong = 'Password must be at least 8 characters long.';
const passwordUpperCase = 'Password must contain at least one uppercase letter (A-Z).';
const passwordLowerCase = 'Password must contain at least one lowercase letter (a-z).';
const passwordNumber = 'Password must contain at least one digit (0-9).';
const passwordSpace = 'Password cannot start or end with a space.';

export const validate = (values: LoginFormValues, updateMessage: UpdateMessageFunction, updateMessagePassword: UpdateMessageFunction): Partial<LoginFormValues> => {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    updateMessage(emailRequired, true);
  } else {
    updateMessage(emailRequired, false);
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    updateMessage(emailInvalid, true);
  } else {
    updateMessage(emailInvalid, false);
  }

  if (!values.password) {
    updateMessagePassword(passwordRequired, true);
  } else {
    updateMessagePassword(passwordRequired, false);
  } if (values.password.length < 8) {
    updateMessagePassword(passwordLong, true);
  } else {
    updateMessagePassword(passwordLong, false);
  } if (!/(?=.*[A-Z])/.test(values.password)) {
    updateMessagePassword(passwordUpperCase, true);
  } else {
    updateMessagePassword(passwordUpperCase, false);
  } if (!/(?=.*[a-z])/.test(values.password)) {
    updateMessagePassword(passwordLowerCase, true);
  } else {
    updateMessagePassword(passwordLowerCase, false);
  } if (!/(?=.*[0-9])/.test(values.password)) {
    updateMessagePassword(passwordNumber, true);
  } else {
    updateMessagePassword(passwordNumber, false);
  } if (!/^\S.*\S$/.test(values.password)) {
    updateMessagePassword(passwordSpace, true);
  } else {
    updateMessagePassword(passwordSpace, false);
  }

  return errors;
};
