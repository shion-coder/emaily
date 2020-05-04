import React from 'react';

import { FooterContainer, StyledTypography } from './footer.styles';

/* -------------------------------------------------------------------------- */

const Footer = () => (
  <FooterContainer>
    <StyledTypography variant="subtitle2" color="primary">
      &copy; 2020
    </StyledTypography>

    <StyledTypography variant="subtitle2" color="primary">
      |
    </StyledTypography>

    <StyledTypography variant="subtitle2" color="primary">
      Shion
    </StyledTypography>
  </FooterContainer>
);

/* -------------------------------------------------------------------------- */

export default Footer;
