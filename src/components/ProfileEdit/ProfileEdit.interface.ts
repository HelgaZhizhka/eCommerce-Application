export interface IProfileEdit {
  firstName: string;
  lastName: string;
  date: string;

  streetShipping: string;
  cityShipping: string;
  postalCodeShipping: string;
  countryShipping: string;
  checkedShippingDefault: boolean;

  streetBilling: string;
  cityBilling: string;
  postalCodeBilling: string;
  countryBilling: string;
  checkedBillingDefault: boolean; 
}