import { AddressesValues, CredentialsValues, PersonalValues } from '../../schemas/forms';

// Typed accumulator for the registration wizard. Lives in the Registration
// page's local state — never in a global store, so the password stays in
// form scope (plan §4.4).
export type WizardData = Partial<CredentialsValues & PersonalValues & AddressesValues>;

export type StepProps<T> = {
  defaultValues: Partial<T>;
  onSubmit: (values: T) => void;
  onBack?: () => void;
};
