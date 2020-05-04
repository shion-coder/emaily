import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';

/* -------------------------------------------------------------------------- */

export const Container = styled.div`
  position: relative;
  height: 100%;
  padding-top: 4rem;
  text-align: center;
  box-sizing: border-box;
`;

export const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
`;
