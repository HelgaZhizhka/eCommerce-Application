import { FieldInputSecond, RegistrationFormValuesSecond } from '../components/RegistrationForm/Registration.interface';
import { validate } from '../utils/validate/secondWindow';

type UpdateMessageFunction = (type: FieldInputSecond, key: string, value: boolean) => void;

describe('Validation Tests', () => {
  let mockUpdateMessage: UpdateMessageFunction;

  beforeEach(() => {
    mockUpdateMessage = jest.fn();
  });

  it('should validate the firstName correctly', () => {
    const values = { firstName: '', lastName: '', date: '' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('firstName', 'First name is required', true);
  });
  it('should validate the firstName correctly', () => {
    const values = { firstName: 'Vl@dislav', lastName: '', date: '' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith(
      'firstName',
      'The name must not contain special characters or numbers.',
      true
    );
  });

  it('should correctly check lastName confirmation', () => {
    const values = { firstName: '', lastName: '', date: '' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('lastName', 'Last name is required', true);
  });
  it('should correctly check lastName confirmation', () => {
    const values = { firstName: '', lastName: 'Tyschenk0', date: '' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith(
      'lastName',
      'The last name must not contain special characters or numbers.',
      true
    );
  });

  it('should correctly check date confirmation', () => {
    const values = { firstName: '', lastName: '', date: '01-01-2020' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('date', 'You are too young.', true);
  });
  it('should correctly check date confirmation', () => {
    const values = { firstName: '', lastName: '', date: '01-01-1800' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('date', 'You are too old.', true);
  });
  it('should correctly check date confirmation', () => {
    const values = { firstName: '', lastName: '', date: '01-01-2028' } as RegistrationFormValuesSecond;
    validate(values, mockUpdateMessage);
    expect(mockUpdateMessage).toHaveBeenCalledWith('date', "You weren't born yet.", true);
  });
});
