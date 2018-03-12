import { GET_USER_CATEGORIES } from '../types';
import { userLoggedOut } from './auth';
import api from '../api';

export const allUserCategories = categories => ({
  type: GET_USER_CATEGORIES,
  categories
});

export const getUserCategories = (page = 1) => dispatch => api.user.getCategories(localStorage.getItem('recipesJWT'), page).then((categories) => {
  dispatch(allUserCategories(categories));
},).catch((errors) => {
  if (errors.response.status === 498 || errors.response.status === 499) {
    localStorage.removeItem('recipesJWT');
    dispatch(userLoggedOut());
  }
});

export const postCategory = data => dispatch => api.user.postCategory(localStorage.getItem('recipesJWT'), data).then(() =>
  api.user.getCategories(localStorage.getItem('recipesJWT')).then((categories) => {
    dispatch(allUserCategories(categories));
  },));

export const deleteCategory = id => dispatch => api.user.deleteCategory(localStorage.getItem('recipesJWT'), id).then(() =>
  api.user.getCategories(localStorage.getItem('recipesJWT')).then((categories) => {
    dispatch(allUserCategories(categories));
  },));

export const putCategory = (data, id) => dispatch => api.user.putCategory(localStorage.getItem('recipesJWT'), data, id).then(() =>
  api.user.getCategories(localStorage.getItem('recipesJWT')).then((categories) => {
    dispatch(allUserCategories(categories));
  },));
