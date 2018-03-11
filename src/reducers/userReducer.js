import createReducer from 'helpers/createReducer';
import * as types from 'constants/actions';

const defaultUser = {
  user: null,
  authToken: null,
};

export const user = createReducer(defaultUser, {
  [types.LOGIN](state, action) {
    return Object.assign({}, state, {
      authToken: action.authToken,
    });
  },
  [types.LOGOUT](state, action) {
    return Object.assign({}, state, {
      authToken: null,
    });
  },
  [types.SET_AUTH_TOKEN](state, action) {
    return Object.assign({}, state, {
      authToken: action.authToken,
    });
  },
  [types.SET_USER](state, action) {
    return Object.assign({}, state, {
      user: action.user,
    });
  },
});
