import { Address } from '@commercetools/platform-sdk';

import { ProfileView } from '../ProfileView';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import styles from './ProfileBox.module.scss';

type Props = {
  className?: string;
  editMode: boolean;
  onModeChange: (mode: boolean) => void;
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  shippingAddresses: Address[];
  billingAddresses: Address[];
  defaultShippingAddress?: Address | null;
  defaultBillingAddress?: Address | null;
};

const ProfileBox: React.FC<Props> = ({
  editMode,
  onModeChange,
  onSaveChange,
  firstName,
  lastName,
  email,
  dateOfBirth,
  shippingAddresses,
  billingAddresses,
  defaultShippingAddress,
  defaultBillingAddress,
}) => (
  <div className={styles.root}>
    {!editMode ? (
      <ProfileView
        onModeChange={onModeChange}
        firstName={firstName}
        lastName={lastName}
        email={email}
        dateOfBirth={dateOfBirth}
        shippingAddresses={shippingAddresses}
        billingAddresses={billingAddresses}
        defaultShippingAddress={defaultShippingAddress}
        defaultBillingAddress={defaultBillingAddress}
      />
    ) : (
      <ProfileEdit
        onModeChange={onModeChange}
        onSaveChange={onSaveChange}
        firstName={firstName}
        lastName={lastName}
        email={email}
        dateOfBirth={dateOfBirth}
        shippingAddresses={shippingAddresses}
        billingAddresses={billingAddresses}
        defaultShippingAddress={defaultShippingAddress}
        defaultBillingAddress={defaultBillingAddress}
      />
    )}
  </div>
);

export default ProfileBox;
