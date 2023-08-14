import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { validate } from '../../utils/validate';
import { LoginFormValues } from './LoginForm.interface';
import styles from './LoginForm.module.scss';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

// const showValidateMessage = {
//   'Email is required': false,
//   'Invalid email address':false,
//   'Password is required': false
// }

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [message, setMessage] = useState(showValidateMessage);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  // const updateMessage = (key: string): void => {
  //   setMessage(prevMessage => ({
  //     ...prevMessage,
  //     [key]: true
  //   }));
  // };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }): void => {
          // console.log(values);
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }): JSX.Element => (
          <Form>
            <Field
              component={FormikTextField}
              name="email"
              type="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="email" />}
            />

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
            />
            <div className={classNames(styles.btnLogin)}>
              <Button variant="contained" color="primary" fullWidth disabled={isSubmitting} onClick={submitForm}>
                Login
              </Button>
            </div>
            <div className={classNames(styles.lineContainer)}>
              <div className={classNames(styles.line)}></div>
              <div className={classNames(styles.text)}>or</div>
            </div>
            <Button variant="outlined" fullWidth color="primary">
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
