import PropTypes from 'prop-types';
import React from 'react';
import CategorySubMenu from '../menu/menu.js';

class CategoryCard extends React.Component {
    render() {
        const { category } = this.props;
        return (
    <div className="ui card">
        <div className="extra header" style={{marginLeft: "70%" }}>
            <CategorySubMenu id={category['id']}/> 
        </div>
        <div className="content">
            <div className="header">{category['Recipe Category Name']}</div>
            <div className="meta"><em>Brief description</em></div>
            <div className="description">
            <p>{category['Recipe Category Detail']}</p>
            </div>
        </div>  
        <div className="extra footer">
        <i className="info icon"></i>Created: {category['Date Created'].slice(0,22)}..
        </div>
    </div>
        )
    }

}

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired
}
export default CategoryCard;