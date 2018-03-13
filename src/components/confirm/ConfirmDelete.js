import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react'

class ConfirmDelete extends Component {

  render() {
    const { 
        open,
        deleteAction,
        actionId,
        cancelDelete,
        categoryId,
    } = this.props;
    return (
      <div>
        {!categoryId &&
        <Confirm
            open={open}
            cancelButton='Never mind'
            confirmButton="Let's do it"
            onCancel={cancelDelete}
            onConfirm={() => deleteAction(actionId)}
        /> }
        {categoryId &&
        <Confirm
            open={open}
            cancelButton='Never mind'
            confirmButton="Let's do it"
            onCancel={cancelDelete}
            onConfirm={() => deleteAction(categoryId, actionId)}
        /> }

      </div>
    )
  }
}
ConfirmDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    deleteAction: PropTypes.func.isRequired,
    actionId: PropTypes.number.isRequired,
    cancelDelete: PropTypes.func.isRequired,
    categoryId: PropTypes.number,
  };

ConfirmDelete.defaultProps = {
    categoryId: null
}
export default ConfirmDelete