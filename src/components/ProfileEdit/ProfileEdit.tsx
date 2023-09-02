import { Address } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { Form, Formik, FormikHelpers } from 'formik';

import styles from './ProfileEdit.module.scss';
import { ProfilePersonalInfo } from '../baseComponents/ProfilePersonalInfo';

type Props = {
  className?: string;
  onSaveChange: (data: object) => void;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  birthDate: string;
  shippingAddresses?: Address[];
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
}) => (
  <div className={styles.root}>
    <Formik
      initialValues={{
        firstName: firstName || '',
        lastName: lastName || '',
        birthDate: birthDate || '',
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <div>
          <ProfilePersonalInfo />
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            // onClick={(): void => {
            //   onSaveChange({ userName: 'Ron' });
            // }}
            type="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </Formik>

    <Button variant="outlined" color="primary" onClick={(): void => onModeChange(false)}>
      Cancel
    </Button>
  </div>
);

export default ProfileEdit;
