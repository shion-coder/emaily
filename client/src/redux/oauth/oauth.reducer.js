import { createReducer } from 'redux/create-reducer';

import { FETCH_OAUTH_START, FETCH_OAUTH_SUCCESS, FETCH_OAUTH_FAILURE } from './oauth.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  loading: false,
  data: null,
  isError: false,
  error: null,
};

const reducer = {
  [FETCH_OAUTH_START]: state => ({ ...state, loading: true, data: null, isError: false, error: null }),
  [FETCH_OAUTH_SUCCESS]: (state, payload) => ({ ...state, loading: false, data: payload || false }),
  [FETCH_OAUTH_FAILURE]: (state, payload) => ({ ...state, isError: true, error: payload }),
};

export const oauthReducer = createReducer(initialState, reducer);
