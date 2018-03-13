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
import { postCategory } from '../../actions/categories';
import InlineError from '../messages/InlineError';
import { logout } from '../../actions/auth';

export class CategoryModal extends Component {
  state = {
    open: false,
    loading: false,
    errors: {},
    data: {
      name: '',
      detail: ''
    }
  }
  // update local state
  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }
  // trigger dispatch and call api
  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this
        .postCategory(this.state.data)
        .then(() => {
          this.setState({ 
            data: {
              name: '',
              recipe: ''
            },
            loading: false });
          this.close();
        })
        .catch((responseErrors) => {
          if (responseErrors.response.status === 498 || responseErrors.response.status === 499) {
            this
              .props
              .logout(localStorage.getItem('recipesJWT'));
          } else {
            this.setState({ errors: responseErrors.response.data, loading: false });
          }
        });
    }
  };
  // validate user input
  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.detail) errors.detail = "Can't be blank";
    return errors;
  }
  // Clear state on cancel
  onCancel = () => {
    this.setState({
    data: {
    name: '',
    detail: ''
  }})
  this.close()}
  // shorthand for accessing dispatch
  postCategory = data => this
    .props
    .postCategory(data);
  // trigger modal
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
        <Popup trigger={ 
          <div className='add'><Button onClick={this.show('blurring')}>Add Category</Button></div> }>
          <Popup.Header>Heads up!</Popup.Header>
          <Popup.Content>
            Create a new food category here!
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create a new category</Modal.Header>
          <Modal.Content>
            <Form>
              { errors.message &&
              <Message negative>
                <Message.Header>Oops! somethings not right</Message.Header>
                <p>{errors.message}</p>
              </Message> }
              <Form.Field error={!!errors.name}>
                <label htmlFor="Category Name">Category Name</label>
                <input
                  type="text"
                  id="Category Name"
                  name="name"
                  value={data.name}
                  placeholder="Pastries"
                  onChange={this.onChange}
                />
                {errors.name && <InlineError text={errors.name} />}

              </Form.Field>
              <Form.Field error={!!errors.detail} >
                <label htmlFor="description">Description</label>
                <TextArea
                  autoHeight
                  type="textarea"
                  id="description"
                  name="detail"
                  placeholder="Pastry is a dough of flour, water and shortening
                           that may be savoury or sweetened.
                           Sweetened pastries are often
                           described as bakers' confectionery."
                  onChange={this.onChange}
                  value={data.detail}
                />
                {errors.detail && <InlineError text={errors.detail} />}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.onCancel} loading={loading}>Cancel</Button>
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

CategoryModal.propTypes = {
  postCategory: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired

};

export default connect(null, { postCategory, logout })(CategoryModal);
