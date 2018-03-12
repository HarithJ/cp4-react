import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { retrieveSearchRecipe } from '../../actions/search';
import api from '../../api';

export class SearchRecipeForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    recipes: {}
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({ query: data.searchQuery });
    this.timer = setTimeout(this.fetchOptions, 10);
  }

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this
      .props
      .retrieveSearchRecipe(this.state.recipes[data.value]);
  }
  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    api
      .user
      .searchRecipes(this.props.categoryId, this.state.query)
      .then((recipes) => {
        if (!recipes[0].message) {
          const options = [];
          const recipesHash = {};
          recipes.forEach((recipe) => {
            recipesHash[recipe.id] = recipe;
            options.push({ key: recipe.id, value: recipe.id, text: recipe.name });
          });
          this.setState({ loading: false, options, recipes: recipesHash });
        } else {
          this.setState({ loading: false, not_found: `${recipes[0].message} 😓` });
        }
      })
      .catch((errors) => {
        if (errors.response.status === 498 || errors.response.status === 499) {
          this
            .props
            .logout(localStorage.getItem('recipesJWT'));
        }
      });
  }
  render() {
    return (
      <div className="ui one column stackable center aligned page grid">
        <div className="column wide">
          <Form>
            <Dropdown
              icon="search"
              search
              selection
              fluid
              selectOnBlur={false}
              placeholder="Search recipes by name"
              value={this.state.query}
              onSearchChange={this.onSearchChange}
              options={this.state.options}
              loading={this.state.loading}
              noResultsMessage={this.state.not_found || "Searching for a recipe? ❤️ we'll help you find it 🤞"}
              onChange={this.onChange}
            />
          </Form>
        </div>
      </div>
    );
  }
}
SearchRecipeForm.propTypes = {
  logout: PropTypes.func.isRequired,
  retrieveSearchRecipe: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired

};
export default connect(null, { logout, retrieveSearchRecipe })(SearchRecipeForm);
