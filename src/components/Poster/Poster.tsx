import classNames from 'classnames';

import styles from './Poster.module.scss';
import poster1 from './images/poster1.png';
import poster2 from './images/poster2.png';
import poster3 from './images/poster3.png';
import poster4 from './images/poster4.png';
import poster5 from './images/poster5.png';
import poster6 from './images/poster6.png';

const Poster: React.FC = () => (
  <div className={classNames(styles.root)}>
    <div className={classNames(styles.item)}>
      <img src={poster1} alt="" />
    </div>
    <div className={classNames(styles.item)}>
      <img src={poster2} alt="" />
    </div>
    <div className={classNames(styles.item)}>
      <img src={poster3} alt="" />
    </div>
    <div className={classNames(styles.item)}>
      <img src={poster4} alt="" />
    </div>
    <div className={classNames(styles.item)}>
      <img src={poster5} alt="" />
    </div>
    <div className={classNames(styles.item)}>
      <img src={poster6} alt="" />
    </div>
  </div>
);

export default Poster;
