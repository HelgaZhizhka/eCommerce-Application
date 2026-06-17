import { Address } from '@commercetools/platform-sdk';

import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Button } from '../baseComponents/Button';
import styles from './ProfileView.module.scss';

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
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <h3 className={styles.title}>
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
      <div className={styles.section} key={index}>
        <h4 className={styles.contentTitle}>
          Shipping address:
          {defaultShippingAddress && defaultShippingAddress.id === address.id ? (
            <span className={styles.label}>Default</span>
          ) : null}
        </h4>
        <div className={styles.contentItem}>
          <p className={styles.contentItemValue}>
            {`${address.streetName}, ${address.city}, ${address.country}, ${address.postalCode}`}
          </p>
          <button type="button" aria-label="edit" onClick={(): void => onModeChange(true)} className="text-content">
            <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
          </button>
        </div>
      </div>
    ))}

    {billingAddresses?.map((address, index) => (
      <div className={styles.section} key={index}>
        <h4 className={styles.contentTitle}>
          Billing address:
          {defaultBillingAddress && defaultBillingAddress.id === address.id ? (
            <span className={styles.label}>Default</span>
          ) : null}
        </h4>
        <div className={styles.contentItem}>
          <p className={styles.contentItemValue}>
            {`${address.streetName}, ${address.city}, ${address.country}, ${address.postalCode}`}
          </p>
          <button type="button" aria-label="edit" onClick={(): void => onModeChange(true)} className="text-content">
            <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProfileView;
