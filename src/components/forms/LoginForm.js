import React from 'react';
import {Form, Button, Message, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        data: {
            email:'',
            password:'',
        },
        loading: false,
        errors: {}
    };

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
             this.props
             .submit(this.state.data)
             .catch( errors => this.setState({ errors: errors.response.data, loading: false}) );
        }
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    }
    onChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }
    render() {
        const { data, errors, loading } = this.state;
        return(
            <div className="ui one column stackable center aligned page grid">
                <div className="column twelve wide login">
                <Segment>
                <Form floated='right' onSubmit={this.onSubmit} loading={loading}>
                <h4 className="ui dividing header left">Login</h4>

                    { errors.message && <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.message}</p>
                    </Message>}
                    <Form.Field error={!!errors.email}>
                        <label htmlFor='email'>Email</label>
                        <input type='email'
                            id='email' 
                            name='email' 
                            placeholder='example@email.com'
                            value={ data.email }
                            onChange= {this.onChange}

                        />
                        {errors.email && <InlineError text={errors.email} />}
                    </Form.Field>
                    <Form.Field error={!!errors.password}>
                        <label htmlFor='password'>Password</label>
                        <input type='password'
                            id='password' 
                            name='password' 
                            placeholder='eg. *************'
                            value={ data.password }
                            onChange= {this.onChange}
                        />
                        {errors.password && <InlineError text={errors.password} />} 
                    </Form.Field>
                    <Button floated='right' secondary>Login</Button>
                </Form>
                </Segment>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;