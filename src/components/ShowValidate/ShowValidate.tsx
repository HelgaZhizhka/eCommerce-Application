import classNames from 'classnames';

import { Rule } from '../../schemas/rules';
import styles from './ShowValidate.module.scss';

// Live rule checklist driven by the field value + a rule list. Failing rules
// are red, passing ones muted — same UX as the legacy updateMessage version,
// without the per-field useState dictionaries.

type Props = {
  value: string;
  rules: Rule[];
};

const ShowValidate: React.FC<Props> = ({ value, rules }) => (
  <>
    {rules.map((rule) => (
      <div className={rule.test(value) ? classNames(styles.none) : classNames(styles.error)} key={rule.message}>
        {rule.message}
      </div>
    ))}
  </>
);

export default ShowValidate;
