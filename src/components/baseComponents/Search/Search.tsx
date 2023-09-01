import { useState } from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import styles from './Search.module.scss';
import { productStore } from '../../../stores';

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Search: React.FC<Props> = ({ className }) => {
  const { setSearchValue } = productStore;
  const [inputValue, setInputValue] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleClick(): void {
    setSearchValue(inputValue);
    setInputValue('');
  }
  return (
    <>
      <Input
        className={(styles.root, className)}
        type="search"
        value={inputValue}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <Icon name={IconName.SEARCH} width={20} height={20} color="var(--gray)" className="icon" />
          </InputAdornment>
        }
      />
      <Button variant="contained" onClick={handleClick}>
        Search
      </Button>
    </>
  );
};

export default observer(Search);
