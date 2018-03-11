import { combineReducers } from 'redux';

import * as errorsReducer from 'reducers/errorsReducer';
import * as currentRouteReducer from 'reducers/currentRouteReducer';
import * as userReducer from 'reducers/userReducer';
import * as metaDataReducer from 'reducers/metaDataReducer';
import * as sheetDataReducer from 'reducers/sheetDataReducer';
import * as requestsReducer from 'reducers/requestsReducer';

export default combineReducers(
  Object.assign(
    currentRouteReducer,
    errorsReducer,
    userReducer,
    metaDataReducer,
    sheetDataReducer,
    requestsReducer,
  ),
);
