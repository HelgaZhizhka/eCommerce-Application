import { Select, SelectContent, SelectItem, SelectTrigger } from '../baseComponents/Select';
import { SortOption } from '../baseComponents/SortingList/SortList.enum';

type Props = {
  className?: string;
  value: SortOption;
  onSelect: (sort: SortOption) => void;
};

const Sorting: React.FC<Props> = ({ className, value, onSelect }) => (
  <div className={className}>
    <Select value={value} onValueChange={(sort): void => onSelect(sort as SortOption)}>
      <SelectTrigger aria-label="Sorting" className="w-full border-primary bg-primary text-white hover:bg-primary/90">
        <span>Sorting by: {value}</span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(SortOption).map((sort) => (
          <SelectItem key={sort} value={sort}>
            {sort}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default Sorting;
