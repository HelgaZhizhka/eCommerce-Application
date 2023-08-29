import styles from './ProfileInfo.module.scss';

type Props = {
  className?: string;
};

const ProfileInfo: React.FC<Props> = () => (
  <div className={styles.root}>
    <div className={styles.header}>
      <h2>User name</h2>
    </div>
    <div className={styles.content}>
      <h3>list address</h3>
    </div>
  </div>
);

export default ProfileInfo;
