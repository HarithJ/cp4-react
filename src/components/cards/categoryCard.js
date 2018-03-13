import PropTypes from 'prop-types';
import React from 'react';
import UserCategorySubMenu from '../menu/menu.js';
import UserViewCategoryModal from '../modals/viewCategory';

class CategoryCard extends React.Component {
  state = {
    open: false
  }
  // show modal
  show = dimmer => this.setState({ dimmer, open: true }) // dimmer is the modal background type
  close = () => this.setState({ open: false }) // close modal
  render() {
    const { category } = this.props;
    const { open } = this.state;
    return (
      <div
        className="ui card"
        role="presentation"
        onClick={() => this.show('blurring')}
      >
        <UserViewCategoryModal
          open={open}
          close={this.close}
          category={category}
          id={category.id}
        />
        <div
          className="extra header" 
          style={{ marginLeft: '70%' }}
        >
          <UserCategorySubMenu
            redirectRecipes={this.props.redirectRecipes}
            id={category.id}
            category={category}
          />
        </div>
        <div className="content">
          <div className="header">{category['Recipe Category Name']}</div>
          <div className="meta">
            <em>Brief description</em>
          </div>
          <div className="description">
            <p>{category['Recipe Category Detail'].slice(0, 22)}...</p>
          </div>
        </div>
        <div className="extra footer">
          <i className="info icon" />Created: {category['Date Created'].slice(0, 22)}..
        </div>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  category: PropTypes
    .instanceOf(Object)
    .isRequired,
  redirectRecipes: PropTypes.func.isRequired
};
export default CategoryCard;
