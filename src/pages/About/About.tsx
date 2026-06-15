import { AboutPerson } from '../../components/AboutPerson';

import logoRs from './image/rs_school_js 1.png';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { PageContainer } from '../../components/baseComponents/PageContainer';

const About: React.FC = () => {
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'About us', path: `${RoutePaths.ABOUT}` },
  ];
  return (
    <PageContainer className="flex flex-col items-center justify-center">
      <div className="mt-6">
        <a href="https://rs.school/index.html" target="_blank" rel="noopener noreferrer">
          <img src={logoRs} alt="Logo RS School" />
        </a>
      </div>

      <h2 className="mb-0 text-[2rem]">About Us</h2>
      <div className="self-start">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <h4 className="m-0 text-[1.25rem] font-normal italic">one for all and all for one!</h4>
      <AboutPerson />
    </PageContainer>
  );
};

export default About;
