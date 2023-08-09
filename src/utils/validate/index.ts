import { LoginFormValues } from "../../pages/Login/login.interface";


export const validate = (values: LoginFormValues): Partial<LoginFormValues> => {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!/(?=.*[A-Z])/.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter (A-Z).';
  } else if (!/(?=.*[a-z])/.test(values.password)) {
    errors.password = 'Password must contain at least one lowercase letter (a-z).';
  } else if (!/(?=.*[0-9])/.test(values.password)) {
    errors.password = 'Password must contain at least one digit (0-9).';
  }
  return errors;
};