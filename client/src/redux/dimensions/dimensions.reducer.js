import { createReducer } from 'redux/create-reducer';

import { SET_DIMENSIONS } from './dimensions.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const reducer = {
  [SET_DIMENSIONS]: (state, { width, height }) => ({ ...state, width, height }),
};

export const dimensionsReducer = createReducer(initialState, reducer);
