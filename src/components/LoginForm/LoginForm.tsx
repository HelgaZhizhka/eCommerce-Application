import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { validate } from '../../utils/validate/sigIn';
import ShowValidate from '../ShowValidate/ShowValidate';
import { FieldInput } from '../RegistrationForm/Registration.interface';
import { userStore } from '../../stores';

import { LoginFormValues } from './LoginForm.interface';
import styles from './LoginForm.module.scss';

export type Message = {
  [key: string]: boolean;
};

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<Message>({});
  const [messagePassword, setMessagePassword] = useState<Message>({});
  const [inputStartedEmail, setInputStartedEmail] = useState(false);
  const [inputStartedPassword, setInputStartedPassword] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const updateMessage = (type: FieldInput, key: string, value: boolean): void => {
    let setter: React.Dispatch<React.SetStateAction<Message>> | null = null;

    switch (type) {
      case 'email':
        setter = setMessage;
        break;
      case 'password':
        setter = setMessagePassword;
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

  const areAllValuesFalse = (obj: Record<string, boolean>): boolean =>
    Object.values(obj).every((value) => value === false);

  useEffect(() => {
    if (areAllValuesFalse(message) && areAllValuesFalse(messagePassword)) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [message, messagePassword]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>, submitting: boolean, callback: () => void): void => {
    if (event.key === 'Enter' && !submitting && allFieldsValid) {
      callback();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values): Partial<LoginFormValues> => validate(values, updateMessage)}
      onSubmit={(values, { setSubmitting }): void => {
        userStore.login(values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }): JSX.Element => (
        <Form>
          <div className={styles.inputContainer}>
            <Field
              component={FormikTextField}
              name="email"
              type="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="email" />}
              onFocus={(): void => setInputStartedEmail(true)}
            />
            {inputStartedEmail && <ShowValidate validate={message} />}
          </div>

          <div className={styles.inputContainer}>
            <Field
              component={FormikTextField}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              variant="standard"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="password" />}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onFocus={(): void => setInputStartedPassword(true)}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void =>
                handleKeyPress(event, isSubmitting, submitForm)
              }
            />
            {inputStartedPassword && <ShowValidate validate={messagePassword} />}
          </div>

          <div className={styles.btnLogin}>
            <Button
              disabled={isSubmitting || !allFieldsValid}
              variant="contained"
              color="primary"
              fullWidth
              onClick={submitForm}
            >
              Sign in
            </Button>
          </div>

          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <div className={styles.text}>or</div>
          </div>

          <Link to="/registration">
            <Button variant="outlined" fullWidth color="primary">
              Sign up
            </Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
