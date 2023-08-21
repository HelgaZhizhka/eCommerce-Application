import { FieldInput, RegistrationFormValues } from '../components/RegistrationForm/Registration.interface';
import { validate } from '../utils/validate/signUp';

type UpdateMessageFunction = (type: FieldInput, key: string, value: boolean) => void;

describe('Validation Tests', () => {
  let mockUpdateMessage: UpdateMessageFunction;

  beforeEach(() => {
    mockUpdateMessage = jest.fn();
  });

  it('should validate the password correctly', () => {
    const values = { password: '', checkPassword: '' } as RegistrationFormValues;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('password', 'Password is required', true);
  });

  it('should correctly check password confirmation', () => {
    const values = { password: 'Password123', checkPassword: '' } as RegistrationFormValues;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('checkPassword', 'Password is required', true);
  });
});
