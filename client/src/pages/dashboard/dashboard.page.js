import React from 'react';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { Container, StyledFab } from './dashboard.styles';

/* -------------------------------------------------------------------------- */

const Dashboard = () => (
  <Container>
    <Typography variant="h2" color="primary">
      Dashboard
    </Typography>

    <Link to="/surveys/new">
      <StyledFab size="large" color="primary" aria-label="add">
        <AddIcon />
      </StyledFab>
    </Link>
  </Container>
);

/* -------------------------------------------------------------------------- */

export default Dashboard;
