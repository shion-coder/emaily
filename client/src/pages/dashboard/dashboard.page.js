import React from 'react';

import { Link } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

import SurveyList from 'components/survey/survey-list/survey-list.component';

import { Container, StyledFab } from './dashboard.styles';

/* -------------------------------------------------------------------------- */

const Dashboard = () => (
  <Container>
    <SurveyList />

    <Link to="/surveys/new">
      <StyledFab size="large" color="primary" aria-label="add">
        <AddIcon />
      </StyledFab>
    </Link>
  </Container>
);

/* -------------------------------------------------------------------------- */

export default Dashboard;
