import Button from '@mui/material/Button';

import styles from './ProfileView.module.scss';

type Props = {
  className?: string;
  onModeChange: (mode: boolean) => void;
};

const ProfileView: React.FC<Props> = ({ onModeChange }) => (
  <div className={styles.root}>
    <h3>User view</h3>
    <Button variant="outlined" color="primary" onClick={(): void => onModeChange(true)}>
      Edit
    </Button>
  </div>
);

export default ProfileView;
