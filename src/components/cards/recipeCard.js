import PropTypes from 'prop-types';
import React from 'react';
//import CategorySubMenu from '../menu/menu.js';

class RecipeCard extends React.Component {
    render() {
        const { recipe } = this.props;
        return (
    <div className="ui card">
        <div className="extra header" style={{marginLeft: "70%" }}>
        {/* <CategorySubMenu redirectRecipes= {this.props.redirectRecipes} id={category['id']} category={category}/> */}
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
    //redirectRecipes: PropTypes.func.isRequired
}
export default RecipeCard;