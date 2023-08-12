import React, { useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import classNames from 'classnames';
import { Message, RegistrationFormValues, FieldInput } from './registration.interface';
import styles from './registration.module.scss';
import ShowRegistrationValidate from './ShowRegistrationValidate';
import { validate } from '../../utils/validate/signUp';

const initialValues: RegistrationFormValues = {
  email: '',
  password: '',
  checkPassword: '',
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<Message>({});
  const [messagePassword, setMessagePassword] = useState<Message>({});
  const [messagePasswordCheck, setMessagePasswordCheck] = useState<Message>({});
  const [inputStartedEmail, setInputStartedEmail] = useState(false);
  const [inputStartedPassword, setInputStartedPassword] = useState(false);
  const [inputStartedCheckPassword, setInputStartedCheckPassword] = useState(false);

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
      case 'checkPassword':
        setter = setMessagePasswordCheck;
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValues> => validate(values, updateMessage)}
        onSubmit={(values, { setSubmitting }): void => {
          // console.log(values);
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }): JSX.Element => (
          <Form>
            <div className={classNames(styles.inputContainer)}>
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

              {inputStartedEmail && <ShowRegistrationValidate validate={message} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPassword ? 'text' : 'password'}
                label="Your password"
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
              />

              {inputStartedPassword && <ShowRegistrationValidate validate={messagePassword} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPassword ? 'text' : 'password'}
                label="Repeat password"
                name="checkPassword"
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
                onFocus={(): void => setInputStartedCheckPassword(true)}
              />

              {inputStartedCheckPassword && <ShowRegistrationValidate validate={messagePasswordCheck} />}
            </div>

            <div className={classNames(styles.btnLogin)}>
              <Button variant="contained" color="primary" fullWidth disabled={isSubmitting} onClick={submitForm}>
                Continue
              </Button>
            </div>
            <div className={classNames(styles.lineContainer)}>
              <div className={classNames(styles.line)}></div>
              <div className={classNames(styles.text)}>Or already have an account?</div>
            </div>
            <Link to="/login">
              <Button sx={{ fontSize: '1.2rem' }} variant="text" fullWidth color="primary">
                Login
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
