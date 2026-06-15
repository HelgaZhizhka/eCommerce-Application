import poster1 from '../../assets/images/fon1.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Poster } from '../../components/Poster';

const Login: React.FC = () => (
  <div className="mx-auto max-w-[1536px] px-4">
    <div className="pt-10 pb-[140px] md:flex md:justify-between md:gap-[5%] md:pt-[60px]">
      <div className="flex-[2]">
        <span className="text-[32px] font-bold leading-[1.5] tracking-[0.64px] text-content">
          Welcome back to YesCode!
        </span>
        <LoginForm />
      </div>
      <div className="flex-[1.7] max-md:mt-[30px]">
        <Poster />
      </div>
      <img className="absolute bottom-0 left-0 -z-10 max-md:w-[100px]" src={poster1} alt="font" />
    </div>
  </div>
);

export default Login;
