import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../actions/categories';
import { logout } from '../../actions/auth';
import UserCategoryEditModal from '../modals/editCategory';
import ConfirmDelete from '../confirm/ConfirmDelete';

export class CategorySubMenu extends Component {
  state = {
    open: false,
    confirm: false
  }
  // show or close modal
  show = dimmer => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  showConfirm = () => this.setState({ confirm: true})
  closeConfirm = () => this.setState({ confirm: false})
  // call dispatch and delete category
  deleteCategory = (id) => {
    this
      .props
      .deleteCategory(id)
      .catch((errors) => {
        if (errors.response.status === 498 || errors.response.status === 499) {
          this
            .props
            .logout(localStorage.getItem('recipesJWT')); // logout user if token is invalid or expired
        }
      });
  }

  render() {
    const { category, id } = this.props;
    const { confirm } = this.state;
    return (
      <div>
        <ConfirmDelete
          deleteAction={this.deleteCategory} 
          actionId={id} 
          open={confirm}
          cancelDelete={this.closeConfirm}
        />
        <Dropdown pointing="right" item text="More">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.show('blurring')}>
              <UserCategoryEditModal
                dimmer={this.state.dimmer}
                close={this.close}
                open={this.state.open}
                category={category}
                id={id}
              />
              <Icon name="edit" color="green" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.showConfirm()}>
              <Icon name="remove" color="red" />
              Delete
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.redirectRecipes(id)}>
              <Icon name="hide" color="blue" />View recipes
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

CategorySubMenu.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
  redirectRecipes: PropTypes.func.isRequired,
  category: PropTypes
    .instanceOf(Object)
    .isRequired
};

export default connect(null, { deleteCategory, logout })(CategorySubMenu);
