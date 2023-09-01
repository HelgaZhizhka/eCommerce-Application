import { Address } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';

import styles from './ProfileEdit.module.scss';

type Props = {
  className?: string;
  onSaveChange: (data: object) => void;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
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
  shippingAddresses,
  billingAddresses,
  defaultShippingAddress,
  defaultBillingAddress,
}) => (
  <div className={styles.root}>
    <h3>Edit forms</h3>
    <Button variant="outlined" color="primary" onClick={(): void => onSaveChange({ userName: 'Ron' })}>
      Save
    </Button>
    <Button variant="outlined" color="primary" onClick={(): void => onModeChange(false)}>
      Cancel
    </Button>
  </div>
);

export default ProfileEdit;
