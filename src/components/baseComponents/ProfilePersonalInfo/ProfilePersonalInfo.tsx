import * as React from 'react';
import { Field, Form } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';

import styles from './ProfilePersonalInfo.module.scss';

const ProfilePersonalInfo: React.FC = () => {
  console.log('1');
  return (
    <Form>
      <label className={styles.lablelTitle} htmlFor="firstName">
        First Name
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="firstName"
          name="firstName"
          variant="standard"
        />
      </div>
      <label className={styles.lablelTitle} htmlFor="lastName">
        Last name:
      </label>
      <div className={styles.inputContainer}>
        <Field className={styles.field} component={FormikTextField} id="lastName" name="lastName" variant="standard" />
      </div>
      <label className={styles.lablelTitle} htmlFor="birthDate">
        Date of birth:
      </label>
      <div className={styles.inputContainer}>
        <Field
          className={styles.field}
          component={FormikTextField}
          id="birthDate"
          name="birthDate"
          type="date"
          variant="standard"
        />
      </div>
    </Form>
  );
};

export default ProfilePersonalInfo;
