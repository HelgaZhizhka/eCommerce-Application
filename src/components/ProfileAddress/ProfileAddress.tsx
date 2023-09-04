import { Box, Button, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Checkbox, TextField as FormikTextField } from 'formik-material-ui';
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactElement } from 'react';

import styles from './ProfileAddress.module.scss';
import { validationSchema } from './validate';

const CustomCheckbox = styled(Checkbox)(() => ({
  width: '30px',
  height: '30px',
}));

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  initialValues: {
    name: string;
    id: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    checkBox: boolean;
  };
};

const ProfileAddress: React.FC<Props> = ({ initialValues, onSaveChange }) => (
  <Box sx={{ p: '40px 0', borderBottom: '3px solid grey' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>{initialValues.name} address:</h3>
      <Button
        onClick={(): void => onSaveChange({ ...initialValues, action: 'removeAddress' })}
        sx={{ fontSize: '20px' }}
      >
        Delete address
      </Button>
    </Box>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        console.log(initialValues);
        onSaveChange({ ...values, action: 'changeAddress' });
      }}
    >
      {({ isValid }): ReactElement => (
        <Form>
          <label className={styles.lablelTitle} htmlFor="street">
            Street
          </label>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} name="street" variant="standard" />
          </div>
          <label className={styles.lablelTitle} htmlFor="city">
            City
          </label>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} name="city" variant="standard" />
          </div>
          <label className={styles.lablelTitle} htmlFor="postalCode">
            Postal code
          </label>
          <div className={styles.inputContainer}>
            <Field
              className={styles.field}
              component={FormikTextField}
              name="postalCode"
              type="string"
              variant="standard"
            />
          </div>
          <label className={styles.lablelTitle} htmlFor="country">
            Country
          </label>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} name="country" select variant="standard">
              <MenuItem value="UA">UA</MenuItem>
              <MenuItem value="US">US</MenuItem>
            </Field>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={<Field type="checkbox" name="checkBox" component={CustomCheckbox} />}
              label="Use default"
            />
            <Button type="submit" disabled={!isValid} sx={{ fontSize: '20px' }}>
              Change address
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  </Box>
);

export default ProfileAddress;
