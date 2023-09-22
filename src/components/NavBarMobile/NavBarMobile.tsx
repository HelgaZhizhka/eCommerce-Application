import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { RoutePaths } from '../../routes/routes.enum';
import { contacts } from '../../constants';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { InfoPanel } from '../InfoPanel';
import { Categories } from '../Categories';
import styles from './NavBarMobile.module.scss';

type Props = {
  className?: string;
  onClose: () => void;
  isOpen: boolean;
};

const variants = {
  initial: {
    x: '-100%',
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
    },
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const NavBarMobile: React.FC<Props> = ({ onClose, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <motion.nav
      className={styles.root}
      initial="initial"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        className={styles.close}
        sx={{ position: 'absolute' }}
        size="large"
        color="inherit"
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Categories size={'l'} theme={'dark'} variant={'mobile'} onClose={onClose} />
      <Link className={styles.link} to={RoutePaths.ABOUT} onClick={onClose}>
        About Us
      </Link>
      <PhoneNumber className={styles.phone}>{contacts.phone}</PhoneNumber>
      <InfoPanel className={styles.info} variant={'vertical'} onClose={onClose} />
    </motion.nav>
  );
};

export default NavBarMobile;
