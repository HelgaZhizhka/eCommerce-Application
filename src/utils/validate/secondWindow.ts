import {
  RegistrationFormValuesSecond,
  FieldInputSecond,
} from '../../components/RegistrationForm/registration.interface';

type UpdateMessageFunction = (type: FieldInputSecond, key: string, value: boolean) => void;

const nameRequired = 'First name is required';
const nameValid = 'The name must not contain special characters or numbers.';
const lastNameRequired = 'Last name is required';
const lastNameValid = 'The last name must not contain special characters or numbers.';
const dateYoung = 'You are too young.';
const dateOld = 'You are too old.';

export const validate = (
  values: RegistrationFormValuesSecond,
  updateMessage: UpdateMessageFunction
): Partial<RegistrationFormValuesSecond> => {
  const errors: Partial<RegistrationFormValuesSecond> = {};

  if (!values.firstName) {
    updateMessage('firstName', nameRequired, true);
  } else {
    updateMessage('firstName', nameRequired, false);
  }
  if (/^[A-Za-zА-Яа-яЁё]+$/u.test(values.firstName)) {
    updateMessage('firstName', nameValid, false);
  } else {
    updateMessage('firstName', nameValid, true);
  }

  if (!values.lastName) {
    updateMessage('lastName', lastNameRequired, true);
  } else {
    updateMessage('lastName', lastNameRequired, false);
  }

  if (/^[A-Za-zА-Яа-яЁё]+$/u.test(values.lastName)) {
    updateMessage('lastName', lastNameValid, false);
  } else {
    updateMessage('lastName', lastNameValid, true);
  }

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }

    return age;
  };

  if (values.date) {
    const age = calculateAge(values.date);

    if (age < 13) {
      updateMessage('date', dateYoung, false);
      updateMessage('date', dateOld, true);
    } else if (age > 150) {
      updateMessage('date', dateYoung, true);
      updateMessage('date', dateOld, false);
    } else {
      updateMessage('date', dateYoung, false);
      updateMessage('date', dateOld, false);
    }
  } else {
    updateMessage('date', dateYoung, false);
    updateMessage('date', dateOld, false);
  }

  return errors;
};
