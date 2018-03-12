import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class ViewRecipeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: props.open
    };
  }
  // trigger modal close
  close = () => {
    this
      .props
      .close();
  }

  render() {
    const { open } = this.props;
    const { recipe } = this.props;
    return (
      <Modal dimmer="blurring" open={open} onClose={this.close} size="large">
        <Modal.Header>{recipe.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Directions</Header>
            {recipe.Recipe}
            <div>
              <br />
              <em>Created on</em>: {recipe['Date Created']}
              <div>
                <br />
                <em>Modified on</em>: {recipe['Date Created']}
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

ViewRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired
};
export default ViewRecipeModal;
