import React, { Component } from 'react';
import {Button, Modal, Form, TextArea, Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { putCategory } from '../../actions/categories';
import InlineError  from '../messages/InlineError';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';



export class CategoryEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        loading: false,
        errors: {},
        id: props.id, 
        data: {
            name: props.category['Recipe Category Name'] || '',
            detail: props.category['Recipe Category Detail'] || '',
        } 
        };
      }

    putCategory = (data, id) => {
        return this.props.putCategory(data, id);
    };
    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
             this.putCategory(this.state.data, this.props.id)
             .then(() => {this.setState({loading: false}); this.close()})                
             .catch((errors) => {
                if(errors.response.status  === 498 || errors.response.status  === 499) {
                    this.props.logout(localStorage.getItem('recipesJWT'))
                }else{
                    this.setState({ errors: errors.response.data, loading: false }
                )}
            })
        }
    };
    validate = data => {
        const errors = {};

        if (!data['name']) errors.name = "Can't be blank";
        if (!data['detail']) errors.detail = "Can't be blank";
        
        return errors;


    }

    onChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }

  close = () => {
      this.props.close()
      this.setState({ errors: {} })
  }

  render() {
    const {data, errors, loading } = this.state;
    const { dimmer, open } = this.props;

    return (
      <div>

        <Modal dimmer={dimmer} open={open} onClose={ this.close }>
          <Modal.Header>Edit category</Modal.Header>
          <Modal.Content>
          <Form>
          { errors.message && <Message negative>
                <Message.Header>Oops! something's not right</Message.Header>
                <p>{errors.message}</p>
                </Message> }
                <Form.Field error={!!errors['name']}>
                    <label htmlFor='Category Name'>Category Name</label>
                    <input type='text'
                           id='Category Name' 
                           name='name' 
                           value={ data['name'] }
                           onChange= {this.onChange}

                    />
                    {errors['name'] && <InlineError text={errors['name']} />}

                </Form.Field>
                <Form.Field error={!!errors['detail']} >
                    <label htmlFor='description'>Description</label>
                    <TextArea autoHeight type='textarea'
                           id='description' 
                           name='detail'
                           onChange= {this.onChange}
                           value={ data['detail'] }


                     />
                    {errors['detail'] && <InlineError text={errors['detail']} />}
                </Form.Field>
                </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.onSubmit} loading={loading}>
              <Icon name='edit' />
              Edit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

CategoryEditModal.propTypes = {
    putCategory: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    logout: PropTypes.func.isRequired


};


export default connect(null, { putCategory, logout })(CategoryEditModal);
