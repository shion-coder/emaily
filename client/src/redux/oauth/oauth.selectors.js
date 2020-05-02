import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const oauthSelector = state => state.oauth;

export const selectOauthData = createSelector([oauthSelector], oauth => oauth.data);
