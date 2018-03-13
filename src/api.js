/* eslint-disable */

import axios from 'axios';

const apiUrl = 'http://api-iris.herokuapp.com';
export default {
  user: {
    login: credentials => axios.post(`${apiUrl}/v2/auth/login`, credentials).then(res => res.data),
    logout: token => axios({
      method: 'post',
      url: (`${apiUrl}/v2/auth/logout`),
      headers: {
        Authorization: token
      }
    }),
    reset: resetData => axios.post(`${apiUrl}/v2/auth/reset-password`, resetData).then(res => res.data),
    signup: user => axios.post(`${apiUrl}/v2/auth/register`, user).then(res => res.data),
    getCategories: (token, page = 1) => axios({
      method: 'get',
      url: (`${apiUrl}/v2/categories?page=${page}`),
      headers: {
        Authorization: token
      }
    }).then(res => res.data),
    postCategory: (token, data) =>
      axios({
        method: 'post',
        url: (`${apiUrl}/v2/categories`),
        data,
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    deleteCategory: (token, id) =>
      axios({
        method: 'delete',
        url: (`${apiUrl}/v2/categories/${id}`),
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    putCategory: (token, data, id) =>
      axios({
        method: 'put',
        url: (`${apiUrl}/v2/categories/${id}`),
        data,
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    searchCategories: (value, page = 1) => axios({
      method: 'get',
      url: (`${apiUrl}/v2/categories/search?q=${value}&page=${page}`),
      headers: {
        Authorization: localStorage.getItem('recipesJWT')
      }
    }).then(res => res.data[1]),

    getRecipes: (token, categoryId, page = 1) => axios({
      method: 'get',
      url: (`${apiUrl}/v2/categories/${categoryId}/recipes?page=${page}`),
      headers: {
        Authorization: token
      }
    }).then(res => res.data),

    postRecipe: (token, categoryId, data) =>
      axios({
        method: 'post',
        url: (`${apiUrl}/v2/categories/${categoryId}/recipes`),
        data,
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    deleteRecipe: (token, categoryId, recipeId) =>
      axios({
        method: 'delete',
        url: (`${apiUrl}/v2/categories/${categoryId}/recipes/${recipeId}`),
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    putRecipe: (token, categoryId, recipeId, data) =>
      axios({
        method: 'put',
        url: (`${apiUrl}/v2/categories/${categoryId}/recipes/${recipeId}`),
        data,
        headers: {
          Authorization: token
        }
      }).then(res => res.data),

    searchRecipes: (categoryId, value, page = 1) => axios({
      method: 'get',
      url: (`${apiUrl}/v2/categories/${categoryId}/recipes/search?q=${value}&page=${page}`),
      headers: {
        Authorization: localStorage.getItem('recipesJWT')
      }
    }).then(res => res.data[1]),

  }
}