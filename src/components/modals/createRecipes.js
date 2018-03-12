import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Popup,
  Button,
  Modal,
  Form,
  TextArea,
  Icon,
  Message
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { postRecipe } from '../../actions/recipes';
import InlineError from '../messages/InlineError';
import { logout } from '../../actions/auth';

export class RecipeModal extends Component {
  state = {
    open: false,
    loading: false,
    errors: {},
    data: {
      name: '',
      recipe: ''
    }
  }
  // call action to change state
  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this
        .postRecipe(this.props.categoryId, this.state.data)
        .then(() => {
          this.setState({ loading: false });
          this.close();
        })
        .catch((responseError) => {
          if (responseError.response.status === 498 || responseError.response.status === 499) {
            this
              .props
              .logout(localStorage.getItem('recipesJWT'));
          } else {
            this.setState({ errors: errors.response.data, loading: false });
          }
        });
    }
  };
  // update state on input change
  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }
  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.recipe) errors.recipe = "Can't be blank";
    return errors;
  }

  postRecipe = (categoryId, data) => this
    .props
    .postRecipe(categoryId, data);

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ errors: {}, open: false })

  render() {
    const {
      open,
      dimmer,
      data,
      errors,
      loading
    } = this.state;

    return (
      <div>
        <Popup trigger={<Button onClick={this.show('blurring')}>Add</Button>}>
          <Popup.Header>Heads up!</Popup.Header>
          <Popup.Content>
            Create a new food recipes here!
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create a new recipe </Modal.Header>
          <Modal.Content>
            <Form>
              { errors.message &&
              <Message negative>
                <Message.Header>Oops! somethings not right</Message.Header>
                <p>{errors.message}</p>
              </Message> }
              <Form.Field error={!!errors.name}>
                <label htmlFor="Recipe Name">Recipe Name</label>
                <input
                  type="text"
                  id="Recipe Name"
                  name="name"
                  value={data.name}
                  placeholder="Pastries"
                  onChange={this.onChange}
                />
                {errors.name && <InlineError text={errors.name} />}

              </Form.Field>
              <Form.Field error={!!errors.recipe} >
                <label htmlFor="Directions">Directions</label>
                <TextArea
                  autoHeight
                  type="textarea"
                  id="Directions"
                  name="recipe"
                  placeholder="Melt chocolate in a microwave safe bowl in the microwave.
                           Melt in 30 second intervals and stir after each 30 seconds, even if it does not look like it needs it, give it a stir.
                           Place cream in a large bowl and beat until thick and well beaten.
                           Do not under beat as you need the weight of the thick cream to ensure a good mousse.
                           Place 2 spoonfuls of cream into the melted chocolate, stir until incorporated.
                           Pour all the chocolate mixture into the cream and gently fold through.
                           Place spoonfuls into 6 small bowls or champagne glasses.
                           Refrigerate for a minimum of 1 hour.
                           Top with a little extra cream and an additional toblerone triangle on each serving."
                  onChange={this.onChange}
                  value={data.recipe}
                />
                {errors.recipe && <InlineError text={errors.recipe} />}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.onSubmit} loading={loading}>
              <Icon name="heart" />
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

RecipeModal.propTypes = {
  postRecipe: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired

};

export default connect(null, { postRecipe, logout })(RecipeModal);
