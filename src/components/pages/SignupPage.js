import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';
import logo from '../../misc/logo.png'


class SignupPage extends React.Component {
    submit = (data) => this.props.signup(data).then(() => this.props.history.push('/login'))
    render(){
        return(
            <div>
                <h1>Signup</h1>
                <div className="large-logo"><img src={logo} alt='logo'/></div>
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);
