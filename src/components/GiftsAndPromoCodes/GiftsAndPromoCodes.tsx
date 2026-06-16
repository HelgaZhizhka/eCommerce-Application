import { useState } from 'react';
import { Link } from 'react-router-dom';

import { promoCode } from '../../constants';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Button } from '../baseComponents/Button';
import bagsImages from './images/Frame 329.png';

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
    <div className="flex flex-wrap justify-center gap-[50px]">
      <div>
        <img src={bagsImages} alt="images some bags" />
      </div>
      <div className="flex flex-[0.5] flex-col justify-between">
        <div>
          <p>👜 What we offer:</p>
          <p>🌟 Spacious and comfortable shoppers for your comfort.</p>
          <p>🎨 A variety of designs and colors to highlight your personality.</p>
          <p>♻️ Environmentally friendly and sustainable materials - your contribution to nature conservation.</p>
          <p>💰 Exclusive promo codes for discounts on your chauper purchase!</p>
          <div className="mb-4 flex items-center gap-2">
            <span>
              -15% off with promo code <span className="text-lg text-primary">{promoCode}</span>
            </span>
            <button
              type="button"
              title={copied ? 'Скопировано!' : 'Копировать'}
              aria-label="Copy promo code"
              onClick={handleCopyClick}
              className="rounded-full p-2 transition-colors hover:bg-black/5"
            >
              <Icon name={IconName.COPY} width={20} height={20} />
            </button>
          </div>
        </div>

        <Link to="/category/bags/shoppers">
          <Button variant="contained" className="w-[340px] text-2xl">
            WANT!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GiftsAndPromoCodes;
