import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message, Segment, Dropdown } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

export class ResetPasswordForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
      'Secret word': ''
    },
    loading: false,
    errors: {},
    Options: [
      {
        text: 'Yes',
        value: 'Yes'
      }, {
        text: 'No',
        value: 'No'
      }
    ],
    resetEmail: true
  };
  // make state empty so as to show inputs area
  componentWillReceiveProps() {
    this.setState({
      data: {
        email: '',
        password: '',
        'Secret word': ''
      },
      loading: false,
      errors: {},
      Options: [
        {
          text: 'Yes',
          value: 'Yes'
        }, {
          text: 'No',
          value: 'No'
        }
      ],
      resetEmail: true
    });
  }
  // call dispatch with data and change state
  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      if (this.state.resetEmail === true) {
        this
          .props
          .submit(this.state.data)
          .catch(responseErrors => this.setState({
            errors: responseErrors.response.data,
            loading: false
          }));
      } else {
        const { data } = this.state;
        this
          .props
          .submit({
            ...data,
            'Secret word': 'send me an email'
          }, true)
          .catch(responseErrors => this.setState({
            errors: responseErrors.response.data,
            loading: false
          }));
      }
    }
  };
  // update state with new values
  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  }
  // toggles input area
  onDropdownChange = (e, data) => {
    if (data.value === 'Yes') {
      this.setState({ resetEmail: false });
    } else if (data.value === 'No') {
      this.setState({ resetEmail: true });
    }
  }
  // validate user input
  validate = (data) => {
    const errors = {};
    const { resetEmail } = this.state;
    if (resetEmail) {
      if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
      if (!data.password) errors.password = "Can't be blank";
      if (!data['Secret word']) errors['Secret word'] = "Can't be blank";
      return errors;
    }
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  }
  render() {
    const {
      data, errors, loading, Options, resetEmail
    } = this.state;
    return (
      <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide login">
          <Segment>
            <h4 className="ui dividing header left">Reset Password</h4>
            <div className="ui dividing">
              <span>
                Send me an email {' '}
                <Dropdown
                  inline
                  options={Options}
                  defaultValue={Options[1].value}
                  onChange={this.onDropdownChange} 
                />
              </span>
            </div>
            <Form floated="right" onSubmit={this.onSubmit} loading={loading}>
              {errors.message &&
              <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.message}</p>
              </Message>}
              {resetEmail &&
              <Form.Field error={!!errors['Secret word']}>
                <label htmlFor="secret">Secret Word</label>
                <input
                  type="password"
                  id="Secret word"
                  name="Secret word"
                  placeholder="Secret word i created during registration "
                  value={data['Secret word']}
                  onChange={this.onChange}
                /> {errors.email && <InlineError text={errors['Secret word']} />}
              </Form.Field>}
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="myemail@email.com"
                  value={data.email}
                  onChange={this.onChange}
                /> {errors.email && <InlineError text={errors.email} />}
              </Form.Field>
              {resetEmail &&
              <Form.Field error={!!errors.password}>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="eg. *************"
                  value={data.password}
                  onChange={this.onChange}
                /> {errors.password && <InlineError text={errors.password} />}
              </Form.Field>}
              {resetEmail && <Button floated="right" fluid negative secondary>Reset</Button>}
              {!resetEmail && <Button floated="right" fluid negative secondary>Send me my Secret word</Button>}
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default ResetPasswordForm;
