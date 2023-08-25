import { observer } from 'mobx-react-lite';

// import { productStore } from '../../stores';
import styles from './Product.module.scss';

type Props = {
  className?: string;
};

const Product: React.FC<Props> = ({ className }) => <div className={`${className} ${styles.root}`}>Product</div>;

export default observer(Product);
