import axios from 'axios';
import axiosRetry from 'axios-retry';

/* -------------------------------------------------------------------------- */

// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export const makeOauthRequest = async () => {
  const { data } = await axios.get('/api/current-user');

  return data;
};

export const makeChargeRequest = async (amount, token) => {
  const { data } = await axios.post('/api/stripe', {
    amount,
    token,
  });

  return data;
};

export const sendSurveyRequest = async values => {
  const { data } = await axios.post('/api/surveys', values);

  return data;
};

export const getSurveys = async () => {
  const { data } = await axios.get('/api/surveys');

  return data;
};
