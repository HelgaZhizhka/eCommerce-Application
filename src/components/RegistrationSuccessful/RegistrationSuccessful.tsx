import { useThemeStore } from '../../stores/theme';
import logo from './images/logo.svg';
import logoLight from './images/logoLight.svg';

const RegistrationSuccessful: React.FC = () => {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <div className="mt-5 mb-[50px] flex flex-col items-center justify-center">
      <h2>Thank you! Registration was successful!</h2>
      <img
        src={darkMode ? logoLight : logo}
        alt="YesCode"
        className="inline-block h-[122px] w-[300px] object-contain object-center"
      />
    </div>
  );
};

export default RegistrationSuccessful;
