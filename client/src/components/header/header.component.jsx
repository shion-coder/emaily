import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOauthData } from 'redux/oauth/oauth.selectors';

import { Link } from 'react-router-dom';

import Stripe from 'components/stripe/stripe.component';

import logo from 'assets/images/logo.png';

import { HeaderContainer, Image, Container, StyledButton, StyledButtonTypography } from './header.styles';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  oauthData: selectOauthData,
});

const Header = ({ oauthData }) => (
  <HeaderContainer>
    <Link to={oauthData ? '/surveys' : '/'}>
      <Image src={logo} alt="Logo" />
    </Link>

    {oauthData === null ? null : oauthData === false ? (
      <StyledButton href="/auth/google" color="primary" variant="outlined">
        Login
      </StyledButton>
    ) : (
      <Container>
        <Stripe price="5" />

        <StyledButtonTypography variant="button" color="primary">
          Credits: {oauthData.credits}
        </StyledButtonTypography>

        <StyledButton href="/api/logout" color="primary">
          Logout
        </StyledButton>
      </Container>
    )}
  </HeaderContainer>
);

/* -------------------------------------------------------------------------- */

Header.propTypes = {
  oauthData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default connect(mapStateToProps)(Header);
