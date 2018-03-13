import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteRecipe } from '../../actions/recipes';
import { logout } from '../../actions/auth';
import UserRecipeEditModal from '../modals/editRecipes';
import ConfirmDelete from '../confirm/ConfirmDelete';

export class RecipeSubMenu extends Component {
  state = {
    open: false,
    confirm: false
  }
  // Show or close Modal
  show = dimmer => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  showConfirm = () => this.setState({ confirm: true})
  closeConfirm = () => this.setState({ confirm: false})

  deleteRecipe = (categoryId, recipeId) => {
    this
      .props
      .deleteRecipe(categoryId, recipeId)
      .catch((errors) => {
        if (errors.response.status === 498 || errors.response.status === 499) {
          this
            .props
            .logout(localStorage.getItem('recipesJWT')); // Bad token logout user
        }
      });
  }

  render() {
    const { categoryId, recipeId, recipe } = this.props;
    const { confirm } = this.state;
    return (
      <div>
        <ConfirmDelete
          deleteAction={this.deleteRecipe} 
          actionId={recipeId} 
          categoryId={Number(categoryId)}
          open={confirm}
          cancelDelete={this.closeConfirm}
        />
        <Dropdown pointing="right" item text="More">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.show('blurring')}>
              <UserRecipeEditModal
                dimmer={this.state.dimmer}
                close={this.close}
                open={this.state.open}
                recipe={recipe}
                categoryId={categoryId}
                recipeId={recipeId}
              />
              <Icon name="edit" color="green" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.showConfirm()}>
              <Icon name="remove" color="red" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

RecipeSubMenu.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
  recipe: PropTypes
    .instanceOf(Object)
    .isRequired,
  logout: PropTypes.func.isRequired

};

export default connect(null, { deleteRecipe, logout })(RecipeSubMenu);
