import { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';

import { ProfileBox } from '../../components/ProfileBox';
import { useMeQuery, useUpdateProfileMutation } from '../../queries/customer';

import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { PageContainer } from '../../components/baseComponents/PageContainer';

const Profile: React.FC = () => {
  const { data: userProfile } = useMeQuery();
  const updateProfile = useUpdateProfileMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleModeChange = (mode: boolean): void => {
    setIsEditMode(mode);
  };

  const handleSaveChange = (data: Record<string, string | boolean | number>): void => {
    updateProfile.mutate({ ...data });
  };

  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
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

  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'User profile', path: `${RoutePaths.PROFILE}` },
  ];

  return (
    <PageContainer>
      <section className="pt-5 pb-[60px] md:px-20 md:pt-[50px]">
        <Breadcrumbs items={breadcrumbItems} />
        {preparedAddresses ? (
          <ProfileBox
            editMode={isEditMode}
            onModeChange={handleModeChange}
            onSaveChange={handleSaveChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            dateOfBirth={dateOfBirth}
            defaultShippingAddress={preparedAddresses.defaultShippingAddress}
            defaultBillingAddress={preparedAddresses.defaultBillingAddress}
            shippingAddresses={preparedAddresses.shippingAddresses}
            billingAddresses={preparedAddresses.billingAddresses}
          />
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </PageContainer>
  );
};

export default Profile;
