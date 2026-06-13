// Per-field rule lists for the live pass/fail checklist UX (replaces the
// updateMessage/ShowValidate machinery). Each rule renders as a line that is
// green when `test` passes and red when it fails. RHF + zod do the gating;
// these are presentation only.

export type Rule = { message: string; test: (value: string) => boolean };

const trimmed = (v: string): boolean => v === v.trim();

export const emailRules: Rule[] = [
  { message: 'Email is required', test: (v) => v.length > 0 },
  { message: 'Email cannot start or end with a space.', test: trimmed },
  { message: 'Invalid email address', test: (v) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) },
];

export const passwordRules: Rule[] = [
  { message: 'Password is required', test: (v) => v.length > 0 },
  { message: 'Password must be at least 8 characters long.', test: (v) => v.length >= 8 },
  { message: 'Password must contain at least one uppercase letter (A-Z).', test: (v) => /[A-Z]/.test(v) },
  { message: 'Password must contain at least one lowercase letter (a-z).', test: (v) => /[a-z]/.test(v) },
  { message: 'Password must contain at least one digit (0-9).', test: (v) => /[0-9]/.test(v) },
  { message: 'Password cannot start or end with a space.', test: trimmed },
];
