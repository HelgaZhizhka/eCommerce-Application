import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';

import { validate } from '../../utils/validate/secondWindow';
import { Data } from '../../pages/Registration/Registration.interface';
import { ShowValidate } from '../ShowValidate';
import { Message, RegistrationFormValuesSecond, FieldInputSecond } from './Registration.interface';
import styles from './Registration.module.scss';

interface RegistrationProps {
  setWindowPage: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  userData: Record<string, string | number | boolean>;
}

const RegistrationFormSecondWindow: React.FC<RegistrationProps> = ({ setWindowPage, setData, userData }) => {
  const initialValues: RegistrationFormValuesSecond = {
    firstName: typeof userData.firstName === 'string' ? userData.firstName : '',
    lastName: typeof userData.lastName === 'string' ? userData.lastName : '',
    date: typeof userData.date === 'string' ? userData.date : '',
  };

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

  useEffect(() => {
    if (areAllValuesFalse(firstNameMessage) && areAllValuesFalse(lastNameMessage) && areAllValuesFalse(dateMessage)) {
      setAllFieldsValid(true);
    } else setAllFieldsValid(false);
  }, [firstNameMessage, lastNameMessage, dateMessage]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValuesSecond> => {
          const errors = validate(values, updateMessage);
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
            <div className={styles.inputContainer}>
              <Field
                component={FormikTextField}
                name="firstName"
                type="text"
                label="First name"
                variant="standard"
                fullWidth
                onFocus={(): void => setInputStartedEmail(true)}
              />
              {inputStartedEmail && <ShowValidate validate={firstNameMessage} />}
            </div>

            <div className={styles.inputContainer}>
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

              {inputStartedPassword && <ShowValidate validate={lastNameMessage} />}
            </div>

            <div className={styles.inputContainer}>
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

              {inputStartedCheckPassword && <ShowValidate validate={dateMessage} />}
            </div>

            <div className={styles.progressContainer}>
              <div className={styles.progress}></div>
              <div className={`${styles.progress} ${styles.progressActive}`}></div>
              <div className={styles.progress}></div>
            </div>

            <div className={styles.btnLogin}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !allFieldsValid}
                onClick={(): void => {
                  submitForm();
                  setWindowPage((prev) => prev + 1);
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
                setWindowPage((prev) => prev - 1);
              }}
            >
              Back
            </Button>
            <div className={styles.lineContainer}>
              <div className={styles.line}></div>
              <div className={styles.text}>Or already have an account?</div>
            </div>
            <Link to="/login">
              <Button sx={{ fontSize: '1.2rem' }} variant="text" fullWidth color="primary">
                Sign in
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationFormSecondWindow;
