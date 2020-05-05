import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFormValues } from 'redux/form/form.selectors';
import { submitForm } from 'redux/form/form.actions';

import { Link } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { FIELD } from 'utils/form/form-field';

import { ButtonContainer, StyledButton } from './survey-form.styles';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  form: selectFormValues,
});

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      id={props.name}
      label={`${label} *`}
      {...field}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && !!meta.error && meta.error}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
};

const renderFields = () => FIELD.map(field => <MyTextInput key={field.name} {...field} />);

const SurveyForm = ({ onSurveySubmit, form: { title, subject, body, emails }, submitForm }) => (
  <Formik
    initialValues={{
      title: title || '',
      subject: subject || '',
      body: body || '',
      emails: emails || '',
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
      setSubmitting(false);
      onSurveySubmit();
      submitForm(values);
    }}
  >
    <Form>
      <Typography variant="h4" color="primary" align="center" paragraph>
        Create Campaign
      </Typography>
      {renderFields()}

      <ButtonContainer>
        <Link to="/surveys">
          <StyledButton variant="contained" color="secondary" size="large" endIcon={<CloseIcon />}>
            Cancel
          </StyledButton>
        </Link>

        <StyledButton type="submit" variant="contained" color="primary" size="large" endIcon={<NavigateNextIcon />}>
          Next
        </StyledButton>
      </ButtonContainer>
    </Form>
  </Formik>
);

/* -------------------------------------------------------------------------- */

SurveyForm.propTypes = {
  onSurveySubmit: PropTypes.func,
  form: PropTypes.object,
  submitForm: PropTypes.func,
};

export default connect(mapStateToProps, { submitForm })(SurveyForm);
