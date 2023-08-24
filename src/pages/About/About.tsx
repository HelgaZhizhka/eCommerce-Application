import Container from '@mui/material/Container';
import Slider from '../../components/ProductCarosel/Slider';

const About: React.FC = () => (
  <Container maxWidth="xl">
    <Slider />
    <div>
      <h2>About Us</h2>
    </div>
    <div id="delivery">
      <h2>Delivery</h2>
    </div>
    <div id="range">
      <h2>Range</h2>
    </div>
    <div id="order">
      <h2>Order</h2>
    </div>
  </Container>
);

export default About;
