import PropTypes from 'prop-types';
import React from 'react';
import RecipeSubMenu from '../menu/recipeMenu';

class RecipeCard extends React.Component {
    render() {
        const { recipe, recipe_id, category_id } = this.props;
        return (
    <div className="ui card">
        <div className="extra header" style={{marginLeft: "70%" }}>
        {<RecipeSubMenu category_id={ category_id } recipe_id={ recipe_id } recipe={ recipe } />}
        </div>
        <div className="content">
            <div className="header">{recipe['name']}</div>
            <div className="meta"><em>recipe</em></div>
            <div className="description">
            <p>{recipe['Recipe'].slice(0,50)}...</p>
            </div>
        </div>  
        <div className="extra footer">
        <i className="info icon"></i>Created: {recipe['Date Created'].slice(0,22)}..
        </div>
    </div>
        )
    }

}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
}
export default RecipeCard;