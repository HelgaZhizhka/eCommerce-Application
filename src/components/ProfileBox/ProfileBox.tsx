import { ProfileView } from '../ProfileView';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import styles from './ProfileBox.module.scss';

type Props = {
  className?: string;
  editMode: boolean;
  onModeChange: (mode: boolean) => void;
  onSaveChange: (data: object) => void;
};

const ProfileBox: React.FC<Props> = ({ editMode, onModeChange, onSaveChange }) => (
  <div className={styles.root}>
    {!editMode ? (
      <ProfileView onModeChange={onModeChange} />
    ) : (
      <ProfileEdit onModeChange={onModeChange} onSaveChange={onSaveChange} />
    )}
  </div>
);

export default ProfileBox;
