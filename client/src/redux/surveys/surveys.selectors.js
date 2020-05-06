import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const surveysSelector = state => state.surveys;

export const selectSurveyLoading = createSelector([surveysSelector], surveys => surveys.loading);

export const selectSurveysData = createSelector([surveysSelector], surveys => surveys.data);
