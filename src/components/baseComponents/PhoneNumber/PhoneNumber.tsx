import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import styles from './PhoneNumber.module.scss';

type Props = {
  children?: string;
  className?: string;
};

const PhoneNumber: React.FC<Props> = ({ children, className }) => {
  const cleanedPhoneNumber = children?.replace(/[^\d+]/g, '');

  return (
    <span className={`${className} ${styles.root}`}>
      <Icon name={IconName.PHONE} width={32} height={32} className={`icon ${styles.icon}`} />
      <a className="text-inherit" href={`tel: ${cleanedPhoneNumber}`}>
        {children}
      </a>
    </span>
  );
};

export default PhoneNumber;
