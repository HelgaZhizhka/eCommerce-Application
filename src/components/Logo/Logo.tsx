import { Link } from 'react-router-dom';

import { useThemeStore } from '../../stores/theme';
import { useMediaQuery } from '../../shared/lib/useMediaQuery';
import { LogoVariant } from './Logo.enum';
import logoMob from './images/logo-mob.svg';
import logo from './images/logo.svg';
import logoLightMob from './images/logo-light-mob.svg';
import logoLight from './images/logo-light.svg';
import logoWhiteMob from './images/logo-white-mob.svg';
import logoWhite from './images/logo-white.svg';

type Props = {
  variant?: LogoVariant;
};

const Logo: React.FC<Props> = ({ variant = LogoVariant.DEFAULT }) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const isMobile = useMediaQuery('(max-width: 1023.95px)');

  let src = isMobile ? logoMob : logo;
  if (variant === LogoVariant.WHITE) {
    src = isMobile ? logoWhiteMob : logoWhite;
  } else if (darkMode) {
    src = isMobile ? logoLightMob : logoLight;
  }

  return (
    <Link to="/">
      <img
        src={src}
        alt="YesCode"
        className="inline-block h-6 w-[100px] object-contain object-center md:h-[94px] md:w-40"
      />
    </Link>
  );
};

export default Logo;
