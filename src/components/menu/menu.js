import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../actions/categories';
import { logout } from '../../actions/auth';


class CategorySubMenu extends Component {
  state = {
    loading: false
  }

  deleteCategory = (id) => {
    this.props.deleteCategory(id)
    .catch((errors) => {
      if(errors.response.status  === 498 || errors.response.status  === 499) {
        this.props.logout(localStorage.getItem('recipesJWT'))
      }
    });
  }
    
  render() {
    return (
        <Dropdown  pointing='right' item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item> <Icon name='edit' color='green'/> Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => this.deleteCategory(this.props.id)}> <Icon name='remove' color='red'/> Delete</Dropdown.Item>
            <Dropdown.Item> <Icon name='hide' color='blue'/>View recipes</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    )
  }
}


CategorySubMenu.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};


export default connect(null, { deleteCategory, logout })(CategorySubMenu);
