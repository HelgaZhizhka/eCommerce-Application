import Button from '@mui/material/Button';
import { Address } from '@commercetools/platform-sdk';
import IconButton from '@mui/material/IconButton';

import styles from './ProfileView.module.scss';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';

type Props = {
  className?: string;
  onModeChange: (mode: boolean) => void;
  firstName?: string;
  lastName?: string;
  birthDate: string;
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
  birthDate,
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
        <p>{birthDate}</p>
      </div>
      <Button
        variant="outlined"
        sx={{
          width: '240px',
          height: '60px',
          borderColor: 'orange',
          color: 'orange',
          fontSize: '1.2rem',
          fontWeight: 600,
        }}
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
          <IconButton color="inherit" aria-label="edit" onClick={(): void => onModeChange(true)}>
            <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
          </IconButton>
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
          <IconButton color="inherit" aria-label="edit" onClick={(): void => onModeChange(true)}>
            <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
          </IconButton>
        </div>
      </div>
    ))}
  </div>
);

export default ProfileView;
