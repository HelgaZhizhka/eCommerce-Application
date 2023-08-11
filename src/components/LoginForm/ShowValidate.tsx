import classNames from 'classnames';
import { Message } from './LoginForm';
import styles from './login.module.scss';

const ShowValidate = ({ validEmail }: { validEmail: Message }): JSX.Element => {
  const conditions = Object.keys(validEmail);
  return (
    <>
      {conditions.map((condition, index) => (
        <div
          className={validEmail[condition] ? classNames(styles.error) : classNames(styles.none)}
          key={condition + index}
        >
          {condition}
        </div>
      ))}
    </>
  );
};

export default ShowValidate;
