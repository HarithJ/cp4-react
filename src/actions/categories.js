import { GET_USER_CATEGORIES } from '../types';
import api from '../api';

export const allUserCategories = categories => ({
    type: GET_USER_CATEGORIES,
    categories
})
export const getUserCategories = token => dispatch => api.user.getCategories(token).then((categories) => {
        dispatch(allUserCategories(categories));
    },);