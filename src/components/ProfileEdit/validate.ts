import * as yup from 'yup';

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required'),
  lastName: yup
    .string()
    .required('Last Name is required'),
  birthDate: yup
    .date()
    .nullable()
    .required('Birth Date is required')
    .max(new Date(), 'Birth Date cannot be in the future')
    .test(
      'is-old-enough',
      'User must be at least 15 years old',
      (value) => {
        const today = new Date();
        const userBirthday = new Date(value);
        const age = today.getFullYear() - userBirthday.getFullYear();
        return age >= 15;
      }
    ),
  shippingStreetName: yup
    .string()
    .required('Street is required'),
  shippingCityName: yup
    .string()
    .required('City is required'),
  shippingPostalCodeName: yup
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
