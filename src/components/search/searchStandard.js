import React from 'react'
import { Dropdown, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import api from '../../api'

class SearchCategoryForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    categories: {}
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 100);
  }

  fetchOptions = () => {
    if(!this.state.query) return;
    this.setState({
      loading: true
    });
    api.user.searchCategories(this.state.query)
    .then(categories => {
      if(!categories[0]['message']){
        const options = [];
        const categoriesHash = {};
        categories.forEach(category => {
        categoriesHash[category['id']] = category;
        options.push({
          key: category['id'],
          value: category['id'],
          text: category['Recipe Category Name']
          });
        })
        this.setState({loading: false, options, categories: categoriesHash})
      } else {
        this.setState({ loading: false, not_found: categories[0]['message']+ " 😓"})
      }
    })
    .catch((errors) => {
      if(errors.response.status  === 498 || errors.response.status  === 499) {
          this.props.logout(localStorage.getItem('recipesJWT'))
      }})
  }
  render() {
    return (
      <Form>
        <Dropdown
        icon="search"
        search
        selection
        fluid
        placeholder="Search categories by name"
        value={this.state.query}
        onSearchChange={ this.onSearchChange}
        options={ this.state.options }
        loading={ this.state.loading}
        noResultsMessage={ this.state.not_found || "Searching for something ❤️ we'll help you find it 🤞" }
        />
      </Form>
    )
  }
}
// TODO:  declare proptypes
export default connect(null, { logout })(SearchCategoryForm);