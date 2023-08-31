import Button from '@mui/material/Button';
import { Customer } from '@commercetools/platform-sdk';

import styles from './ProfileView.module.scss';

type Props = {
  className?: string;
  onModeChange: (mode: boolean) => void;
  userProfile: Customer | null;
};

const ProfileView: React.FC<Props> = ({ onModeChange, userProfile }) => (
  <div className={styles.root}>
    <h3>User view</h3>
    <div>{userProfile?.email}</div>
    <Button variant="outlined" color="primary" onClick={(): void => onModeChange(true)}>
      Edit
    </Button>
  </div>
);

export default ProfileView;
