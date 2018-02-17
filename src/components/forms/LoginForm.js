import React from 'react';
import {Form, Button, Message } from 'semantic-ui-react';
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
            <Form onSubmit={this.onSubmit} loading={loading}>
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
                <Button secondary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;