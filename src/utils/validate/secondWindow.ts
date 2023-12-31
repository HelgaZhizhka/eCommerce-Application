import {
  RegistrationFormValuesSecond,
  FieldInputSecond,
} from '../../components/RegistrationForm/Registration.interface';

type UpdateMessageFunction = (type: FieldInputSecond, key: string, value: boolean) => void;

const nameRequired = 'First name is required';
const nameValid = 'The name must not contain special characters or numbers.';
const lastNameRequired = 'Last name is required';
const lastNameValid = 'The last name must not contain special characters or numbers.';
const dateYoung = 'You are too young.';
const dateOld = 'You are too old.';
const dateBorn = "You weren't born yet.";
const dateFill = 'Fill in all fields of the form';

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
    const dateOfBirth = new Date(birthday);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = currentDate.getMonth() - dateOfBirth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dateOfBirth.getDate())) {
      return age - 1;
    }

    return age;
  };

  if (values.date) {
    const age = calculateAge(values.date);
    if (age < 0) {
      updateMessage('date', dateBorn, true);
      updateMessage('date', dateYoung, false);
      updateMessage('date', dateOld, false);
    } else if (age < 13) {
      updateMessage('date', dateYoung, true);
      updateMessage('date', dateOld, false);
      updateMessage('date', dateBorn, false);
    } else if (age > 150) {
      updateMessage('date', dateOld, true);
      updateMessage('date', dateYoung, false);
      updateMessage('date', dateBorn, false);
    } else {
      updateMessage('date', dateBorn, false);
      updateMessage('date', dateYoung, false);
      updateMessage('date', dateOld, false);
    }
  }
  if (!values.date) {
    updateMessage('date', dateFill, true);
  } else {
    updateMessage('date', dateFill, false);
  }

  return errors;
};
