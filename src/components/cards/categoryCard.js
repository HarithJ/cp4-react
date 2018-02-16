import PropTypes from 'prop-types';
import React from 'react';

class CategoryCard extends React.Component {
    render() {
        const { category } = this.props;
        return (
    <div className="ui card">
        <div className="content">
            <div className="header">{category['Recipe Category Name']}</div>
            <div className="meta"><em>Brief description</em></div>
            <div className="description">
            <p>{category['Recipe Category Detail']}</p>
            </div>
        </div>
        <div className="extra content">
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