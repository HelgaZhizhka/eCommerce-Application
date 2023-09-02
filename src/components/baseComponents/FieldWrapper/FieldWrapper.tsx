import { Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import styles from './FieldWrapper.module.scss';

type Props = {
  label: string;
  name: string;
  type: string;
  variant: string;
};

const FieldWrapper: React.FC<Props> = ({ label, name, type, variant }) => (
  <div className={styles.fieldWrapper}>
    <label className={styles.labelTitle} htmlFor={name}>
      {label}
    </label>
    <div className={styles.inputContainer}>
      <Field className={styles.field} component={FormikTextField} id={name} name={name} type={type} variant={variant} />
    </div>
  </div>
);

export default FieldWrapper;
