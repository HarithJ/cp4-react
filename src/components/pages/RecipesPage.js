import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes } from '../../actions/recipes';
import RecipeCard from '../../components/cards/recipeCard';
import { Loader, Dimmer } from 'semantic-ui-react';
import RecipeModal from '../modals/createRecipes';
import Pagination from '../pagination/pagination'

class RecipesPage extends React.Component{
    state = {
        loading: false,
    }
    
    componentDidMount() {
        const id = this.props.match.params['category_id']
        this.setState({ loading: true,})
        this.props.getUserRecipes(id)
        this.setState({ loading: false,})
    };

    render () {
        const { recipes } = this.props;
        const { loading } = this.state;
        const category_id = this.props.match.params['category_id'];
        return(
            <div>
                <div><RecipeModal  category_id={category_id} /></div>
            <div className="ui link centered cards "> 
                    { loading && <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>}
                { !!recipes && !(recipes[1][0] === 'Nothing Here yet') && recipes[1].map((recipe) => 
                (
                <RecipeCard recipe={recipe} key={recipe['id']} category_id={category_id} recipe_id={recipe['id']}/>
                )) }
            </div>
            <footer>
                {!! recipes && !(recipes[1][0] === 'Nothing Here yet')
                 && <Pagination category_id={category_id} changePage={this.props.getUserRecipes } paginationObject={ recipes[0]}/>}
            </footer>
            </div>
        );
    }
}
RecipesPage.propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        recipes : state.user.recipes
    }
}

export default connect(mapStateToProps, { getUserRecipes })(RecipesPage);