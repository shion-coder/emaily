import { takeLatest, all, call, put, cancelled } from 'redux-saga/effects';

import { CancelToken } from 'axios';

import { getSurveys } from 'api/api';

import {
  FETCH_SURVEYS_TRIGGER,
  FETCH_SURVEYS_START,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAILURE,
} from './surveys.types';

/* -------------------------------------------------------------------------- */

const surveysStart = function*() {
  const source = CancelToken.source();

  yield put({ type: FETCH_SURVEYS_START });

  try {
    const data = yield call(getSurveys);

    yield put({ type: FETCH_SURVEYS_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      yield put({ type: FETCH_SURVEYS_FAILURE, payload: { ...error, message: 'Response Error !' } });
    } else if (error.request) {
      // The request was made but no response was received
      error.code === 'ECONNABORTED'
        ? yield put({ type: FETCH_SURVEYS_FAILURE, payload: { ...error, message: 'Network Timeout !' } })
        : yield put({ type: FETCH_SURVEYS_FAILURE, payload: { ...error, message: 'Network Error !' } });
    } else {
      // Something happened in setting up the request that triggered an Error
      yield put({ type: FETCH_SURVEYS_FAILURE, payload: { ...error, message: 'Error!' } });
    }
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
};

const getSurveysTrigger = function*() {
  yield takeLatest(FETCH_SURVEYS_TRIGGER, surveysStart);
};

/* -------------------------------------------------------------------------- */

export const surveysSaga = function*() {
  yield all([call(getSurveysTrigger)]);
};
