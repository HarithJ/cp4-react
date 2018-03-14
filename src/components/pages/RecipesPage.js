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
    const { recipes, status } = this.props;
    const { loading } = this.state;
    const { categoryId, categoryName } = this.props.match.params;
    return (
      <div>
        <div><UserRecipeModal categoryId={categoryId} /></div>
        {!!recipes && !(status === 222) && !(recipes[1][0].search) && <Search categoryId={categoryId} />}
        <div className="ui one column stackable center aligned page grid">
            <div className="column twelve wide">
              <span className="CategoryName">{categoryName}</span>
            </div>
          </div>
        <div className="ui link centered cards ">
          {loading &&
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>}
          {!!recipes && !(status === 222) && recipes[1].map(recipe => (<RecipeCard
            recipe={recipe}
            key={recipe.id}
            categoryId={categoryId}
            recipeId={recipe.id}
          />))}
        </div>
        <footer>
          {!!recipes && !(status === 222) && !(recipes[1][0].search) && <Pagination
            categoryId={categoryId}
            changePage={this.props.getUserRecipes}
            paginationObject={recipes[0]}
          />}
          {!!recipes && !(status === 222) && !!recipes[1][0].search &&
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
  return { recipes: state.user.recipes,
  status: state.user.status };
}

export default connect(mapStateToProps, { getUserRecipes })(RecipesPage);
