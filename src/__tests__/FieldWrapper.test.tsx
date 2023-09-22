import { render } from '@testing-library/react';
import { Formik } from 'formik';
import FieldWrapper from '../components/baseComponents/FieldWrapper/FieldWrapper';

test('renders a label with the specified text', () => {
  const { getByText } = render(
    <Formik initialValues={{ username: '' }} onSubmit={(): void => {}}>
      <FieldWrapper label="Username" name="username" type="text" variant="outlined" />
    </Formik>
  );
  const labelElement = getByText('Username');
  expect(labelElement).toBeInTheDocument();
});

test('associates the label with the Field component', () => {
  const { getByLabelText } = render(
    <Formik initialValues={{ username: '' }} onSubmit={(): void => {}}>
      <FieldWrapper label="Username" name="username" type="text" variant="outlined" />
    </Formik>
  );
  const fieldElement = getByLabelText('Username');
  expect(fieldElement).toBeInTheDocument();
});
