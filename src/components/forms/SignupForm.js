import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';


class SignupForm extends React.Component{
    state = {
        data: {
            
            'email': '',
            'password': '',
            'First Name': '',
            'Last Name': '',
            'Secret word': '',
        },
        loading: false,
        errors: {}
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
             this.props
             .submit(this.state.data)
             .catch( errors => this.setState({ errors: errors.response.data, loading: false}) );
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data['email'])) errors.email = 'Invalid Email';
        if (!data['password']) errors.password = "Can't be blank";
        if (!data['Secret word']) errors['Secret word'] = "Can't be blank";
        if (!data['First Name']) errors['First Name'] = "Can't be blank";
        if (!data['Last Name']) errors['Last Name'] = "Can't be blank";
        
        return errors;


    }
    onChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }
    render(){
        const { data, errors, loading } = this.state;
        return(
            <Form onSubmit = {this.onSubmit} loading={loading}>
            { errors.message && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.message}</p>
                </Message>}
            <Form.Field error={!!errors['First Name']}>
                    <label htmlFor='First Name'>First Name</label>
                    <input type='text'
                           id='firstName' 
                           name='First Name' 
                           placeholder='Donald'
                           value={ data['First Name'] }
                           onChange= {this.onChange}

                    />
                    {errors['First Name'] && <InlineError text={errors['First Name']} />}
            </Form.Field>
            <Form.Field error={!!errors['Last Name']}>
                    <label htmlFor='Last Name'>Last Name</label>
                    <input type='text'
                           id='lastName' 
                           name='Last Name' 
                           placeholder='Duck'
                           value={ data['Last Name'] }
                           onChange= {this.onChange}

                    />
                    {errors['Last Name'] && <InlineError text={errors['Last Name']} />}
            </Form.Field>
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
                           placeholder='Make it secure'
                           value={ data.password }
                           onChange= {this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}  
            </Form.Field>
            <Form.Field error={!!errors['Secret word']}>
                    <label htmlFor='Secret word'>Secret word</label>
                    <input type='password'
                           id='secretWord' 
                           name='Secret word' 
                           placeholder='This is TOP SECRET and can be used to reset your password'
                           value={ data['Secret word'] }
                           onChange= {this.onChange}

                    />
                    {errors['Last Name'] && <InlineError text={errors['Last Name']} />}
            </Form.Field>
            <Button primary>Sign Up</Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired,


};

export default SignupForm;