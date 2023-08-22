import cardImg1 from './images/card1.png';
import cardImg2 from './images/card2.png';
import cardImg3 from './images/card3.png';
import styles from './Features.module.scss';

const Features: React.FC = () => (
  <div className={styles.root}>
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <picture>
          <source media="(max-width: 1023px)" srcSet={cardImg1} />
          <img src={cardImg1} alt="delivery" />
        </picture>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>Free and Fast delivery</div>
        <div className={styles.cardDescription}>
          Receipt of goods within 1-2 weeks. We will pack your package securely and ship it carefully. Want more
          information?
        </div>
      </div>
    </div>
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={cardImg2} alt="range" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>Wide range</div>
        <div className={styles.cardDescription}>
          A large selection of quality goods. Funny gifts for you and your loved ones. Go to catalog to see more.
        </div>
      </div>
    </div>
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={cardImg3} alt="order" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>Quick order placement</div>
        <div className={styles.cardDescription}>
          Our team will be happy to process your order quickly. If you have any questions - write or call us!
        </div>
      </div>
    </div>
  </div>
);

export default Features;
