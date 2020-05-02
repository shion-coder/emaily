import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { handleToken } from 'redux/oauth/oauth.actions';

import StripeCheckout from 'react-stripe-checkout';

import { StripeButton } from './stripe.styles';

/* -------------------------------------------------------------------------- */

const Stripe = ({ price, handleToken }) => {
  const priceForStripe = price * 100;

  return (
    <StripeCheckout
      name="Emaily"
      description="..."
      amount={priceForStripe}
      token={token => handleToken(priceForStripe, token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <StripeButton color="primary" variant="outlined">
        Add Credits
      </StripeButton>
    </StripeCheckout>
  );
};

/* -------------------------------------------------------------------------- */

Stripe.propTypes = {
  price: PropTypes.number,
  handleToken: PropTypes.func,
};

export default connect(null, { handleToken })(Stripe);
