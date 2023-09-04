import { useState } from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { productStore } from '../../../stores';
import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import styles from './Search.module.scss';

type Props = {
  className?: string;
  onChange?: () => void;
};

const Search: React.FC<Props> = ({ className, onChange }) => {
  const { searchValue, setSearchValue } = productStore;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  function handleClick(): void {
    if (onChange) {
      onChange();
    }
  }
  return (
    <div className={`${styles.root} ${className}`}>
      <Input
        className={styles.input}
        type="search"
        value={searchValue}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <Icon name={IconName.SEARCH} width={20} height={20} color="var(--gray)" className="icon" />
          </InputAdornment>
        }
      />
      <Button className={styles.button} sx={{ position: 'absolute' }} variant="contained" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default observer(Search);
