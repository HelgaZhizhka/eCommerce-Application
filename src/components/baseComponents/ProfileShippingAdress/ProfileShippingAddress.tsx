import { Box, Button, Select, MenuItem } from '@mui/material';
import { Field, Form } from 'formik';
import { Checkbox, TextField as FormikTextField } from 'formik-material-ui';
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from './ProfileShippingAddress.module.scss';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  width: '30px',
  height: '30px',
}));

const ProfileShippingAddress: React.FC = () => (
  <Box sx={{ mt: '98px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>Shipping address:</h3>
      <Button>Delete address</Button>
    </Box>
    <Form>
      <label className={styles.lablelTitle} htmlFor="ShippingStreetName">
        Street
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="shippingStreetName"
          name="shippingStreetName"
          variant="standard"
        />
      </div>
      <label className={styles.lablelTitle} htmlFor="shippingCityName">
        City
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="shippingCityName"
          name="shippingCityName"
          variant="standard"
        />
      </div>
      <label className={styles.lablelTitle} htmlFor="shippingPostalCodeName">
        Postal code
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="shippingCountryName"
          name="shippingPostalCodeName"
          type="number"
          variant="standard"
        />
      </div>
      <label className={styles.lablelTitle} htmlFor="shippingCountryName">
        Country
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="shippingCountryName"
          name="shippingCountryName"
          select
          variant="standard"
        >
          <MenuItem value="UA">UA</MenuItem>
          <MenuItem value="US">US</MenuItem>
        </Field>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={<Field type="checkbox" name="shippingCheckBox" component={CustomCheckbox} />}
          label="Use default"
        />
        <Button>Delete address</Button>
      </Box>
    </Form>
  </Box>
);

export default ProfileShippingAddress;
