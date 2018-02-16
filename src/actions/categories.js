import { GET_USER_CATEGORIES } from '../types';
import { userLoggedOut } from './auth';
import api from '../api';

export const allUserCategories = categories => ({
    type: GET_USER_CATEGORIES,
    categories
})
export const getUserCategories = token => dispatch => api.user.getCategories(token).then((categories) => {
        dispatch(allUserCategories(categories));
    },).catch((errors) => {
        if(errors.response.status  === 498 || errors.response.status  === 499) {
            localStorage.removeItem('recipesJWT');
            dispatch(userLoggedOut())
        }
      });