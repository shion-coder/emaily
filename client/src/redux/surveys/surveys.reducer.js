import { createReducer } from 'redux/create-reducer';

import { FETCH_SURVEYS_START, FETCH_SURVEYS_SUCCESS, FETCH_SURVEYS_FAILURE } from './surveys.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  loading: false,
  data: [],
  isError: false,
  error: null,
};

const reducer = {
  [FETCH_SURVEYS_START]: state => ({ ...state, loading: true, data: [], isError: false, error: null }),
  [FETCH_SURVEYS_SUCCESS]: (state, payload) => ({ ...state, loading: false, data: payload }),
  [FETCH_SURVEYS_FAILURE]: (state, payload) => ({ ...state, isError: true, error: payload }),
};

export const surveysReducer = createReducer(initialState, reducer);
