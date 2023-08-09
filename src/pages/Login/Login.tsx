import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { TextField as FormikTextField } from 'formik-material-ui';
import { LoginFormValues } from './login.interface';
import { validate } from '../../utils/validate';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => (
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
          type="password"
          label="Password"
          name="password"
          variant="standard"
          fullWidth
          margin="normal"
          helperText={<ErrorMessage name="password" />}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          onClick={submitForm}
          style={{ marginBottom: '1rem' }}
        >
          Login
        </Button>
        <Button variant="outlined" fullWidth color="primary">
          Login
        </Button>
      </Form>
    )}
  </Formik>
);

export default Login;
