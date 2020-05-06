import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFormValues } from 'redux/form/form.selectors';
import { sendSurveyAndUpdateUser } from 'redux/oauth/oauth.actions';

import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { FIELD } from 'utils/form/form-field';

import { Container, StyledTypography, ButtonContainer, StyledButton } from './survey-review.styles';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  form: selectFormValues,
});

const SurveyReview = ({ onCancel, form, sendSurveyAndUpdateUser }) => {
  const history = useHistory();

  const renderFields = () =>
    FIELD.map(({ label, name }) => (
      <Grid key={name}>
        <Typography variant="body1" color="primary" paragraph>
          <strong>{`${label}: `}</strong>
          {form[name]}
        </Typography>
      </Grid>
    ));

  const handleSubmit = () => {
    sendSurveyAndUpdateUser(form);
    history.push('/surveys');
  };

  return (
    <Container>
      <StyledTypography variant="h4" color="secondary" align="center">
        Please confirm your entries
      </StyledTypography>

      {renderFields()}

      <ButtonContainer>
        <StyledButton variant="contained" color="secondary" size="large" endIcon={<ArrowBackIcon />} onClick={onCancel}>
          Back
        </StyledButton>

        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<MailOutlineIcon />}
          onClick={handleSubmit}
        >
          Send Survey
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

SurveyReview.propTypes = {
  onCancel: PropTypes.func,
  form: PropTypes.object,
};

export default connect(mapStateToProps, { sendSurveyAndUpdateUser })(SurveyReview);
