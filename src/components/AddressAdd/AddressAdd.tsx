import { Box, Button, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Checkbox, TextField as FormikTextField } from 'formik-material-ui';
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';

import styles from './AddressAdd.module.scss';
import { validationSchema } from './validate';

const CustomCheckbox = styled(Checkbox)(() => ({
  width: '30px',
  height: '30px',
}));

type InitialValuesType = {
  address: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  checkBox: boolean;
};

const initialValues: InitialValuesType = {
  address: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  checkBox: false,
};

const AddressAdd: React.FC = () => (
  <Box sx={{ p: '30px', borderBottom: '3px solid grey' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>Add new address</h3>
    </Box>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        console.log(values);
      }}
    >
      {({ isValid }): ReactElement => (
        <Form>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} name="address" select variant="standard">
              <MenuItem value="Shipping">Shipping</MenuItem>
              <MenuItem value="Billing">Billing</MenuItem>
            </Field>
          </div>
          <label className={styles.lablelTitle} htmlFor="street">
            Street
          </label>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} id="street" name="street" variant="standard" />
          </div>
          <label className={styles.lablelTitle} htmlFor="city">
            City
          </label>
          <div className={styles.inputContainer}>
            <Field className={styles.field} component={FormikTextField} id="city" name="city" variant="standard" />
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
              Add address
              <AddIcon />
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  </Box>
);

export default AddressAdd;
