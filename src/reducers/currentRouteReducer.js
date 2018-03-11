import createReducer from 'helpers/createReducer';
import * as types from 'constants/actions';

const defaultCurrentRoute = {};

export const currentRoute = createReducer(defaultCurrentRoute, {
  [types.SET_CURRENT_ROUTE](state, action) {
    if (typeof action.route === 'object') {
      return action.route;
    }
    return state;
  },
});
