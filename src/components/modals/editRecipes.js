import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  Form,
  TextArea,
  Icon,
  Message
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { putRecipe } from '../../actions/recipes';
import InlineError from '../messages/InlineError';
import { logout } from '../../actions/auth';

export class RecipeEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: {},
      categoryId: props.categoryId,
      recipeId: props.recipeId,
      data: {
        name: props.recipe.name || '',
        recipe: props.recipe.Recipe || ''
      }
    };
  }
  // call action if data is valid
  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this
        .putRecipe(this.props.categoryId, this.props.recipeId, this.state.data)
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
            this.setState({ errors: responseError.response.data, loading: false });
          }
        });
    }
  };
  // update state on data change
  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }
  // Shorthand for action
  putRecipe = (categoryId, recipeId, data) => this
    .props
    .putRecipe(categoryId, recipeId, data);
  // validate data on submit
  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.recipe) errors.recipe = "Can't be blank";
    return errors;
  }

  close = () => {
    this
      .props
      .close();
    this.setState({ errors: {} });
  }

  render() {
    const { data, errors, loading } = this.state;
    const { open } = this.props;

    return (
      <div>
        <Modal dimmer="blurring" open={open} onClose={this.close}>
          <Modal.Header>Edit Recipe</Modal.Header>
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
                  onChange={this.onChange}
                />
                {errors.name && <InlineError text={errors.name} />}

              </Form.Field>
              <Form.Field error={!!errors.recipe} >
                <label htmlFor="Directions">Direction</label>
                <TextArea
                  autoHeight
                  type="textarea"
                  id="Directions"
                  name="recipe"
                  onChange={this.onChange}
                  value={data.recipe}
                />
                {errors.recipe && <InlineError text={errors.recipe} />}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.onSubmit} loading={loading}>
              <Icon name="edit" />
              Edit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

RecipeEditModal.propTypes = {
  putRecipe: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired

};

export default connect(null, { putRecipe, logout })(RecipeEditModal);
