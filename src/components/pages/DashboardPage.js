import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserCategories } from '../../actions/categories';
import CategoryCards from '../../components/cards/categoryCard';
import UserCategoryModal from '../modals/CreateCategory';
import Pagination from '../pagination/pagination';
import Search from '../search/searchStandard';

export class DashboardPage extends React.Component {
  state = {
    loading: false
  }
  componentWillMount() {
    this.setState({ loading: true });
    this
      .getCategories()
      .then(() => this.setState({ loading: false }));
  }

  getCategories = () => this
    .props
    .getUserCategories();
  redirectRecipes = id => this
    .props
    .history
    .push(`category/${id}/recipes`)

  render() {
    const { categories } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <div><UserCategoryModal /></div>
        {!!categories && !(categories[1][0] === 'Nothing here yet') && !(categories[1][0].search) && <Search />}
        <div className="ui link centered cards">
          {loading &&
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>}
          {!!categories && !(categories[1][0] === 'Nothing here yet') && categories[1].map(category => (
            <CategoryCards
              redirectRecipes={this.redirectRecipes}
              category={category}
              key={category.id}
            />))}
        </div>
        <footer>
          {!!categories && !(categories[1][0] === 'Nothing here yet') && !(categories[1][0].search) &&
          <Pagination
            changePage={this.props.getUserCategories}
            paginationObject={categories[0]}
          />}
          {!!categories && !(categories[1][0] === 'Nothing here yet') && !!categories[1][0].search &&
          <Button color="black" onClick={() => this.getCategories()}><Icon name="angle left" />Back</Button>}
        </footer>
      </div>
    );
  }
}
DashboardPage.propTypes = {
  getUserCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  categories: PropTypes.instanceOf(Object)
};

DashboardPage.defaultProps = {
  categories: null
};

function mapStateToProps(state) {
  return { categories: state.user.categories };
}

export default connect(mapStateToProps, { getUserCategories })(DashboardPage);
