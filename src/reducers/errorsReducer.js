import createReducer from 'helpers/createReducer';
import * as types from 'constants/actions';

const defaultErrors = {
  globalError: null,
};

export const errors = createReducer(defaultErrors, {
  [types.SET_GLOBAL_ERROR](state, action) {
    if (action.error) {
      return Object.assign({}, state, {
        globalError: action.error.message,
      });
    }
    return state;
  },
  [types.REMOVE_GLOBAL_ERROR](state, action) {
    return Object.assign({}, state, {
      globalError: null,
    });
  },
});
