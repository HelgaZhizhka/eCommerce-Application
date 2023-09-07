import * as yup from 'yup';

export const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email format'),
  dateOfBirth: yup
    .date()
    .nullable()
    .required('Birth Date is required')
    .max(new Date(), 'Birth Date cannot be in the future')
    .test('is-old-enough', 'User must be at least 15 years old', (value) => {
      const today = new Date();
      const userBirthday = new Date(value);
      const age = today.getFullYear() - userBirthday.getFullYear();
      return age >= 15;
    }),
});
