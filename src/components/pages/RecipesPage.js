import React from 'react';
import { Loader, Dimmer, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes } from '../../actions/recipes';
import RecipeCard from '../../components/cards/recipeCard';
import UserRecipeModal from '../modals/createRecipes';
import Pagination from '../pagination/pagination';
import Search from '../search/searchRecipes';

export class RecipesPage extends React.Component {
  state = {
    loading: false
  }

  componentWillMount() {
    const id = this.props.match.params.categoryId;
    this.setState({ loading: true });
    this
      .props
      .getUserRecipes(id)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { recipes } = this.props;
    const { loading } = this.state;
    const { categoryId } = this.props.match.params;
    return (
      <div>
        <div><UserRecipeModal categoryId={categoryId} /></div>
        {!!recipes && !(recipes[1][0] === 'Nothing Here yet') && !(recipes[1][0].search) && <Search categoryId={categoryId} />}
        <div className="ui link centered cards ">
          {loading &&
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>}
          {!!recipes && !(recipes[1][0] === 'Nothing Here yet') && recipes[1].map(recipe => (<RecipeCard
            recipe={recipe}
            key={recipe.id}
            categoryId={categoryId}
            recipeId={recipe.id}
          />))}
        </div>
        <footer>
          {!!recipes && !(recipes[1][0] === 'Nothing Here yet') && !(recipes[1][0].search) && <Pagination
            categoryId={categoryId}
            changePage={this.props.getUserRecipes}
            paginationObject={recipes[0]}
          />}
          {!!recipes && !(recipes[1][0] === 'Nothing Here yet') && !!recipes[1][0].search &&
          <Button color="black" onClick={() => this.props.getUserRecipes(categoryId)}><Icon name="angle left" />Back</Button>}
        </footer>
      </div>
    );
  }
}
RecipesPage.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  recipes: PropTypes.instanceOf(Object)
};
RecipesPage.defaultProps = {
  recipes: null
};
function mapStateToProps(state) {
  return { recipes: state.user.recipes };
}

export default connect(mapStateToProps, { getUserRecipes })(RecipesPage);
