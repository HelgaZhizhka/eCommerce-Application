import { validate as signInValidate } from '../utils/validate/sigIn';
import { validate as signUpValidate } from '../utils/validate/signUp';
import { LoginFormValues } from '../components/LoginForm/LoginForm.interface';
import { RegistrationFormValues } from '../components/RegistrationForm/Registration.interface';

// Characterization tests (phase 0) for the two validators that had ZERO
// coverage (the legacy SignInValidate/SignUpValidate test files actually
// test thirdWindow address validation). Pins current behavior, bugs included,
// before the react-hook-form + zod rewrite (phase 4).

type Flags = Record<string, Record<string, boolean>>;

const collectFlags = (run: (cb: (field: string, msg: string, val: boolean) => void) => void): Flags => {
  const flags: Flags = {};
  run((field, msg, val) => {
    flags[field] = { ...flags[field], [msg]: val };
  });
  return flags;
};

const failing = (flags: Flags, field: string): string[] =>
  Object.entries(flags[field] ?? {})
    .filter(([, v]) => v)
    .map(([msg]) => msg);

const signIn = (values: Partial<LoginFormValues>): Flags =>
  collectFlags((cb) => signInValidate(values as LoginFormValues, cb as never));

const signUp = (values: Partial<RegistrationFormValues>): Flags =>
  collectFlags((cb) => signUpValidate(values as RegistrationFormValues, cb as never));

describe('sigIn validate (characterization)', () => {
  it('QUIRK: always returns an empty errors object — Formik never sees errors', () => {
    expect(signInValidate({ email: '', password: '' }, vi.fn())).toEqual({});
    expect(signInValidate({ email: 'a@b.com', password: 'Abcd1234' }, vi.fn())).toEqual({});
  });

  it('passes a valid email and password with no failing rules', () => {
    const flags = signIn({ email: 'user+alias@mail.com', password: 'Abcd1234' });

    expect(failing(flags, 'email')).toEqual([]);
    expect(failing(flags, 'password')).toEqual([]);
  });

  it('flags all email rules for an empty email', () => {
    const flags = signIn({ email: '', password: 'Abcd1234' });

    expect(failing(flags, 'email')).toEqual([
      'Email is required',
      'Invalid email address',
      'Email cannot start or end with a space.',
    ]);
  });

  it('rejects malformed emails', () => {
    expect(failing(signIn({ email: 'user@host', password: 'Abcd1234' }), 'email')).toContain('Invalid email address');
    expect(failing(signIn({ email: ' a@b.com', password: 'Abcd1234' }), 'email')).toContain(
      'Email cannot start or end with a space.'
    );
  });

  it('flags password rules independently', () => {
    const flags = signIn({ email: 'a@b.com', password: 'abcdefgh' });

    expect(failing(flags, 'password')).toEqual([
      'Password must contain at least one uppercase letter (A-Z).',
      'Password must contain at least one digit (0-9).',
    ]);
  });

  it('flags short passwords', () => {
    expect(failing(signIn({ email: 'a@b.com', password: 'Ab1' }), 'password')).toContain(
      'Password must be at least 8 characters long.'
    );
  });

  // TODO(refactor): bug pinned intentionally — fix in phase 4 (zod schemas)
  it('BUG: a single-character password is reported as a leading/trailing-space problem', () => {
    const flags = signIn({ email: 'a@b.com', password: 'A' });

    expect(failing(flags, 'password')).toContain('Password cannot start or end with a space.');
  });
});

describe('signUp validate (characterization)', () => {
  it('is sigIn plus the checkPassword rules', () => {
    const flags = signUp({ email: 'a@b.com', password: 'Abcd1234', checkPassword: 'Abcd1234' });

    expect(failing(flags, 'email')).toEqual([]);
    expect(failing(flags, 'password')).toEqual([]);
    expect(failing(flags, 'checkPassword')).toEqual([]);
  });

  it('flags a missing or mismatching password confirmation', () => {
    expect(failing(signUp({ email: 'a@b.com', password: 'Abcd1234', checkPassword: '' }), 'checkPassword')).toEqual([
      'Password is required',
      'Passwords must match',
    ]);

    expect(
      failing(signUp({ email: 'a@b.com', password: 'Abcd1234', checkPassword: 'Abcd1235' }), 'checkPassword')
    ).toEqual(['Passwords must match']);
  });
});
