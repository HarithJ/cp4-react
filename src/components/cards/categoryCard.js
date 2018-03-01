import PropTypes from 'prop-types';
import React from 'react';
import CategorySubMenu from '../menu/menu.js';
import ViewCategoryModal from '../modals/viewCategory'

class CategoryCard extends React.Component {
    state = {
        open: false,
    }
    
    show = dimmer => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { category } = this.props;
        const { open } = this.state;
        return (
            <div className="ui card" onClick={() => this.show('blurring')}>
                <ViewCategoryModal open={open} close={ this.close } category={ category } id={category['id']}/>
                <div className="extra header" style={{marginLeft: "70%" }}>
                    <CategorySubMenu redirectRecipes= {this.props.redirectRecipes} id={category['id']} category={category}/> 
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
    category: PropTypes.object.isRequired,
    redirectRecipes: PropTypes.func.isRequired
}
export default CategoryCard;