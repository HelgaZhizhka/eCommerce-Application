import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { AboutPerson } from '../../components/AboutPerson';

import logoRs from './image/rs_school_js 1.png';
import styles from './About.module.scss';
import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';

const About: React.FC = () => {
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'About us', path: `${RoutePaths.ABOUT}` },
  ];
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      maxWidth="xl"
    >
      <Box sx={{ mt: 3 }}>
        <a href="https://rs.school/index.html" target="_blank" rel="noopener noreferrer">
          <img src={logoRs} alt="Logo RS School" />
        </a>
      </Box>

      <h2 className={styles.title}>About Us</h2>
      <Box sx={{ alignSelf: 'start' }}>
        <Breadcrumbs items={breadcrumbItems} className={styles.breadcrumb} />
      </Box>
      <h4 className={styles.subTitle}>one for all and all for one!</h4>
      <AboutPerson />
    </Container>
  );
};

export default About;
