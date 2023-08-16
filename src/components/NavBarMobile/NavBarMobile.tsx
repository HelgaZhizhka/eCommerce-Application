import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { RoutePaths } from '../../routes/routes.enum';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { InfoPanel } from '../InfoPanel';
import { MenuCategories } from '../MenuCategories';
import styles from './NavBarMobile.module.scss';

type Props = {
  className?: string;
  onClose: () => void;
  isOpen: boolean;
};

const NavBarMobile: React.FC<Props> = ({ onClose, isOpen }) => {
  const navClass = classNames(styles.root, {
    [styles.open]: isOpen,
  });

  return (
    <nav className={(styles.root, navClass)}>
      <IconButton
        className={classNames(styles.close)}
        sx={{ position: 'absolute' }}
        size="large"
        color="inherit"
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <MenuCategories size={'l'} theme={'dark'} />
      <Link className={classNames(styles.link)} to={RoutePaths.ABOUT}>
        About Us
      </Link>
      <PhoneNumber className={styles.phone}>(+380) 68 018 45 67</PhoneNumber>
      <InfoPanel className={styles.info} variant={'vertical'} />
    </nav>
  );
};

export default NavBarMobile;
