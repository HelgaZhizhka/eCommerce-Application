import { useEffect, useState } from 'react';
import { Input, InputAdornment, Button } from '@mui/material';

import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import styles from './Search.module.scss';

type Props = {
  className?: string;
  value: string;
  onSearch: (text: string) => void;
};

const Search: React.FC<Props> = ({ className, value, onSearch }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const handleClick = (): void => {
    onSearch(text);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <Input
        className={styles.input}
        type="search"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <Icon name={IconName.SEARCH} width={20} height={20} color="var(--gray)" className="icon" />
          </InputAdornment>
        }
      />
      <Button className={styles.button} sx={{ ml: 2 }} variant="contained" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default Search;
