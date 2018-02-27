import { USER_LOGGED_IN, USER_LOGGED_OUT, GET_USER_CATEGORIES, GET_USER_RECIPES } from "../types";

export default function user(state = {}, action={}) {
    switch(action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case GET_USER_CATEGORIES:
            return { ...state, categories: action.categories};
        case GET_USER_RECIPES:
            return { ...state, recipes: action.recipes};
        default:
         return state;

    }
}