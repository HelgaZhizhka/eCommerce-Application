import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';

import { ProfileBox } from '../../components/ProfileBox';
import { userStore } from '../../stores';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const { isEditMode, userProfile } = userStore;

  const handleModeChange = (mode: boolean): void => {
    userStore.setEditMode(mode);
  };

  const handleSaveChange = (data: object): void => {
    userStore.setEditMode(false);
    userStore.saveUserData(data);
  };

  return (
    <Container maxWidth="xl">
      <section className={styles.root}>
        <ProfileBox
          editMode={isEditMode}
          onModeChange={handleModeChange}
          onSaveChange={handleSaveChange}
          userProfile={userProfile}
        />
      </section>
    </Container>
  );
};

export default observer(Profile);
