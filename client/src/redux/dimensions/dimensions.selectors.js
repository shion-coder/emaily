import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const dimensionsSelector = state => state.dimensions;

export const selectDimensionsWidth = createSelector([dimensionsSelector], dimensions => dimensions.width);

export const selectDimensionsHeight = createSelector([dimensionsSelector], dimensions => dimensions.height);
