import { FieldInputthird, RegistrationFormValuesThird} from '../../components/RegistrationForm/registration.interface';

type UpdateMessageFunction = (type: FieldInputthird, key: string, value: boolean) => void;

const streetShippingValid = 'Street name is required';
const cityShippingValidRequired = 'Street name is required';
const cityShippingValid = 'City: Must contain at least one character and no special characters or numbers';
const codeShippingValid = 'Postal code name is required';
const codeShippingValidDigits = 'Postal code must be 5 digits for your country';

export const validate = (
  values: RegistrationFormValuesThird,
  updateMessage: UpdateMessageFunction
): Partial<RegistrationFormValuesThird> => {
  const errors: Partial<RegistrationFormValuesThird> = {};

  if (!values.streetShipping) {
    updateMessage('streetShipping', streetShippingValid, true);
  } else {
    updateMessage('streetShipping', streetShippingValid, false);
  }

  const validateCity = (value: string): string | undefined => {
    if (!/[а-яА-Яa-zA-ZёЁ]/.test(value)) {
      return 'City must contain at least one letter.';
    }
  
    if (/[^а-яА-Яa-zA-ZёЁ\s-]/.test(value)) {
      return 'City can only contain letters, spaces, hyphens, and the letter "ё".';
    }
  
    return undefined;
  };

  if (!values.cityShipping) {
    updateMessage('cityShipping', cityShippingValidRequired, true);
  } else {
    const cityError = validateCity(values.cityShipping);
    if (cityError) {
      updateMessage('cityShipping', cityShippingValid, true);
      updateMessage('cityShipping', cityShippingValidRequired, false);
      
    } else {
      updateMessage('cityShipping', cityShippingValid, false);
      updateMessage('cityShipping', cityShippingValidRequired, false);
    }
  }


  if (!values.postalCodeShipping) {
    updateMessage('postalCodeShipping', codeShippingValid, true);
  } else {
    updateMessage('postalCodeShipping', codeShippingValid, false);
  }

  if (!/^\d{5}$/.test(values.postalCodeShipping)) {
    updateMessage('postalCodeShipping', codeShippingValidDigits, true);
  }  else {
      updateMessage('postalCodeShipping', codeShippingValidDigits, false);
    }

  return errors;
};
