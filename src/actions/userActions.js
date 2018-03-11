import * as types from 'constants/actions';
import Rest from 'helpers/rest';
import store from 'store/configureStore';

let _getAuthHeader = (email, password) => {
  return 'Basic ' + btoa(email + ':' + password);
};

export const login = (email, password) => async dispatch => {
  const auth = _getAuthHeader(email, password);
  try {
    dispatch(loginRequestStarted());
    const authToken = await Rest.post(
      store.getState().metaData.baseUrl + '/login',
      auth,
    );
    dispatch({
      type: types.LOGIN,
      authToken,
    });
    dispatch(loginRequestEnded());
  } catch (e) {
    dispatch({
      type: types.SET_GLOBAL_ERROR,
      error: e,
    });
    dispatch(loginRequestEnded());
  }
};

export const loginRequestStarted = () => ({
  type: types.LOGIN_REQUEST_STARTED,
});

export const loginRequestEnded = () => ({
  type: types.LOGIN_REQUEST_ENDED,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const setAuthToken = authToken => ({
  type: types.SET_AUTH_TOKEN,
  authToken,
});

export const setUser = user => ({
  type: types.SET_USER,
  user,
});
