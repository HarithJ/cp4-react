import React from 'react'
import { Header, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';


export class ViewCategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    loading: false,
    open: props.open, 
    };
  }

  close = () => {
    this.props.close()
  }

  render() {
    const { dimmer, open } = this.props;
    const { category } = this.props;
    return (
      <Modal dimmer={dimmer} open={open} onClose={ this.close } size='tiny'>
      <Modal.Header>{category['Recipe Category Name']}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Details</Header> {category['Recipe Category Detail']}
          <div>
            <br/>
            <em>Created on</em>: {category['Date Created']}
            <div>
            <br/>
            <em>Modified on</em>: {category['Date Created']}
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }
};

ViewCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};


export default ViewCategoryModal