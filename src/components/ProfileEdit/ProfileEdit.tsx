import { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';

import { ProfilePersonalInfo } from '../ProfilePersonalInfo';
import { ProfileAddress } from '../ProfileAddress';
import { ModalProfile } from '../baseComponents/ModalProfile';
import { Button } from '../baseComponents/Button';
import styles from './ProfileEdit.module.scss';

type Props = {
  className?: string;
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  shippingAddresses: Address[];
  billingAddresses: Address[];
  defaultShippingAddress?: Address | null;
  defaultBillingAddress?: Address | null;
};

const ProfileEdit: React.FC<Props> = ({
  onSaveChange,
  onModeChange,
  firstName,
  lastName,
  dateOfBirth,
  email,
  shippingAddresses,
  billingAddresses,
  defaultShippingAddress,
  defaultBillingAddress,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenAddressModal = (): void => setActiveModal('address');
  const handleOpenPasswordModal = (): void => setActiveModal('password');
  const handleCloseModal = (): void => setActiveModal(null);

  return (
    <div className={styles.root}>
      <Button
        variant="outlined"
        className="mb-5 ml-auto h-[60px] w-60 border-[orange] text-[1.2rem] font-semibold text-[orange] hover:bg-[orange]/5"
        onClick={(): void => onModeChange(false)}
      >
        Cancel
      </Button>

      <ProfilePersonalInfo
        onSaveChange={onSaveChange}
        initialValues={{
          firstName: firstName || '',
          lastName: lastName || '',
          dateOfBirth: dateOfBirth || '',
          email: email || '',
        }}
      />

      {shippingAddresses.map((address, index) => (
        <ProfileAddress
          key={index}
          onSaveChange={onSaveChange}
          initialValues={{
            name: 'Shipping',
            id: address.id || '',
            street: address.streetName || '',
            city: address.city || '',
            postalCode: address.postalCode || '',
            country: address.country || '',
            // fixed (4.2): mark THIS address default by id, not "any default exists"
            checkBox: !!defaultShippingAddress && defaultShippingAddress.id === address.id,
          }}
        />
      ))}

      {billingAddresses.map((address, index) => (
        <ProfileAddress
          key={index}
          onSaveChange={onSaveChange}
          initialValues={{
            name: 'Billing',
            id: address.id || '',
            street: address.streetName || '',
            city: address.city || '',
            postalCode: address.postalCode || '',
            country: address.country || '',
            // fixed (4.2): mark THIS address default by id, not "any default exists"
            checkBox: !!defaultBillingAddress && defaultBillingAddress.id === address.id,
          }}
        />
      ))}

      <div className={styles.buttonWrapper}>
        <Button className="text-2xl" variant="contained" onClick={handleOpenAddressModal}>
          Add address
        </Button>
        <Button className="text-2xl" variant="outlined" onClick={handleOpenPasswordModal}>
          Change password
        </Button>
      </div>
      <ModalProfile activeModal={activeModal} handleCloseModal={handleCloseModal} onSaveChange={onSaveChange} />
    </div>
  );
};

export default ProfileEdit;
