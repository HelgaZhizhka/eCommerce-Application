import React, { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import classNames from 'classnames';
import { Message, RegistrationFormValuesThird, FieldInputthird } from './registration.interface';
import styles from './registration.module.scss';
import ShowRegistrationValidate from './ShowRegistrationValidate';
import { validate } from '../../utils/validate/thirdWindow';
import { Data } from '../../pages/Registration/reg.interface';

const initialValues: RegistrationFormValuesThird = {
  streetShipping: '',
  cityShipping: '',
  postalCodeShipping: '',
  countryShipping: '',
  streetBilling: '',
  cityBilling: '',
  postalCodeBilling: '',
  countryBilling: '',
  checkedShippingDefault: false,
  checkedAddBillingForm: false,
  checkedBillingDefault: false,
};

interface LoginProps {
  userData: {
    setWindowPge: React.Dispatch<React.SetStateAction<number>>;
    setData: React.Dispatch<React.SetStateAction<Data>>;
  };
}

const options = [
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'USA', label: 'USA' },
];

const RegistrationFormThirdWindow: React.FC<LoginProps> = ({ userData }) => {
  const { setData, setWindowPge } = userData;
  const [streetShippingMessage, setStreetShippingMessage] = useState<Message>({});
  const [cityShippingMessage, setCityShippingMessage] = useState<Message>({});
  const [postalCodeShippingMessage, setPostalCodeShippingMessage] = useState<Message>({});

  const [streetBillingMessage, setStreetBillingMessage] = useState<Message>({});
  const [cityBillingMessage, setCityBillingMessage] = useState<Message>({});
  const [postalCodeBillingMessage, setPostalCodeBillingMessage] = useState<Message>({});

  const [inputStartedStreetShipping, setInputStartedStreetShipping] = useState(false);
  const [inputStartedCityShipping, setInputStartedCityShipping] = useState(false);
  const [inputStartedPostalCodeShipping, setInputStartedPostalCodeShipping] = useState(false);

  const [inputStartedStreetBilling, setInputStartedStreetBilling] = useState(false);
  const [inputStartedCityBilling, setInputStartedCityBilling] = useState(false);
  const [inputStartedPostalCodeBilling, setInputStartedPostalCodeBilling] = useState(false);

  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const updateMessage = (type: FieldInputthird, key: string, value: boolean): void => {
    let setter: React.Dispatch<React.SetStateAction<Message>> | null = null;

    switch (type) {
      case 'streetShipping':
        setter = setStreetShippingMessage;
        break;
      case 'cityShipping':
        setter = setCityShippingMessage;
        break;
      case 'postalCodeShipping':
        setter = setPostalCodeShippingMessage;
        break;
      case 'streetBilling':
        setter = setStreetBillingMessage;
        break;
      case 'cityBilling':
        setter = setCityBillingMessage;
        break;
      case 'postalCodeBilling':
        setter = setPostalCodeBillingMessage;
        break;

      default:
        break;
    }
    if (setter) {
      setter((prevMessage) => ({
        ...prevMessage,
        [key]: value,
      }));
    }
  };

  const areAllValuesFalse = (obj: Record<string, boolean>): boolean => {
    if (Object.keys(obj).length === 0) {
      return false;
    }
    return Object.values(obj).every((value) => value === false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValuesThird> => {
          const errors = validate(values, updateMessage);
          setAllFieldsValid(
            areAllValuesFalse(streetShippingMessage) &&
              areAllValuesFalse(cityShippingMessage) &&
              areAllValuesFalse(postalCodeShippingMessage)
          );
          return errors;
        }}
        onSubmit={(values, { setSubmitting }): void => {
          setData((prevData) => ({
            ...prevData,
            ...values,
          }));
          setSubmitting(false);
        }}
      >
        {({ values, submitForm, isSubmitting }): JSX.Element => (
          <Form>
            <h3>Shipping address:</h3>
            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                name="streetShipping"
                type="text"
                label="Street"
                variant="standard"
                fullWidth
                onFocus={(): void => setInputStartedStreetShipping(true)}
              />
              {inputStartedStreetShipping && <ShowRegistrationValidate validate={streetShippingMessage} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type="text"
                label="City"
                name="cityShipping"
                variant="standard"
                fullWidth
                margin="normal"
                onFocus={(): void => setInputStartedCityShipping(true)}
              />

              {inputStartedCityShipping && <ShowRegistrationValidate validate={cityShippingMessage} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                margin="normal"
                label="Country"
                name="countryShipping"
                variant="standard"
                fullWidth
                multiple
                select
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type="number"
                name="postalCodeShipping"
                variant="standard"
                fullWidth
                margin="normal"
                label="Postal code"
                disabled={!values.countryShipping.length}
                onFocus={(): void => setInputStartedPostalCodeShipping(true)}
              />

              {inputStartedPostalCodeShipping && <ShowRegistrationValidate validate={postalCodeShippingMessage} />}
            </div>
            <div className={classNames(styles.checkboxWrap)}>
              <label>
                <Field type="checkbox" name="checkedShippingDefault" />
                <span className={classNames(styles.inputTitle)}>Use default</span>
              </label>
              <label>
                <Field type="checkbox" name="checkedAddBillingForm" />
                <span className={classNames(styles.inputTitle)}>Use this address for billing </span>
              </label>

              {values.checkedAddBillingForm && (
                <div className={classNames(styles.billingWrap)}>
                  <h3>Billing address:</h3>
                  <div className={classNames(styles.inputContainer)}>
                    <Field
                      component={FormikTextField}
                      name="streetBilling"
                      type="text"
                      label="Street"
                      variant="standard"
                      fullWidth
                      onFocus={(): void => setInputStartedStreetBilling(true)}
                    />
                    {inputStartedStreetBilling && <ShowRegistrationValidate validate={streetBillingMessage} />}
                  </div>

                  <div className={classNames(styles.inputContainer)}>
                    <Field
                      component={FormikTextField}
                      type="text"
                      label="City"
                      name="cityBilling"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      onFocus={(): void => setInputStartedCityBilling(true)}
                    />

                    {inputStartedCityBilling && <ShowRegistrationValidate validate={cityBillingMessage} />}
                  </div>

                  <div className={classNames(styles.inputContainer)}>
                    <Field
                      component={FormikTextField}
                      margin="normal"
                      label="Country"
                      name="countryBilling"
                      variant="standard"
                      fullWidth
                      multiple
                      select
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>

                  <div className={classNames(styles.inputContainer)}>
                    <Field
                      component={FormikTextField}
                      type="number"
                      name="postalCodeBilling"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      label="Postal code"
                      disabled={!values.countryBilling.length}
                      onFocus={(): void => setInputStartedPostalCodeBilling(true)}
                    />

                    {inputStartedPostalCodeBilling && <ShowRegistrationValidate validate={postalCodeBillingMessage} />}
                  </div>
                  <label>
                    <Field type="checkbox" name="checkedBillingDefault" />
                    <span className={classNames(styles.inputTitle)}>Use default</span>
                  </label>
                </div>
              )}
            </div>
            <div className={classNames(styles.progressContainer)}>
              <div className={classNames(styles.progress)}></div>
              <div className={classNames(styles.progress)}></div>
              <div className={classNames(styles.progress, styles.progressActive)}></div>
            </div>

            <div className={classNames(styles.btnLogin)}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !allFieldsValid}
                onClick={(): void => {
                  submitForm();
                }}
              >
                Sing in!
              </Button>
            </div>
            <Button
              sx={{ fontSize: '1rem' }}
              variant="outlined"
              fullWidth
              color="primary"
              onClick={(): void => {
                setWindowPge((prev) => prev - 1);
              }}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationFormThirdWindow;
