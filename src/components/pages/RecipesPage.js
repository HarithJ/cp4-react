import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes } from '../../actions/recipes';
import RecipeCard from '../../components/cards/recipeCard';
import { Loader, Dimmer } from 'semantic-ui-react';
// import CategoryModal from '../modals/CreateCategory';

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
        return(
            <div>
                <div> {/* Recipe modal */ }</div>

            <div className="ui link centered cards "> 
                    { loading && <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>}
                { !!recipes && !(recipes[1][0] === 'Nothing Here yet') && recipes[1].map((recipe) => 
                (
                <RecipeCard recipe={recipe} key={recipe['id']}/>
                )) }
            </div>
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