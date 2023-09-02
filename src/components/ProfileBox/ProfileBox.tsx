import { Address } from '@commercetools/platform-sdk';
import styles from './ProfileBox.module.scss';

import { ProfileView } from '../ProfileView';
import ProfileEdit from '../ProfileEdit/ProfileEdit';

type Props = {
  className?: string;
  editMode: boolean;
  onModeChange: (mode: boolean) => void;
  onSaveChange: (data: object) => void;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate: string;
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
  birthDate,
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
        birthDate={birthDate}
        shippingAddresses={shippingAddresses}
        billingAddresses={billingAddresses}
        defaultShippingAddress={defaultShippingAddress}
        defaultBillingAddress={defaultBillingAddress}
      />
    )}
  </div>
);

export default ProfileBox;
