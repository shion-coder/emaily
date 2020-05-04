import React from 'react';

import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { Container, StyledFab } from './dashboard.styles';

/* -------------------------------------------------------------------------- */

const Dashboard = () => (
  <Container>
    <Typography variant="h2" color="primary">
      Dashboard
    </Typography>

    <StyledFab size="large" color="primary" aria-label="add">
      <AddIcon />
    </StyledFab>
  </Container>
);

/* -------------------------------------------------------------------------- */

export default Dashboard;
