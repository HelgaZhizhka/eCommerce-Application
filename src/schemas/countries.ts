// ISO 3166-1 alpha-2 countries with their postal-code rules.
// Replaces the legacy hardcoded `^\d{5}$` and the invalid "EU" option that
// commercetools rejects as a country code (plan §4.1).

export type Country = {
  code: string;
  label: string;
  postalPattern: RegExp;
  postalHint: string;
};

export const countries: Country[] = [
  { code: 'UA', label: 'Ukraine', postalPattern: /^\d{5}$/, postalHint: '5 digits' },
  { code: 'DE', label: 'Germany', postalPattern: /^\d{5}$/, postalHint: '5 digits' },
  { code: 'US', label: 'United States', postalPattern: /^\d{5}(-\d{4})?$/, postalHint: '5 digits (or ZIP+4)' },
  {
    code: 'GB',
    label: 'United Kingdom',
    postalPattern: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    postalHint: 'e.g. SW1A 1AA',
  },
  { code: 'PL', label: 'Poland', postalPattern: /^\d{2}-\d{3}$/, postalHint: 'NN-NNN' },
];

export const countryByCode = (code: string): Country | undefined => countries.find((c) => c.code === code);
