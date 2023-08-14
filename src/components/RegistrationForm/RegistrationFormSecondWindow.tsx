import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import classNames from 'classnames';

import { validate } from '../../utils/validate/secondWindow';
import { Data } from '../../pages/Registration/Registration.interface';
import { Message, RegistrationFormValuesSecond, FieldInputSecond } from './Registration.interface';
import styles from './Registration.module.scss';
import ShowRegistrationValidate from './ShowRegistrationValidate';

const initialValues: RegistrationFormValuesSecond = {
  firstName: '',
  lastName: '',
  date: '',
};

interface LoginProps {
  userData: {
    setWindowPge: React.Dispatch<React.SetStateAction<number>>;
    setData: React.Dispatch<React.SetStateAction<Data>>;
  };
}

const RegistrationFormSecondWindow: React.FC<LoginProps> = ({ userData }) => {
  const { setData, setWindowPge } = userData;
  const [firstNameMessage, setFirstNameMessage] = useState<Message>({});
  const [lastNameMessage, setLastNameMessage] = useState<Message>({});
  const [dateMessage, setdateMessage] = useState<Message>({});
  const [inputStartedEmail, setInputStartedEmail] = useState(false);
  const [inputStartedPassword, setInputStartedPassword] = useState(false);
  const [inputStartedCheckPassword, setInputStartedCheckPassword] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const updateMessage = (type: FieldInputSecond, key: string, value: boolean): void => {
    let setter: React.Dispatch<React.SetStateAction<Message>> | null = null;

    switch (type) {
      case 'firstName':
        setter = setFirstNameMessage;
        break;
      case 'lastName':
        setter = setLastNameMessage;
        break;
      case 'date':
        setter = setdateMessage;
        break;

      default:
        break;
    }
    if (setter) {
      setter((prevMessage) => ({
        ...prevMessage,
        [key]: value,
      }));
    }
  };

  const areAllValuesFalse = (obj: Record<string, boolean>): boolean => {
    if (Object.keys(obj).length === 0) {
      return false;
    }
    return Object.values(obj).every((value) => value === false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValuesSecond> => {
          const errors = validate(values, updateMessage);
          setAllFieldsValid(
            areAllValuesFalse(firstNameMessage) && areAllValuesFalse(lastNameMessage) && areAllValuesFalse(dateMessage)
          );
          return errors;
        }}
        onSubmit={(values, { setSubmitting }): void => {
          setData((prevData) => ({
            ...prevData,
            ...values,
          }));
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }): JSX.Element => (
          <Form>
            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                name="firstName"
                type="text"
                label="First name"
                variant="standard"
                fullWidth
                onFocus={(): void => setInputStartedEmail(true)}
              />
              {inputStartedEmail && <ShowRegistrationValidate validate={firstNameMessage} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type="text"
                label="Last name"
                name="lastName"
                variant="standard"
                fullWidth
                margin="normal"
                onFocus={(): void => setInputStartedPassword(true)}
              />

              {inputStartedPassword && <ShowRegistrationValidate validate={lastNameMessage} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type="date"
                name="date"
                variant="standard"
                fullWidth
                margin="normal"
                onFocus={(): void => setInputStartedCheckPassword(true)}
                inputProps={{
                  maxLength: 4,
                }}
              />

              {inputStartedCheckPassword && <ShowRegistrationValidate validate={dateMessage} />}
            </div>

            <div className={classNames(styles.progressContainer)}>
              <div className={classNames(styles.progress)}></div>
              <div className={classNames(styles.progress, styles.progressActive)}></div>
              <div className={classNames(styles.progress)}></div>
            </div>

            <div className={classNames(styles.btnLogin)}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !allFieldsValid}
                onClick={(): void => {
                  submitForm();
                  setWindowPge((prev) => prev + 1);
                }}
              >
                Continue
              </Button>
            </div>
            <Button
              sx={{ fontSize: '1rem' }}
              variant="outlined"
              fullWidth
              color="primary"
              onClick={(): void => {
                setWindowPge((prev) => prev - 1);
              }}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationFormSecondWindow;
