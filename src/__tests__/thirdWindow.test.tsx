import { act } from 'react-dom/test-utils'; // Импорт act из react-dom/test-utils
import { FieldInputthird, RegistrationFormValuesThird } from '../components/RegistrationForm/Registration.interface';
import { validate } from '../utils/validate/thirdWindow';

type UpdateMessageFunction = (type: FieldInputthird, key: string, value: boolean) => void;

describe('Validation Tests', () => {
  let mockUpdateMessage: UpdateMessageFunction;

  beforeEach(() => {
    mockUpdateMessage = jest.fn();
  });

  it('should validate the streetShipping correctly', () => {
    const values = {
      streetShipping: '',
    } as RegistrationFormValuesThird;

    act(() => {
      validate(values, mockUpdateMessage);
    });

    expect(mockUpdateMessage).toHaveBeenCalledWith('streetShipping', 'Street name is required', true);
  });

  it('should validate the cityShipping correctly', () => {
    const values = {
      cityShipping: '',
    } as RegistrationFormValuesThird;

    act(() => {
      validate(values, mockUpdateMessage);
    });

    expect(mockUpdateMessage).toHaveBeenCalledWith('cityShipping', 'Street name is required', true);
  });

  it('should validate the cityShipping correctly', () => {
    const values = {
      cityShipping: '@merica',
    } as RegistrationFormValuesThird;

    act(() => {
      validate(values, mockUpdateMessage);
    });

    expect(mockUpdateMessage).toHaveBeenCalledWith(
      'cityShipping',
      'City: Must contain at least one character and no special characters or numbers',
      true
    );
  });

  it('should validate the postalCodeShipping and postalCodeBilling correctly', () => {
    const values = {
      postalCodeShipping: '',
      postalCodeBilling: '',
    } as RegistrationFormValuesThird;

    act(() => {
      validate(values, mockUpdateMessage);
    });

    expect(mockUpdateMessage).toHaveBeenCalledWith('postalCodeBilling', 'Postal code name is required', true);
    expect(mockUpdateMessage).toHaveBeenCalledWith('postalCodeShipping', 'Postal code name is required', true);
  });

  it('should validate the postalCodeShipping and postalCodeBilling correctly', () => {
    const values = {
      postalCodeShipping: '1111',
      postalCodeBilling: '2222',
    } as RegistrationFormValuesThird;

    act(() => {
      validate(values, mockUpdateMessage);
    });

    expect(mockUpdateMessage).toHaveBeenCalledWith(
      'postalCodeBilling',
      'Postal code must be 5 digits for your country',
      true
    );
    expect(mockUpdateMessage).toHaveBeenCalledWith(
      'postalCodeShipping',
      'Postal code must be 5 digits for your country',
      true
    );
  });
});
