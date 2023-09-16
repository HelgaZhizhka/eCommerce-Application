import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

import { promoCode } from '../../constants';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import bagsImages from './images/Frame 329.png';
import styles from './GiftsAndPromoCodes.module.scss';

const GiftsAndPromoCodes: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 2 }}>
            <span>
              -15% off with promo code <span className={styles.promo}>{promoCode}</span>
            </span>
            <Tooltip title={copied ? 'Скопировано!' : 'Копировать'}>
              <IconButton size="large" onClick={handleCopyClick}>
                <Icon name={IconName.COPY} width={20} height={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Link to="/category/bags">
          <Button sx={{ fontSize: '24px', width: '340px' }} variant="contained">
            WANT!
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default GiftsAndPromoCodes;
