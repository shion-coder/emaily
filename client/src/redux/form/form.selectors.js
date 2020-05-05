import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const formSelector = state => state.form;

export const selectFormValues = createSelector([formSelector], form => form.values);
