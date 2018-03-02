import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteRecipe } from '../../actions/recipes';
import { logout } from '../../actions/auth';
import RecipeEditModal from '../modals/editRecipes';


class RecipeSubMenu extends Component {
  state = { 
    open: false,
  }

  show = dimmer => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  deleteRecipe = (category_id, recipe_id) => {
    this.props.deleteRecipe(category_id, recipe_id)
    .catch((errors) => {
      if(errors.response.status  === 498 || errors.response.status  === 499) {
        this.props.logout(localStorage.getItem('recipesJWT'))
      }
    });
  }
   
  render() {
    // const { category } = this.props;
    const { category_id, recipe_id , recipe} = this.props;
    return (
        <Dropdown  pointing='right' item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.show('blurring')}> 
            <RecipeEditModal dimmer={this.state.dimmer} close={this.close} open= {this.state.open} recipe={recipe} category_id={ category_id} recipe_id={recipe_id} />
            <Icon name='edit' color='green'/> Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => this.deleteRecipe(category_id, recipe_id)}> <Icon name='remove' color='red'/> Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    )
  }
}


RecipeSubMenu.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  category_id: PropTypes.string.isRequired,
  recipe_id: PropTypes.number.isRequired,

};


export default connect(null, { deleteRecipe, logout })(RecipeSubMenu);
