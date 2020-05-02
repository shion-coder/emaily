import { takeLatest, all, call, put, cancelled } from 'redux-saga/effects';

import { CancelToken } from 'axios';

import { makeOauthRequest, makeChargeRequest } from 'api/api';

import {
  FETCH_OAUTH_TRIGGER,
  FETCH_OAUTH_START,
  FETCH_OAUTH_SUCCESS,
  FETCH_OAUTH_FAILURE,
  HANDLE_STRIPE_TOKEN,
} from './oauth.types';

/* -------------------------------------------------------------------------- */

const oauthStart = function*({ amount, token }) {
  const source = CancelToken.source();

  if (!amount && !token) {
    yield put({ type: FETCH_OAUTH_START });
  }

  try {
    const data = amount && token ? yield call(makeChargeRequest, amount, token) : yield call(makeOauthRequest);

    yield put({ type: FETCH_OAUTH_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      yield put({ type: FETCH_OAUTH_FAILURE, payload: { ...error, message: 'Response Error !' } });
    } else if (error.request) {
      // The request was made but no response was received
      error.code === 'ECONNABORTED'
        ? yield put({ type: FETCH_OAUTH_FAILURE, payload: { ...error, message: 'Network Timeout !' } })
        : yield put({ type: FETCH_OAUTH_FAILURE, payload: { ...error, message: 'Network Error !' } });
    } else {
      // Something happened in setting up the request that triggered an Error
      yield put({ type: FETCH_OAUTH_FAILURE, payload: { ...error, message: 'Error!' } });
    }
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
};

const getOauthTrigger = function*() {
  yield takeLatest([FETCH_OAUTH_TRIGGER, HANDLE_STRIPE_TOKEN], oauthStart);
};

/* -------------------------------------------------------------------------- */

export const oauthSaga = function*() {
  yield all([call(getOauthTrigger)]);
};
