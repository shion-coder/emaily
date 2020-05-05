import { takeLatest, all, call, put, cancelled } from 'redux-saga/effects';

import { CancelToken } from 'axios';

import { makeOauthRequest, makeChargeRequest, sendSurveyRequest } from 'api/api';

import {
  FETCH_OAUTH_TRIGGER,
  FETCH_OAUTH_START,
  FETCH_OAUTH_SUCCESS,
  FETCH_OAUTH_FAILURE,
  HANDLE_STRIPE_TOKEN,
  SEND_SURVEY,
} from './oauth.types';

/* -------------------------------------------------------------------------- */

const oauthStart = function*({ amount, token, values }) {
  const source = CancelToken.source();

  if (!amount && !token && !values) {
    yield put({ type: FETCH_OAUTH_START });
  }

  try {
    const data =
      amount && token
        ? yield call(makeChargeRequest, amount, token)
        : values
        ? yield call(sendSurveyRequest, values)
        : yield call(makeOauthRequest);

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
  yield takeLatest([FETCH_OAUTH_TRIGGER, HANDLE_STRIPE_TOKEN, SEND_SURVEY], oauthStart);
};

/* -------------------------------------------------------------------------- */

export const oauthSaga = function*() {
  yield all([call(getOauthTrigger)]);
};
