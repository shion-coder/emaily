import React from 'react';

import Typography from '@material-ui/core/Typography';

import { Container } from './landing.styles';

/* -------------------------------------------------------------------------- */

const Landing = () => (
  <Container>
    <Typography variant="h2" color="primary">
      Emaily
    </Typography>

    <Typography variant="subtitle1" color="textSecondary">
      Collect feedback form your users
    </Typography>
  </Container>
);

/* -------------------------------------------------------------------------- */

export default Landing;
