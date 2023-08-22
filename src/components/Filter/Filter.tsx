import { FilterChip } from '../baseComponents/FilterChip';
import { FilterNestedList } from '../baseComponents/FilterNestedList';

const Filter: React.FC = () => {
  console.log('1');
  return (
    <div>
      <FilterNestedList />
      <FilterChip />
    </div>
  );
};

export default Filter;
