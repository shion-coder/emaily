import { createReducer } from 'redux/create-reducer';

import { SUBMIT_FORM } from './form.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  values: {},
};

const reducer = {
  [SUBMIT_FORM]: (state, payload) => ({ ...state, values: { ...payload } }),
};

export const formReducer = createReducer(initialState, reducer);
