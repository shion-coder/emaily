import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { submitForm } from 'redux/form/form.actions';

import SurveyForm from 'components/survey-form/survey-form.component';
import SurveyReview from 'components/survey-review/survey-review.component';

import { Container } from './survey-new.styles';

/* -------------------------------------------------------------------------- */

const SurveyNew = ({ submitForm }) => {
  useEffect(() => {
    return () => submitForm();
  }, [submitForm]);

  const [showReview, setShowReview] = useState(false);

  return (
    <Container>
      {showReview ? (
        <SurveyReview onCancel={() => setShowReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowReview(true)} />
      )}
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

SurveyNew.propTypes = {
  submitForm: PropTypes.func,
};

export default connect(null, { submitForm })(SurveyNew);
