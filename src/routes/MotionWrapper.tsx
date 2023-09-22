import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

const MotionWrapper: React.FC<Props> = ({ children }) => {
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.65, ease: 'easeIn' } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
