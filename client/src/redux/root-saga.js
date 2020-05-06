import { all, call } from 'redux-saga/effects';

import { oauthSaga } from 'redux/oauth/oauth.sagas';
import { surveysSaga } from 'redux/surveys/surveys.sagas';

/* -------------------------------------------------------------------------- */

export const rootSaga = function*() {
  yield all([call(oauthSaga), call(surveysSaga)]);
};
