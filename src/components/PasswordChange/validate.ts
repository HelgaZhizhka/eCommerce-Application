import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z).')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z).')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9).')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
    .trim()
    .required('Password is required'),

  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z).')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z).')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9).')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
    .trim()
    .required('Password is required'),

  repeatNewPassword: yup
    .mixed()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Password is required'),
});
