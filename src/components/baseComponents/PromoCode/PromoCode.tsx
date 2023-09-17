import Input from '@mui/material/Input';
import { useState } from 'react';
import { Button } from '@mui/material';

import { promoCode } from '../../../constants';
import styles from './PromoCode.module.scss';

type Props = {
  className?: string;
  onChange?: (code: string) => void;
};

const PromoCode: React.FC<Props> = ({ className, onChange }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  const handleClick = (): void => {
    if (!code) {
      return;
    }

    if (code !== promoCode) {
      setError(true);
      return;
    }

    if (onChange) {
      onChange(code.trim());
      setCode('');
    }
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <Input placeholder="Promo Code" type="text" value={code} onChange={handleChange} />
      <Button className={styles.button} sx={{ ml: 2 }} variant="contained" onClick={handleClick} disabled={!code}>
        Ok
      </Button>
      {error && <span className={styles.error}>Invalid promo code</span>}
    </div>
  );
};

export default PromoCode;
