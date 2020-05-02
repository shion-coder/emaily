import styled from 'styled-components';
import tw from 'tailwind.macro';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* -------------------------------------------------------------------------- */

export const HeaderContainer = styled.div`
  ${tw`flex justify-between items-center px-5 py-5`}
`;

export const Image = styled.img`
  ${tw`h-12 w-12 object-contain object-center cursor-pointer`}
`;

export const Container = styled.div``;

export const StyledButton = styled(Button)`
  letter-spacing: 0.2rem;
`;

export const StyledButtonTypography = styled(Typography)`
  letter-spacing: 0.2rem;
  margin-right: 1rem;
`;
