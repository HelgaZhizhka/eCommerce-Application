import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';
import { Address } from '@commercetools/platform-sdk';

import { ProfileBox } from '../../components/ProfileBox';
import { userStore } from '../../stores';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const { isEditMode, userProfile, getUserProfile } = userStore;

  const handleModeChange = (mode: boolean): void => {
    userStore.setEditMode(mode);
  };

  const handleSaveChange = (data: object): void => {
    userStore.setEditMode(false);
    userStore.saveUserData(data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const {
    firstName,
    lastName,
    email,
    addresses,
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
  } = userProfile || {};

  const preparedAddresses =
    userProfile &&
    ((): {
      shippingAddresses: Address[];
      billingAddresses: Address[];
      defaultShippingAddress: Address | null;
      defaultBillingAddress: Address | null;
    } => {
      const shippingAddresses =
        userProfile?.addresses?.filter((address) => {
          if (address.id === undefined) return false;
          return shippingAddressIds?.includes(address.id);
        }) || [];

      const billingAddresses =
        addresses?.filter((address) => {
          if (address.id === undefined) return false;
          return billingAddressIds?.includes(address.id);
        }) || [];

      const defaultShippingAddress = addresses?.find((address) => address.id === defaultShippingAddressId) || null;
      const defaultBillingAddress = addresses?.find((address) => address.id === defaultBillingAddressId) || null;

      return {
        shippingAddresses,
        billingAddresses,
        defaultShippingAddress,
        defaultBillingAddress,
      };
    })();

  return (
    <Container maxWidth="xl">
      <section className={styles.root}>
        {preparedAddresses ? (
          <ProfileBox
            editMode={isEditMode}
            onModeChange={handleModeChange}
            onSaveChange={handleSaveChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            defaultShippingAddress={preparedAddresses.defaultShippingAddress}
            defaultBillingAddress={preparedAddresses.defaultBillingAddress}
            shippingAddresses={preparedAddresses.shippingAddresses}
            billingAddresses={preparedAddresses.billingAddresses}
          />
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </Container>
  );
};

export default observer(Profile);
