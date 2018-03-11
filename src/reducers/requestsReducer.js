import createReducer from 'helpers/createReducer';
import * as types from 'constants/actions';

const defaultRequests = {
  loginRequestInProgress: false,
};

export const requests = createReducer(defaultRequests, {
  [types.LOGIN_REQUEST_STARTED](state, action) {
    return Object.assign({}, state, {
      loginRequestInProgress: true,
    });
  },
  [types.LOGIN_REQUEST_ENDED](state, action) {
    return Object.assign({}, state, {
      loginRequestInProgress: false,
    });
  },
});
