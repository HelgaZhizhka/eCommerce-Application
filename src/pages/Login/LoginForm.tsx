import React, { useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import classNames from 'classnames';
import { LoginFormValues } from './login.interface';
import { validate } from '../../utils/validate';
import styles from './login.module.scss';
import { Icon } from '../../components/baseComponents/Icon';
import { IconName } from '../../components/baseComponents/Icon/icon.enum';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
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
            endDecorator={<Icon name={IconName.USER} />}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            onClick={submitForm}
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
          >
            Login
          </Button>
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
  );
};

export default Login;
