import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { AboutPerson } from '../../components/AboutPerson';

import logoRs from './image/rs_school_js 1.png';

const About: React.FC = () => (
  <Container
    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    maxWidth="xl"
  >
    <Box sx={{ mt: 3 }}>
      <a href="https://rs.school/index.html" target="_blank" rel="noopener noreferrer">
        <img src={logoRs} alt="Logo RS School" />
      </a>
    </Box>

    <h2>About us</h2>
    <AboutPerson />
  </Container>
);

export default About;
