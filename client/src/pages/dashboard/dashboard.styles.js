import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';

/* -------------------------------------------------------------------------- */

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 4rem;
  box-sizing: border-box;
`;

export const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 4.5rem;
  right: 2rem;
`;
