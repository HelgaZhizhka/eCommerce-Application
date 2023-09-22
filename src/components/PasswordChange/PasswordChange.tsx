import { useState, ReactElement } from 'react';
import { Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField as FormikTextField } from 'formik-material-ui';

import styles from './PasswordChange.module.scss';
import { validationSchema } from './validate';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

type InitialValuesType = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const initialValues: InitialValuesType = {
  currentPassword: '',
  newPassword: '',
  repeatNewPassword: '',
};

const PasswordChange: React.FC<Props> = ({ onSaveChange }) => {
  const [ShowRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [ShowNewPassword, setShowNewPassword] = useState(false);
  const [CurrentPassword, setCurrentPassword] = useState(false);

  const handleClickShowPassword = (
    isShow: boolean,
    setPasswordState: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setPasswordState(!isShow);
  };

  return (
    <Box sx={{ p: '30px', borderBottom: '3px solid grey' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Change password</h3>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }): void => {
          onSaveChange({ ...values, action: 'changePassword' });
          setSubmitting(false);
        }}
      >
        {({ isValid }): ReactElement => (
          <Form>
            <label className={styles.lablelTitle} htmlFor="currentPassword">
              Current password
            </label>
            <div className={styles.inputContainer}>
              <Field
                className={styles.field}
                type={CurrentPassword ? 'text' : 'password'}
                component={FormikTextField}
                name="currentPassword"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(): void => handleClickShowPassword(CurrentPassword, setCurrentPassword)}>
                        {CurrentPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <label className={styles.lablelTitle} htmlFor="newPassword">
              New password
            </label>
            <div className={styles.inputContainer}>
              <Field
                className={styles.field}
                type={ShowNewPassword ? 'text' : 'password'}
                component={FormikTextField}
                name="newPassword"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(): void => handleClickShowPassword(ShowNewPassword, setShowNewPassword)}>
                        {ShowNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <label className={styles.lablelTitle} htmlFor="repeatNewPassword">
              Repeat new password
            </label>
            <div className={styles.inputContainer}>
              <Field
                className={styles.field}
                type={ShowRepeatNewPassword ? 'text' : 'password'}
                component={FormikTextField}
                name="repeatNewPassword"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(): void => handleClickShowPassword(ShowRepeatNewPassword, setShowRepeatNewPassword)}
                      >
                        {ShowRepeatNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" type="submit" disabled={!isValid} sx={{ fontSize: '20px' }}>
                Save changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordChange;
