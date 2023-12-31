import { LoginFormValues } from '../../components/LoginForm/LoginForm.interface';
import { RegistrationFormValues, FieldInput } from '../../components/RegistrationForm/Registration.interface';

type UpdateMessageFunction = (type: FieldInput, key: string, value: boolean) => void;

const emailRequired = 'Email is required';
const emailInvalid = 'Invalid email address';
const emailSpace = 'Email cannot start or end with a space.';

const passwordRequired = 'Password is required';
const passwordLong = 'Password must be at least 8 characters long.';
const passwordUpperCase = 'Password must contain at least one uppercase letter (A-Z).';
const passwordLowerCase = 'Password must contain at least one lowercase letter (a-z).';
const passwordNumber = 'Password must contain at least one digit (0-9).';
const passwordSpace = 'Password cannot start or end with a space.';

const differentCheckPassword = 'Passwords must match';

export const validate = (
  values: RegistrationFormValues,
  updateMessage: UpdateMessageFunction
): Partial<RegistrationFormValues> => {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    updateMessage('email', emailRequired, true);
  } else {
    updateMessage('email', emailRequired, false);
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    updateMessage('email', emailInvalid, true);
  } else {
    updateMessage('email', emailInvalid, false);
  }

  if (!/^\S.*\S$/.test(values.email)) {
    updateMessage('email', emailSpace, true);
  } else {
    updateMessage('email', emailSpace, false);
  }

  if (!values.password) {
    updateMessage('password', passwordRequired, true);
  } else {
    updateMessage('password', passwordRequired, false);
  }
  if (values.password.length < 8) {
    updateMessage('password', passwordLong, true);
  } else {
    updateMessage('password', passwordLong, false);
  }
  if (!/(?=.*[A-Z])/.test(values.password)) {
    updateMessage('password', passwordUpperCase, true);
  } else {
    updateMessage('password', passwordUpperCase, false);
  }
  if (!/(?=.*[a-z])/.test(values.password)) {
    updateMessage('password', passwordLowerCase, true);
  } else {
    updateMessage('password', passwordLowerCase, false);
  }
  if (!/(?=.*[0-9])/.test(values.password)) {
    updateMessage('password', passwordNumber, true);
  } else {
    updateMessage('password', passwordNumber, false);
  }
  if (!/^\S.*\S$/.test(values.password)) {
    updateMessage('password', passwordSpace, true);
  } else {
    updateMessage('password', passwordSpace, false);
  }

  if (!values.checkPassword) {
    updateMessage('checkPassword', passwordRequired, true);
  } else {
    updateMessage('checkPassword', passwordRequired, false);
  }
  if (values.checkPassword !== values.password) {
    updateMessage('checkPassword', differentCheckPassword, true);
  } else {
    updateMessage('checkPassword', differentCheckPassword, false);
  }

  return errors;
};
