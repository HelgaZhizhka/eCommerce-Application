import { ReactElement, useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';

import styles from './ProfileEdit.module.scss';
import { ProfilePersonalInfo } from '../baseComponents/ProfilePersonalInfo';
import { validationSchema } from './validate';
import { ProfileShippingAddress } from '../baseComponents/ProfileShippingAdress';

type Props = {
  className?: string;
  onSaveChange: (data: object) => void;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  birthDate: string;
  shippingAddresses: Address[];
  billingAddresses?: Address[];
  defaultShippingAddress?: Address | null;
  defaultBillingAddress?: Address | null;
};

const ProfileEdit: React.FC<Props> = ({
  onSaveChange,
  onModeChange,
  firstName,
  lastName,
  birthDate,
  shippingAddresses,
  billingAddresses,
  defaultShippingAddress,
  defaultBillingAddress,
}) => {
  console.log('1');

  return (
    <div className={styles.root}>
      <Button
        sx={{ marginLeft: 'auto', fontSize: '24px' }}
        variant="text"
        color="primary"
        onClick={(): void => onModeChange(false)}
      >
        Cancel
      </Button>

      <Formik
        initialValues={{
          firstName: firstName || '',
          lastName: lastName || '',
          birthDate: birthDate || '',
          shippingStreetName: shippingAddresses[0]?.streetName || '',
          shippingCityName: shippingAddresses[0]?.city || '',
          shippingPostalCodeName: shippingAddresses[0]?.postalCode || '',
          shippingCountryName: shippingAddresses[0]?.country,
          shippingCheckBox: !!defaultShippingAddress,
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }): void => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isValid }): ReactElement => (
          <Form>
            <ProfilePersonalInfo />
            <ProfileShippingAddress />

            <div className={styles.buttonWrapper}>
              <Button
                sx={{
                  fontSize: '24px',
                }}
                variant="contained"
                type="submit"
                disabled={!isValid}
              >
                Save changes
              </Button>
              <Button sx={{ fontSize: '24px' }} variant="outlined" color="primary">
                Change password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEdit;
