import { Address } from '@commercetools/platform-sdk';

import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Button } from '../baseComponents/Button';

type Props = {
  className?: string;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  shippingAddresses?: Address[];
  billingAddresses?: Address[];
  defaultShippingAddress?: Address | null;
  defaultBillingAddress?: Address | null;
};

const sectionClass = 'relative mb-2.5 mt-[50px]';
const contentTitleClass = 'mb-2.5 mt-0 flex items-center gap-[5px] text-2xl';
const labelClass =
  'inline-block rounded-[44px] border border-primary px-[25px] py-[5px] text-base font-normal text-primary';
const contentItemClass = 'flex items-center justify-between rounded-[2px] bg-page px-5 py-2.5 text-2xl';

const ProfileView: React.FC<Props> = ({
  onModeChange,
  firstName,
  lastName,
  dateOfBirth,
  email,
  shippingAddresses,
  billingAddresses,
  defaultShippingAddress,
  defaultBillingAddress,
}) => (
  <div className="relative">
    <div className="text-[18px] md:flex md:items-center md:justify-between md:text-2xl">
      <div>
        <h3 className="m-0 text-2xl">
          {firstName} {lastName}
        </h3>
        <p>{email}</p>
        <p>{dateOfBirth}</p>
      </div>
      <Button
        variant="outlined"
        className="h-[60px] w-60 border-[orange] text-[1.2rem] font-semibold text-[orange] hover:bg-[orange]/5"
        onClick={(): void => onModeChange(true)}
      >
        Edit profile
      </Button>
    </div>

    {shippingAddresses?.map((address, index) => (
      <div className={sectionClass} key={index}>
        <h4 className={contentTitleClass}>
          Shipping address:
          {defaultShippingAddress && defaultShippingAddress.id === address.id ? (
            <span className={labelClass}>Default</span>
          ) : null}
        </h4>
        <div className={contentItemClass}>
          <p>{`${address.streetName}, ${address.city}, ${address.country}, ${address.postalCode}`}</p>
          <button type="button" aria-label="edit" onClick={(): void => onModeChange(true)} className="text-content">
            <Icon name={IconName.EDIT} width={36} height={36} className="icon text-primary" />
          </button>
        </div>
      </div>
    ))}

    {billingAddresses?.map((address, index) => (
      <div className={sectionClass} key={index}>
        <h4 className={contentTitleClass}>
          Billing address:
          {defaultBillingAddress && defaultBillingAddress.id === address.id ? (
            <span className={labelClass}>Default</span>
          ) : null}
        </h4>
        <div className={contentItemClass}>
          <p>{`${address.streetName}, ${address.city}, ${address.country}, ${address.postalCode}`}</p>
          <button type="button" aria-label="edit" onClick={(): void => onModeChange(true)} className="text-content">
            <Icon name={IconName.EDIT} width={36} height={36} className="icon text-primary" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProfileView;
