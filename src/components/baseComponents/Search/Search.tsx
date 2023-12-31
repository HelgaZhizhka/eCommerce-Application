import Input from '@mui/material/Input';
import { observer } from 'mobx-react-lite';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleClick = (): void => {
    if (onChange) {
      onChange();
    }
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
        value={searchValue}
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

export default observer(Search);
