import cardImg1 from './images/card1.png';
import cardImg2 from './images/card2.png';
import cardImg3 from './images/card3.png';
import { Feature } from '../Feature';
import styles from './Features.module.scss';

const Features: React.FC = () => (
  <div className={styles.root}>
    <Feature
      image={cardImg1}
      title="Free and Fast delivery"
      description="Receipt of goods within 1-2 weeks. We will pack your package securely and ship it carefully. Want more
          information?"
    />
    <Feature
      image={cardImg2}
      title="Wide range"
      description="A large selection of quality goods. Funny gifts for you and your loved ones. Go to catalog to see more."
    />
    <Feature
      image={cardImg3}
      title="Quick order placement"
      description="Our team will be happy to process your order quickly. If you have any questions - write or call us!"
    />
  </div>
);

export default Features;
