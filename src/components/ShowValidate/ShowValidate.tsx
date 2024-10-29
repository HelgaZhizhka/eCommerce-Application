import classNames from 'classnames';

import { Message } from '../LoginForm/LoginForm';
import styles from './ShowValidate.module.scss';

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
