import Container from '@mui/material/Container';
import { AboutPerson } from '../../components/AboutPerson';

const About: React.FC = () => (
  <Container
    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    maxWidth="xl"
  >
    <h2>About us</h2>
    <AboutPerson />
    <AboutPerson reverse />
    <AboutPerson />
  </Container>
);

export default About;
