import Container from '@mui/material/Container';

import styles from './Profile.module.scss';
import { ProfileInfo } from '../../components/ProfileInfo';

const Profile: React.FC = () => (
  <Container maxWidth="xl">
    <section className={styles.root}>
      <ProfileInfo />
    </section>
  </Container>
);

export default Profile;
