import Input from '@mui/material/Input';
import { useState } from 'react';
import { Button } from '@mui/material';

import styles from './PromoCode.module.scss';

type Props = {
  className?: string;
  onChange?: (code: string) => void;
};

const PromoCode: React.FC<Props> = ({ className, onChange }) => {
  const [code, setCode] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  const handleClick = (): void => {
    if (onChange) {
      onChange(code.trim());
      setCode('');
    }
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <Input placeholder="Promo Code" type="text" value={code} onChange={handleChange} />
      <Button className={styles.button} sx={{ ml: 2 }} variant="contained" onClick={handleClick}>
        Ok
      </Button>
    </div>
  );
};

export default PromoCode;
