import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserCategories } from '../../actions/categories';
import CategoryCards from '../../components/cards/categoryCard';
import { Loader, Dimmer } from 'semantic-ui-react';
import CategoryModal from '../modals/CreateCategory';
import Pagination from '../pagination/pagination'
import Search from '../search/searchStandard'

class DashboardPage extends React.Component{
    state = {
        loading: false,
    }
    getCategories = (token) => 
        this.props.getUserCategories(token);

    componentDidMount() {
        this.setState({ loading: true,})
        this.getCategories();
        this.setState({ loading: false,})
    };

    redirectRecipes = (id) => this.props.history.push(`category/${id}/recipes`)

    render () {
        const { categories } = this.props;
        const { loading } = this.state;
        return(
            <div>
                <div><CategoryModal/></div>
            <Search/>
            <div className="ui link centered cards "> 
                    { loading && <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>}
                {!!categories && !(categories[1][0] === 'Nothing here yet') && categories[1].map((category) => 
                (
                < CategoryCards redirectRecipes={ this.redirectRecipes } category={category} key={category['id']}/>
                )) }
            </div>
            <footer>
                {!! categories && !(categories[1][0] === 'Nothing here yet')
                 && <Pagination changePage={this.props.getUserCategories} paginationObject={ categories[0]}/>}
            </footer>
            </div>
        );
    }
}
DashboardPage.propTypes = {
    getUserCategories: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
}

function mapStateToProps(state) {
    return {
        categories : state.user.categories
    }
}

export default connect(mapStateToProps, { getUserCategories })(DashboardPage);