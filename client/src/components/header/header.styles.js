import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* -------------------------------------------------------------------------- */

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
`;

export const Image = styled.img`
  height: 3rem;
  width: 3rem;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
`;

export const Container = styled.div``;

export const StyledButton = styled(Button)`
  letter-spacing: 0.2rem;
`;

export const StyledButtonTypography = styled(Typography)`
  letter-spacing: 0.2rem;
  margin-right: 1rem;
`;
