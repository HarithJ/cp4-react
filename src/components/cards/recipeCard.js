import PropTypes from 'prop-types';
import React from 'react';
import UserRecipeSubMenu from '../menu/recipeMenu';
import UserViewRecipeModal from '../modals/viewRecipes';

class RecipeCard extends React.Component {
  state = {
    open: false
  }
  // show modal
  show = dimmer => this.setState({ dimmer, open: true }) // dimmer is the modal background type
  close = () => this.setState({ open: false }) // close modal

  render() {
    const { recipe, recipeId, categoryId } = this.props;
    const { open } = this.state;

    return (
      <div
        className="ui card"
        role="presentation"
        onClick={() => this.show('blurring')}
      >
        <UserViewRecipeModal open={open} close={this.close} recipe={recipe} />
        <div
          className="extra header"
          style={{ marginLeft: '70%' }}
        >
          {<UserRecipeSubMenu
            categoryId={categoryId}
            recipeId={recipeId}
            recipe={recipe}
          />}
        </div>
        <div className="content">
          <div className="header">{recipe.name}</div>
          <div className="meta">
            <em>recipe</em>
          </div>
          <div className="description">
            <p>{recipe
                .Recipe
                .slice(0, 50)}...
            </p>
          </div>
        </div>
        <div className="extra footer">
          <i className="info icon" />Created: {recipe['Date Created'].slice(0, 22)}..
        </div>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes
    .instanceOf(Object)
    .isRequired,
  recipeId: PropTypes.number.isRequired,
  categoryId: PropTypes.string.isRequired
};
export default RecipeCard;
