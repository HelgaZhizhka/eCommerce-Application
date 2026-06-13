import {
  citySchema,
  dateOfBirthSchema,
  emailSchema,
  firstNameSchema,
  passwordSchema,
  postalCodeFor,
} from '../schemas/fields';
import { credentialsSchema, loginSchema } from '../schemas/forms';

// Phase 4: these replace the phase-0 characterization tests of the legacy
// validators. They assert the CORRECT behavior now that the pinned bugs
// (single-char password, register-vs-profile email mismatch, name with
// apostrophes, hardcoded postal/country) are fixed.

const ok = (schema: { safeParse: (v: unknown) => { success: boolean } }, value: unknown): boolean =>
  schema.safeParse(value).success;

describe('emailSchema', () => {
  it('accepts + aliases and long TLDs (legacy profile regex rejected both)', () => {
    expect(ok(emailSchema, 'user+alias@mail.museum')).toBe(true);
  });
  it('rejects malformed and space-padded emails', () => {
    expect(ok(emailSchema, 'user@host')).toBe(false);
    expect(ok(emailSchema, ' a@b.com')).toBe(false);
    expect(ok(emailSchema, '')).toBe(false);
  });
});

describe('passwordSchema', () => {
  it('accepts a valid password', () => {
    expect(ok(passwordSchema, 'Abcd1234')).toBe(true);
  });
  it('FIXED: a single character fails on length, not on a phantom space rule', () => {
    const issues = passwordSchema.safeParse('A');
    expect(issues.success).toBe(false);
    if (!issues.success) {
      const messages = issues.error.issues.map((i) => i.message);
      expect(messages).toContain('Password must be at least 8 characters long.');
      expect(messages).not.toContain('Password cannot start or end with a space.');
    }
  });
});

describe('firstNameSchema', () => {
  it("FIXED: accepts hyphens and apostrophes (O'Brien, Anna-Maria)", () => {
    expect(ok(firstNameSchema, "O'Brien")).toBe(true);
    expect(ok(firstNameSchema, 'Anna-Maria')).toBe(true);
  });
  it('rejects digits and symbols', () => {
    expect(ok(firstNameSchema, 'John3')).toBe(false);
  });
});

describe('dateOfBirthSchema', () => {
  it('accepts an adult birthday and rejects the future', () => {
    expect(ok(dateOfBirthSchema, '2000-01-01')).toBe(true);
    expect(ok(dateOfBirthSchema, '2999-01-01')).toBe(false);
  });
});

describe('citySchema', () => {
  it('accepts letters/spaces/hyphens, rejects symbols', () => {
    expect(ok(citySchema, 'San-Marino')).toBe(true);
    expect(ok(citySchema, '@merica')).toBe(false);
  });
});

describe('postalCodeFor (per country)', () => {
  it('FIXED: validates against the selected country, not a hardcoded 5 digits', () => {
    expect(ok(postalCodeFor('UA'), '01001')).toBe(true);
    expect(ok(postalCodeFor('GB'), 'SW1A 1AA')).toBe(true);
    expect(ok(postalCodeFor('GB'), '01001')).toBe(false);
    expect(ok(postalCodeFor('PL'), '00-001')).toBe(true);
  });
});

describe('composite form schemas', () => {
  it('loginSchema gates on both fields', () => {
    expect(ok(loginSchema, { email: 'a@b.com', password: 'Abcd1234' })).toBe(true);
    expect(ok(loginSchema, { email: 'a@b.com', password: 'short' })).toBe(false);
  });
  it('credentialsSchema enforces password confirmation match', () => {
    expect(ok(credentialsSchema, { email: 'a@b.com', password: 'Abcd1234', checkPassword: 'Abcd1234' })).toBe(true);
    expect(ok(credentialsSchema, { email: 'a@b.com', password: 'Abcd1234', checkPassword: 'nope' })).toBe(false);
  });
});
