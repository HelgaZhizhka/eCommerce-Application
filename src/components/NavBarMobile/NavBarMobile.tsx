import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

import { RoutePaths } from '../../routes/routes.enum';
import { contacts } from '../../constants';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { InfoPanel } from '../InfoPanel';
import { Categories } from '../Categories';

type Props = {
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
} as const;

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
      className="fixed left-0 top-0 z-[var(--z-index-navbar)] h-[var(--app-height)] w-screen overflow-y-auto bg-body px-5 pt-[60px] pb-[30px]"
      initial="initial"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <button
        type="button"
        aria-label="close"
        onClick={onClose}
        className="absolute right-5 top-[30px] inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X size={32} />
      </button>
      <Categories size={'l'} theme={'dark'} variant={'mobile'} onClose={onClose} />
      <Link className="block text-2xl text-content" to={RoutePaths.ABOUT} onClick={onClose}>
        About Us
      </Link>
      <PhoneNumber className="mt-2.5 mb-[30px] text-2xl">{contacts.phone}</PhoneNumber>
      <InfoPanel className="mt-[30px]" variant={'vertical'} onClose={onClose} />
    </motion.nav>
  );
};

export default NavBarMobile;
