import { SEARCH_USER_CATEGORIES, SEARCH_USER_RECIPES } from '../types';

export const retrievedSearchedCategory= SearchObject => ({
    type: SEARCH_USER_CATEGORIES,
    SearchObject
})

export const retrievedSearchedRecipe = SearchObject => ({
    type: SEARCH_USER_RECIPES,
    SearchObject
})

export const retrieveSearchCategory = (SearchObject) =>  dispatch => {
    SearchObject = [
        {
            "Has next": false,
            "Has previous": false,
            "Next Page": null,
            "Prev Page": null,
            "current page": 1,
            "total items": 1,
            "total pages": 1
        },
        [
            {...SearchObject, search: true}
        ]
    ]
    dispatch(retrievedSearchedCategory(SearchObject))
}

export const retrieveSearchRecipe = (SearchObject) =>  dispatch => {
    SearchObject = [
        {
            "Has next": false,
            "Has previous": false,
            "Next Page": null,
            "Prev Page": null,
            "current page": 1,
            "total items": 1,
            "total pages": 1
        },
        [
            {...SearchObject, search: true}
        ]
    ]
    dispatch(retrievedSearchedRecipe(SearchObject))
}