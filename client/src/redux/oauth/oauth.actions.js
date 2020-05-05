import { FETCH_OAUTH_TRIGGER, HANDLE_STRIPE_TOKEN, SEND_SURVEY } from './oauth.types';

/* -------------------------------------------------------------------------- */

export const fetchOauth = () => ({
  type: FETCH_OAUTH_TRIGGER,
});

export const handleToken = (amount, token) => ({
  type: HANDLE_STRIPE_TOKEN,
  amount,
  token,
});

export const sendSurveyAndUpdateUser = values => ({
  type: SEND_SURVEY,
  values,
});
