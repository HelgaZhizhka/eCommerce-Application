import { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';

import { FieldWrapper } from '../baseComponents/FieldWrapper';
import { validationSchema } from './validate';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  initialValues: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
  };
};

const ProfilePersonalInfo: React.FC<Props> = ({ initialValues, onSaveChange }) => (
  <Formik
    initialValues={initialValues}
    enableReinitialize={true}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }): void => {
      onSaveChange({ ...values, action: 'changePersonalData' });
      setSubmitting(false);
    }}
  >
    {({ isValid }): ReactElement => (
      <Form>
        <FieldWrapper label="First Name" name="firstName" type="text" variant="standard" />
        <FieldWrapper label="Last Name" name="lastName" type="text" variant="standard" />
        <FieldWrapper label="Email" name="email" type="text" variant="standard" />
        <FieldWrapper label="Date of birth" name="dateOfBirth" type="date" variant="standard" />
        <Button sx={{ fontSize: '20px' }} variant="contained" type="submit" disabled={!isValid}>
          Save
        </Button>
      </Form>
    )}
  </Formik>
);

export default ProfilePersonalInfo;
