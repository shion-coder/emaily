import { FETCH_OAUTH_TRIGGER, HANDLE_STRIPE_TOKEN } from './oauth.types';

/* -------------------------------------------------------------------------- */

export const fetchOauth = () => ({
  type: FETCH_OAUTH_TRIGGER,
});

export const handleToken = (amount, token) => ({
  type: HANDLE_STRIPE_TOKEN,
  amount,
  token,
});
