import Button from '@mui/material/Button';
import { Customer } from '@commercetools/platform-sdk';

import styles from './ProfileView.module.scss';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';

type Props = {
  className?: string;
  onModeChange: (mode: boolean) => void;
  userProfile: Customer | null;
};

const ProfileView: React.FC<Props> = ({ onModeChange, userProfile }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div>
        <h3 className={styles.title}>
          {userProfile?.firstName && userProfile?.lastName ? (
            <>
              {userProfile.firstName} {userProfile.lastName}
            </>
          ) : (
            'Name Name'
          )}
        </h3>
        <span>{userProfile?.email ? userProfile.email : 'username@gmail.com'}</span>
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
    <div className={styles.section}>
      <h4 className={styles.contentTitle}>
        Shipping address: <span className={styles.label}>Default</span>
      </h4>
      <div className={styles.contentItem}>
        <p className={styles.contentItemValue}>5855 Amboy St, Dearborn Heights, Michigan(MI), 48127</p>
        <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
      </div>
      <Icon name={IconName.DELETE} width={40} height={40} className={`icon ${styles.iconDelete}`} />
    </div>
    <div className={styles.section}>
      <h4 className={styles.contentTitle}>Billing address:</h4>
      <div className={styles.contentItem}>
        <p className={styles.contentItemValue}>5855 Amboy St, Dearborn Heights, Michigan(MI), 48127</p>
        <Icon name={IconName.EDIT} width={36} height={36} className={`icon ${styles.iconEdit}`} />
      </div>
      <Icon name={IconName.DELETE} width={40} height={40} className={`icon ${styles.iconDelete}`} />
    </div>
  </div>
);

export default ProfileView;
