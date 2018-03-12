import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Icon } from 'semantic-ui-react';

class PaginationShorthand extends React.Component {
  changePage = (e, { activePage }) => {
    if (this.props.categoryId) {
      this
        .props
        .changePage(this.props.categoryId, { activePage }.activePage);
    } else {
      this
        .props
        .changePage({ activePage }.activePage);
    }
  }
  render() {
    const { paginationObject } = this.props;
    return (
      <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
          <Pagination
            onPageChange={this.changePage}
            activePage={paginationObject['current page']}
            ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true
          }}
            firstItem={{
            content: <Icon name="angle double left" />,
            icon: true
          }}
            lastItem={{
            content: <Icon name="angle double right" />,
            icon: true
          }}
            totalPages={paginationObject['total pages']}
          />
        </div>
      </div>
    );
  }
}

PaginationShorthand.propTypes = {
  paginationObject: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number,
  changePage: PropTypes.func.isRequired
};
PaginationShorthand.defaultProps = {
  categoryId: null
};

export default PaginationShorthand;
