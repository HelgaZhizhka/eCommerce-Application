import { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';

import styles from './ProfileEdit.module.scss';

import { ProfilePersonalInfo } from '../ProfilePersonalInfo';
import { ProfileAddress } from '../ProfileAddress';
import { ModalProfile } from '../baseComponents/ModalProfile';

type Props = {
  className?: string;
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  birthDate: string;
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
  birthDate,
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
        sx={{
          ml: 'auto',
          mb: '20px',
          width: '240px',
          height: '60px',
          borderColor: 'orange',
          color: 'orange',
          fontSize: '1.2rem',
          fontWeight: 600,
        }}
        onClick={(): void => onModeChange(false)}
      >
        Cancel
      </Button>

      <ProfilePersonalInfo
        initialValues={{
          firstName: firstName || '',
          lastName: lastName || '',
          birthDate: birthDate || '',
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
            checkBox: !!defaultShippingAddress,
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
            checkBox: !!defaultBillingAddress,
          }}
        />
      ))}

      <div className={styles.buttonWrapper}>
        <Button
          sx={{
            fontSize: '24px',
          }}
          variant="contained"
          onClick={handleOpenAddressModal}
        >
          Add address
        </Button>
        <Button onClick={handleOpenPasswordModal} sx={{ fontSize: '24px' }} variant="outlined" color="primary">
          Change password
        </Button>
      </div>
      <ModalProfile activeModal={activeModal} handleCloseModal={handleCloseModal} onSaveChange={onSaveChange} />
    </div>
  );
};

export default ProfileEdit;
