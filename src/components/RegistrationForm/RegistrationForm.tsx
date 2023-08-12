import React, { useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import classNames from 'classnames';
import { validate } from '../../utils/validate';
import { RegistrationFormValues } from './registration.interface';
import styles from './registration.module.scss';
import ShowRegistrationValidate from './ShowRegistrationValidate';

export type Message = {
  [key: string]: boolean;
};

const initialValues: RegistrationFormValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<Message>({});
  const [messagePassword, setMessagePassword] = useState<Message>({});
  const [inputStartedEmail, setInputStartedEmail] = useState(false);
  const [inputStartedPassword, setInputStartedPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const updateMessage = (key: string, value: boolean): void => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      [key]: value,
    }));
  };

  const updateMessagePassword = (key: string, value: boolean): void => {
    setMessagePassword((prevMessage) => ({
      ...prevMessage,
      [key]: value,
    }));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValues> => validate(values, updateMessage, updateMessagePassword)}
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

              {inputStartedEmail && <ShowRegistrationValidate validEmail={message} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPassword ? 'text' : 'password'}
                label="Repeat password"
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

              {inputStartedPassword && <ShowRegistrationValidate validEmail={messagePassword} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPassword ? 'text' : 'password'}
                label="Repeat password"
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

              {inputStartedPassword && <ShowRegistrationValidate validEmail={messagePassword} />}
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
              <Button variant="outlined" fullWidth color="primary">
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
