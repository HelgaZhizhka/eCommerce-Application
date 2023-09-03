import * as yup from 'yup';

export const validationSchema = yup.object({
  street: yup
    .string()
    .required('Street is required'),
    city: yup
    .string()
    .required('City is required'),
    postalCode: yup
    .number()
    .required('Postal Code is required')
    .test('is-five-digits', 'Postal Code must be exactly 5 digits', (value: number) => {
      if (value) {
        const postalCode = value.toString();
        return postalCode.length === 5;
      }
      return true;
    }),
});
