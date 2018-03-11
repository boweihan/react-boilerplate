import * as types from 'constants/actions';

export const setCurrentRoute = route => dispatch => {
  dispatch({
    type: types.REMOVE_GLOBAL_ERROR,
  });
  dispatch({
    type: types.SET_CURRENT_ROUTE,
    route,
  });
};
