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

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};
const AddressAdd: React.FC<Props> = ({ onSaveChange }) => (
  <Box sx={{ p: '30px', borderBottom: '3px solid grey' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>Add new address</h3>
    </Box>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        onSaveChange({ ...values, action: 'addAddress' });
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
              <MenuItem value="UA">Ukraine</MenuItem>
              <MenuItem value="EU">European Union</MenuItem>
            </Field>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
              className={styles.nowrap}
              control={<Field type="checkbox" name="checkBox" component={CustomCheckbox} />}
              label="Use default"
            />
            <Button className={styles.nowrap} type="submit" disabled={!isValid} sx={{ fontSize: '20px' }}>
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
