import { SET_DIMENSIONS } from './dimensions.types';

/* -------------------------------------------------------------------------- */

export const setDimensions = dimensions => ({
  type: SET_DIMENSIONS,
  payload: dimensions,
});
