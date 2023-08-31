import { Customer } from '@commercetools/platform-sdk';

import styles from './ProfileBox.module.scss';

import { ProfileView } from '../ProfileView';
import ProfileEdit from '../ProfileEdit/ProfileEdit';

type Props = {
  className?: string;
  editMode: boolean;
  onModeChange: (mode: boolean) => void;
  onSaveChange: (data: object) => void;
  userProfile: Customer | null;
};

const ProfileBox: React.FC<Props> = ({ editMode, onModeChange, onSaveChange, userProfile }) => (
  <div className={styles.root}>
    {!editMode ? (
      <ProfileView onModeChange={onModeChange} userProfile={userProfile} />
    ) : (
      <ProfileEdit onModeChange={onModeChange} onSaveChange={onSaveChange} />
    )}
  </div>
);

export default ProfileBox;
