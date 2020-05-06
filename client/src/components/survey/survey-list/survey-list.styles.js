import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

/* -------------------------------------------------------------------------- */

export const StyledCard = styled(Card)`
  margin-top: 2rem;
  background-color: whitesmoke;
  width: 80%;
`;

export const StyledCardHeader = styled(CardHeader)`
  color: #444;

  .MuiCardHeader-title {
    letter-spacing: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;
