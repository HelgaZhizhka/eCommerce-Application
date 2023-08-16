import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { validate } from '../../utils/validate/sigIn';
import ShowValidate from '../ShowValidate/ShowValidate';
import { FieldInput } from '../RegistrationForm/Registration.interface';
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<LoginFormValues> => validate(values, updateMessage)}
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

              {inputStartedEmail && <ShowValidate validate={message} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
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
              />

              {inputStartedPassword && <ShowValidate validate={messagePassword} />}
            </div>

            <div className={classNames(styles.btnLogin)}>
              <Button variant="contained" color="primary" fullWidth disabled={isSubmitting} onClick={submitForm}>
                Sign in
              </Button>
            </div>
            <div className={classNames(styles.lineContainer)}>
              <div className={classNames(styles.line)}></div>
              <div className={classNames(styles.text)}>or</div>
            </div>
            <Link to="/registration">
              <Button variant="outlined" fullWidth color="primary">
                Sign up
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
