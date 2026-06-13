import { z } from 'zod';

import {
  citySchema,
  countrySchema,
  dateOfBirthSchema,
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
  postalCodeFor,
  streetSchema,
} from './fields';

// ── Login ───────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginValues = z.infer<typeof loginSchema>;

// ── Registration: window 1 (credentials) ─────────────────────────────────────
export const credentialsSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    checkPassword: z.string().min(1, 'Password is required'),
  })
  .refine((v) => v.password === v.checkPassword, {
    path: ['checkPassword'],
    message: 'Passwords must match',
  });
export type CredentialsValues = z.infer<typeof credentialsSchema>;

// ── Registration: window 2 (personal) ────────────────────────────────────────
export const personalSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  date: dateOfBirthSchema,
});
export type PersonalValues = z.infer<typeof personalSchema>;

// ── Registration: window 3 (addresses) ───────────────────────────────────────
export const addressesSchema = z
  .object({
    streetShipping: streetSchema,
    cityShipping: citySchema,
    countryShipping: countrySchema,
    postalCodeShipping: z.string().min(1, 'Postal code is required'),
    // billing fields are required only when the billing form is shown
    // (superRefine below); the form always supplies '' so they're never undefined
    streetBilling: z.string(),
    cityBilling: z.string(),
    countryBilling: z.string(),
    postalCodeBilling: z.string(),
    checkedShippingDefault: z.boolean(),
    checkedAddBillingForm: z.boolean(),
    checkedBillingDefault: z.boolean(),
  })
  .superRefine((v, ctx) => {
    const check = (countryCode: string, postal: string, field: string): void => {
      const result = postalCodeFor(countryCode).safeParse(postal);
      if (!result.success) {
        ctx.addIssue({ code: 'custom', path: [field], message: result.error.issues[0]!.message });
      }
    };
    check(v.countryShipping, v.postalCodeShipping, 'postalCodeShipping');

    // billing form is shown only when "use shipping for billing" is unchecked
    if (!v.checkedAddBillingForm) {
      if (!v.streetBilling) ctx.addIssue({ code: 'custom', path: ['streetBilling'], message: 'Street is required' });
      if (!v.cityBilling) ctx.addIssue({ code: 'custom', path: ['cityBilling'], message: 'City is required' });
      if (!v.countryBilling) ctx.addIssue({ code: 'custom', path: ['countryBilling'], message: 'Country is required' });
      check(v.countryBilling, v.postalCodeBilling, 'postalCodeBilling');
    }
  });
export type AddressesValues = z.infer<typeof addressesSchema>;

// ── Profile: personal info ────────────────────────────────────────────────────
export const profilePersonalSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  dateOfBirth: dateOfBirthSchema,
});
export type ProfilePersonalValues = z.infer<typeof profilePersonalSchema>;

// ── Profile: a single address ─────────────────────────────────────────────────
export const addressSchema = z
  .object({
    street: streetSchema,
    city: citySchema,
    country: countrySchema,
    postalCode: z.string().min(1, 'Postal code is required'),
  })
  .superRefine((v, ctx) => {
    const result = postalCodeFor(v.country).safeParse(v.postalCode);
    if (!result.success) {
      ctx.addIssue({ code: 'custom', path: ['postalCode'], message: result.error.issues[0]!.message });
    }
  });
export type AddressValues = z.infer<typeof addressSchema>;

const postalCheck = (v: { country: string; postalCode: string }, ctx: z.RefinementCtx): void => {
  const result = postalCodeFor(v.country).safeParse(v.postalCode);
  if (!result.success) {
    ctx.addIssue({ code: 'custom', path: ['postalCode'], message: result.error.issues[0]!.message });
  }
};

// Profile "add address" form (address-kind select + default checkbox)
export const addressAddSchema = z
  .object({
    address: z.string().min(1, 'Address is required'),
    street: streetSchema,
    city: citySchema,
    country: countrySchema,
    postalCode: z.string().min(1, 'Postal code is required'),
    checkBox: z.boolean(),
  })
  .superRefine(postalCheck);
export type AddressAddValues = z.infer<typeof addressAddSchema>;

// Profile "edit existing address" form (name/id carried as metadata)
export const profileAddressSchema = z
  .object({
    name: z.string(),
    id: z.string(),
    street: streetSchema,
    city: citySchema,
    country: countrySchema,
    postalCode: z.string().min(1, 'Postal code is required'),
    checkBox: z.boolean(),
  })
  .superRefine(postalCheck);
export type ProfileAddressValues = z.infer<typeof profileAddressSchema>;

// ── Profile: password change ──────────────────────────────────────────────────
export const passwordChangeSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    repeatNewPassword: z.string().min(1, 'Password is required'),
  })
  .refine((v) => v.newPassword === v.repeatNewPassword, {
    path: ['repeatNewPassword'],
    message: 'Passwords must match',
  });
export type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;
