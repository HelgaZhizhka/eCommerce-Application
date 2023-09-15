import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import bagsImages from './images/Frame 329.png';

const GiftsAndPromoCodes: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
    <Box>
      <img src={bagsImages} alt="images some bags" />
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 / 2 }}>
      <Box>
        <p>👜 What we offer:</p>
        <p>🌟 Spacious and comfortable shoppers for your comfort.</p>
        <p>🎨 A variety of designs and colors to highlight your personality.</p>
        <p>♻️ Environmentally friendly and sustainable materials - your contribution to nature conservation.</p>
        <p>💰 Exclusive promo codes for discounts on your chauper purchase!</p>
        <p>-15% off with promo code BAGS15-SP</p>
      </Box>

      <Link to="/category/bags">
        <Button sx={{ fontSize: '24px', width: '340px' }} variant="contained">
          WANT!
        </Button>
      </Link>
    </Box>
  </Box>
);

export default GiftsAndPromoCodes;
