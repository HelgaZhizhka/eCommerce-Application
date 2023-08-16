import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import styles from './Search.module.scss';

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Search: React.FC<Props> = ({ className }) => (
  <Input
    className={(styles.root, className)}
    type="search"
    startAdornment={
      <InputAdornment position="start">
        <Icon name={IconName.SEARCH} width={20} height={20} color="var(--gray)" className="icon" />
      </InputAdornment>
    }
  />
);

export default Search;
