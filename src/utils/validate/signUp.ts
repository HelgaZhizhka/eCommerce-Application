import { RegistrationFormValues, FieldInput } from '../../components/RegistrationForm/registration.interface';

type UpdateMessageFunction = (type: FieldInput, key: string, value: boolean) => void;

const emailRequired = 'Email is required';
const emailInvalid = 'Invalid email address';

const passwordRequired = 'Password is required';
const passwordLong = 'Password must be at least 8 characters long.';
const passwordUpperCase = 'Password must contain at least one uppercase letter (A-Z).';
const passwordLowerCase = 'Password must contain at least one lowercase letter (a-z).';
const passwordNumber = 'Password must contain at least one digit (0-9).';
const passwordSpace = 'Password cannot start or end with a space.';

const differentCheckPassword = 'Passwords must match';

export const validate = (
  values: RegistrationFormValues,
  updateMessage: UpdateMessageFunction,
): Partial<RegistrationFormValues> => {
  let errors: Partial<RegistrationFormValues> = {};

  if (!values.email) {
    updateMessage('email', emailRequired, true);
  } else {
    updateMessage('email', emailRequired, false);
    delete errors.email;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    updateMessage('email', emailInvalid, true);
    errors.email = emailInvalid;
  } else {
    updateMessage('email', emailInvalid, false);
    delete errors.email;
  }

  if (!values.password) {
    updateMessage('password', passwordRequired, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordRequired, false);
    delete errors.password;
  }
  if (values.password.length < 8) {
    updateMessage('password', passwordLong, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordLong, false);
    delete errors.password;
  }
  if (!/(?=.*[A-Z])/.test(values.password)) {
    updateMessage('password', passwordUpperCase, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordUpperCase, false);
    delete errors.password;
  }
  if (!/(?=.*[a-z])/.test(values.password)) {
    updateMessage('password', passwordLowerCase, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordLowerCase, false);
    delete errors.password;
  }
  if (!/(?=.*[0-9])/.test(values.password)) {
    updateMessage('password', passwordNumber, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordNumber, false);
    delete errors.password;
  }
  if (!/^\S.*\S$/.test(values.password)) {
    updateMessage('password', passwordSpace, true);
    errors.password = passwordRequired;
  } else {
    updateMessage('password', passwordSpace, false);
    delete errors.password;
  }

  if (!values.checkPassword) {
    updateMessage('checkPassword', passwordRequired, true);
    errors.checkPassword = passwordRequired;
  } else {
    updateMessage('checkPassword', passwordRequired, false);
    delete errors.checkPassword;
  }
  if (values.checkPassword !== values.password) {
    updateMessage('checkPassword', differentCheckPassword, true);
    errors.checkPassword = differentCheckPassword;
  } else {
    updateMessage('checkPassword', differentCheckPassword, false);
    delete errors.checkPassword;
  }
  errors = {}
  return errors;
};
