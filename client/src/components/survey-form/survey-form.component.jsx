import React from 'react';

import { Link } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';

import { ButtonContainer, StyledButton } from './survey-form.styles';

/* -------------------------------------------------------------------------- */

const FIELD = [
  { label: 'Survey Title', name: 'title', type: 'text' },
  { label: 'Subject Line', name: 'subject', type: 'text' },
  { label: 'Email Body', name: 'body', type: 'text' },
  { label: 'Recipient List', name: 'emails', type: 'text' },
];

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      id={props.name}
      label={`${label} *`}
      error={meta.touched && !!meta.error}
      helperText={meta.error}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
};

const renderFields = () => FIELD.map(field => <MyTextInput key={field.name} {...field} />);

const SurveyForm = () => (
  <Formik
    initialValues={{
      title: '',
      subject: '',
      body: '',
      emails: '',
    }}
    validationSchema={Yup.object({
      title: Yup.string().required('Required'),
      subject: Yup.string().required('Required'),
      body: Yup.string().required('Required'),
      emails: Yup.array()
        .transform(function(value, originalValue) {
          if (this.isType(value) && value !== null) {
            return value;
          }

          return originalValue ? originalValue.split(/[\s,]+/) : [];
        })
        .of(Yup.string().email(({ value }) => `${value} is not a valid email. `))
        .required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form>
      {renderFields()}

      <ButtonContainer>
        <Link to="/surveys">
          <StyledButton variant="contained" color="secondary" size="large">
            Cancel
          </StyledButton>
        </Link>

        <StyledButton type="submit" variant="contained" color="primary" size="large">
          Submit
        </StyledButton>
      </ButtonContainer>
    </Form>
  </Formik>
);

/* -------------------------------------------------------------------------- */

export default SurveyForm;
