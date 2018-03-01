import { GET_USER_RECIPES } from '../types';
import { userLoggedOut } from './auth';
import api from '../api';

export const allUserRecipes = recipes => ({
    type: GET_USER_RECIPES,
    recipes
})

export const getUserRecipes = category_id => dispatch => api.user.getRecipes(localStorage.getItem('recipesJWT'), category_id)
        .then((recipes) => {
        dispatch(allUserRecipes(recipes));},)
        .catch((errors) => {
        if(errors.response.status  === 498 || errors.response.status  === 499) {
            localStorage.removeItem('recipesJWT');
            dispatch(userLoggedOut())
        }
      });

export const postRecipe = (category_id, data) => dispatch => api.user.postRecipe(localStorage.getItem('recipesJWT'), category_id, data)
        .then(() => 
        api.user.getRecipes(localStorage.getItem('recipesJWT'), category_id).then((recipes) => {
            dispatch(allUserRecipes(recipes));
        },));

export const deleteRecipe = (category_id, recipe_id) => dispatch => api.user
        .deleteRecipe(localStorage.getItem('recipesJWT'),category_id, recipe_id)
        .then(() => 
        api.user.getRecipes(localStorage.getItem('recipesJWT'), category_id).then((recipes) => {
            dispatch(allUserRecipes(recipes));
        },));