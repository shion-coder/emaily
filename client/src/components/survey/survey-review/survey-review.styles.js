import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* -------------------------------------------------------------------------- */

export const Container = styled.div`
  display: flex;
  width: 800px;
  padding-top: 2rem;
  flex-direction: column;
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 2rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 1rem;
  padding: 0.5rem 3rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
