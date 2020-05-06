import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { dimensionsReducer } from 'redux/dimensions/dimensions.reducer';
import { themeReducer } from 'redux/theme/theme.reducer';
import { oauthReducer } from 'redux/oauth/oauth.reducer';
import { formReducer } from 'redux/form/form.reducer';
import { surveysReducer } from 'redux/surveys/surveys.reducer';

/* -------------------------------------------------------------------------- */

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['theme', 'form'],
};

const reducer = combineReducers({
  dimensions: dimensionsReducer,
  theme: themeReducer,
  oauth: oauthReducer,
  form: formReducer,
  surveys: surveysReducer,
});

export const rootReducer = persistReducer(persistConfig, reducer);
