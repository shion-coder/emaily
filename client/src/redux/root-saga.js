import { all, call } from 'redux-saga/effects';

import { oauthSaga } from 'redux/oauth/oauth.sagas';
/* -------------------------------------------------------------------------- */

export const rootSaga = function*() {
  yield all([call(oauthSaga)]);
};
