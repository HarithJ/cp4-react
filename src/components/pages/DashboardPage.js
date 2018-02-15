import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserCategories } from '../../actions/categories';
import CategoryCards from '../../components/cards/categoryCard'

class DashboardPage extends React.Component{
    getCategories = (token) => 
        this.props.getUserCategories(token);

    componentDidMount() {
        const token = localStorage.getItem('recipesJWT');
        this.getCategories(token);
    };
    render () {
        const { categories } = this.props;
        return(
            <div className="ui link centered cards"> 
            {!!categories && categories[1].map((category) => 
                (
                < CategoryCards category={category} key={category['id']}/>
            )) }
            </div>
        );
    }
}
DashboardPage.propTypes = {
    getUserCategories: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        categories : state.user.categories
    }
}

export default connect(mapStateToProps, { getUserCategories })(DashboardPage);