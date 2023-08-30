import { IProfileEdit } from "./ProfileEdit.interface"

export const initialValues: IProfileEdit = {
  firstName: '',
  lastName: '',
  date: '',

  streetShipping: '',
  cityShipping: '',
  postalCodeShipping: '',
  countryShipping: '',
  checkedShippingDefault: false,

  streetBilling: '',
  cityBilling: '',
  postalCodeBilling: '',
  countryBilling: '',
  checkedBillingDefault: false, 
}