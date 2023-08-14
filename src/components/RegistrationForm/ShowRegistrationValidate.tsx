import classNames from 'classnames';

import styles from './Registration.module.scss';
import { Message } from './Registration.interface';

const ShowValidate = ({ validate }: { validate: Message }): JSX.Element => {
  const conditions = Object.keys(validate);
  return (
    <>
      {conditions.map((condition, index) => (
        <div
          className={validate[condition] ? classNames(styles.error) : classNames(styles.none)}
          key={condition + index}
        >
          {condition}
        </div>
      ))}
    </>
  );
};

export default ShowValidate;
