import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSurveyLoading, selectSurveysData } from 'redux/surveys/surveys.selectors';
import { fetchSurveys } from 'redux/surveys/surveys.actions';

import Loader from 'components/loader/loader.component';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { StyledCard, StyledCardHeader } from './survey-list.styles';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  loading: selectSurveyLoading,
  surveys: selectSurveysData,
});

const SurveyList = ({ loading, surveys, fetchSurveys }) => {
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const renderSurveys = () =>
    surveys.reverse().map(({ _id, title, body, dateSent, totalEmails, yes, no }) => (
      <StyledCard key={_id}>
        <StyledCardHeader title={title} subheader={`Sent on: ${new Date(dateSent).toLocaleDateString()}`} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2" color="textSecondary" component="p">
            Total: {totalEmails}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Yes: {yes}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            No: {no}
          </Typography>
        </CardActions>
      </StyledCard>
    ));

  return (
    <>
      <Typography variant="h4" color="primary">
        Survey List
      </Typography>
      {loading ? <Loader /> : renderSurveys()}
    </>
  );
};

/* -------------------------------------------------------------------------- */

SurveyList.propTypes = {
  surveys: PropTypes.array,
  fetchSurveys: PropTypes.func,
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
