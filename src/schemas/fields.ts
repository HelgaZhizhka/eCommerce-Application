import { z } from 'zod';

import { countryByCode } from './countries';

// One source of truth for field-level validation (plan §4.1). Replaces the
// four copy-pasted regex sets and the register-vs-profile email mismatch.

const MIN_AGE = 13;

// single email rule everywhere — allows + aliases and TLDs longer than 4 chars,
// which the legacy profile regex wrongly rejected
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .refine((v) => v === v.trim(), 'Email cannot start or end with a space.')
  .refine((v) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v), 'Invalid email address');

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters long.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z).')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter (a-z).')
  .regex(/[0-9]/, 'Password must contain at least one digit (0-9).')
  // fixed: legacy /^\S.*\S$/ flagged any 1-char value as a space problem
  .refine((v) => v === v.trim(), 'Password cannot start or end with a space.');

// allows hyphens, apostrophes and spaces — O'Brien, Anna-Maria (legacy rejected them)
const nameRule = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .regex(
      /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u,
      `The ${label.toLowerCase()} must not contain special characters or numbers.`
    );

export const firstNameSchema = nameRule('First name');
export const lastNameSchema = nameRule('Last name');

// honest age math (legacy profile used year subtraction → off-by-one before birthday)
const ageOf = (iso: string): number => {
  const dob = new Date(iso);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
};

export const dateOfBirthSchema = z
  .string()
  .min(1, 'Fill in all fields of the form')
  .refine((v) => new Date(v) <= new Date(), "You weren't born yet.")
  .refine((v) => ageOf(v) >= MIN_AGE, `You must be at least ${MIN_AGE} years old.`);

export const citySchema = z
  .string()
  .min(1, 'City is required')
  .regex(/[\p{L}]/u, 'City must contain at least one letter.')
  .regex(/^[\p{L}\s-]+$/u, 'City can only contain letters, spaces and hyphens.');

export const streetSchema = z.string().min(1, 'Street is required');

export const countrySchema = z.string().min(1, 'Country is required');

// postal code validated against the selected country (plan §4.1)
export const postalCodeFor = (countryCode: string) =>
  z
    .string()
    .min(1, 'Postal code is required')
    .superRefine((value, ctx) => {
      const country = countryByCode(countryCode);
      if (country && !country.postalPattern.test(value)) {
        ctx.addIssue({ code: 'custom', message: `Postal code must be ${country.postalHint} for the selected country` });
      }
    });
