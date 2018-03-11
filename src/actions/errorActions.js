import * as types from 'constants/actions';

export const setGlobalError = error => dispatch => {
  dispatch({
    type: types.SET_GLOBAL_ERROR,
    error,
  });
};
