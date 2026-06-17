import { useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import { cn } from '../../../shared/lib/cn';

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
    <div className={cn('flex items-center md:relative', className)}>
      <div className="relative flex w-full items-center">
        <Icon
          name={IconName.SEARCH}
          width={20}
          height={20}
          color="var(--gray)"
          className="icon pointer-events-none absolute left-2"
        />
        <input
          type="search"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full border-b border-gray bg-transparent py-1 pl-9 text-xl outline-none focus:border-primary"
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="ml-4 shrink-0 rounded bg-primary px-4 py-1.5 text-white transition-colors hover:bg-primary/85"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
