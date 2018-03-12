import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_RESET_PASSWORD } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});
export const userReset = resetMessage => ({
  type: USER_RESET_PASSWORD,
  resetMessage
});

export const login = credentials => dispatch => api.user.login(credentials).then((user) => {
  localStorage.recipesJWT = user['Access token'];
  localStorage.email = user.email;
  dispatch(userLoggedIn(user));
},);

export const logout = token => (dispatch) => {
  api.user.logout(token);
  localStorage.removeItem('recipesJWT');
  dispatch(userLoggedOut());
};

export const reset = resetData => dispatch => api.user.reset(resetData).then((resetMessage) => {
  api.user.logout(localStorage.getItem('recipesJWT'));
  localStorage.removeItem('recipesJWT');
  dispatch(userLoggedOut());
  dispatch(userReset(resetMessage));
},);
