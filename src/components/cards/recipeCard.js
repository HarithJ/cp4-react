import PropTypes from 'prop-types';
import React from 'react';
import RecipeSubMenu from '../menu/recipeMenu';
import ViewRecipeModal from '../modals/viewRecipes'

class RecipeCard extends React.Component {
    state = {
        open: false,
    }
    
    show = dimmer => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { recipe, recipe_id, category_id } = this.props;
        const { open } = this.state;

        return (
    <div className="ui card" onClick={() => this.show('blurring')}>
        <ViewRecipeModal open={open} close={ this.close } recipe={ recipe }/>
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
        <i className="info icon"></i>Created: {recipe["Date Created"].slice(0,22)}..
        </div>
    </div>
        )
    }

}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
}
export default RecipeCard;