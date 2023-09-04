import { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';

import { validationSchema } from './validate';

import { FieldWrapper } from '../baseComponents/FieldWrapper';

type Props = {
  initialValues: {
    firstName: string;
    lastName: string;
    birthDate: string;
  };
};

const ProfilePersonalInfo: React.FC<Props> = ({ initialValues }) => (
  <Formik
    initialValues={initialValues}
    enableReinitialize={true}
    validationSchema={validationSchema}
    onSubmit={(): void => {}}
  >
    {({ isValid }): ReactElement => (
      <Form>
        <FieldWrapper label="First Name" name="firstName" type="text" variant="standard" />
        <FieldWrapper label="Last Name" name="lastName" type="text" variant="standard" />
        <FieldWrapper label="Date of birth" name="birthDate" type="date" variant="standard" />
        <Button sx={{ fontSize: '20px' }} variant="contained" type="submit" disabled={!isValid}>
          Save
        </Button>
      </Form>
    )}
  </Formik>
);

export default ProfilePersonalInfo;
