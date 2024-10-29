import * as yup from 'yup';

export const validationSchema = yup.object({
  street: yup
    .string()
    .required('Street is required'),
    city: yup
    .string()
    .required('City is required'),
    postalCode: yup
    .string()
    .required('Postal Code is required')
    .matches(/^\d{5}$/, 'Postal Code must be exactly 5 digits'),
});

