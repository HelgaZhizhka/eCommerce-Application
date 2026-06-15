import { Link } from 'react-router-dom';

import { RoutePaths } from '../../routes/routes.enum';
import image404 from './images/404.png';
import { PageContainer } from '../../components/baseComponents/PageContainer';

const ErrorPage: React.FC = () => (
  <PageContainer>
    <div className="relative overflow-hidden pt-5 pb-[100px] text-center select-none sm:pt-0">
      <div className="relative leading-none font-bold whitespace-nowrap text-[color:var(--state-info)] text-[12rem] sm:text-[24rem] md:text-[32rem] before:absolute before:top-0 before:left-0.5 before:h-full before:w-full before:content-['404'] before:[text-shadow:-2px_0_red] before:[animation:glitch-anim-1_2.5s_infinite_linear_alternate-reverse] after:absolute after:top-0 after:-left-0.5 after:h-full after:w-full after:content-['404'] after:[text-shadow:-2px_0_blue] after:[animation:glitch-anim-2_2.5s_infinite_linear_alternate-reverse]">
        404
      </div>
      <img className="absolute top-[10%] left-1/2 -translate-x-1/2 max-md:w-[70%]" src={image404} alt="404 page" />

      <h2 className="mt-10 mb-8 text-[1.25rem] font-medium sm:text-[2rem]">
        <span className="mr-[5px] text-[color:var(--pink)]">WHOOPS!</span> Page they&apos;re looking for could not be
        found.
      </h2>
      <Link
        to={RoutePaths.MAIN}
        className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-[1.5rem] text-white transition-colors hover:bg-orange-light md:h-12 md:w-[300px]"
      >
        Back to main
      </Link>
    </div>
  </PageContainer>
);

export default ErrorPage;
