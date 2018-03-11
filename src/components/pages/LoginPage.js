import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import logo from '../../misc/logo.png'

export class LoginPage extends React.Component {
    submit = data => {
        return this.props.login(data).then(() => this.props.history.push('dashboard'));
    };
    render() {
        return(
            <div>
                {!!this.props.message && <Message
                    success
                    header={this.props.message.message}
                    content='You may now log-in with your email and password'
                />}
                <h1>
                    Login
                </h1>
                <div className="large-logo"><img src={logo} alt='logo'/></div>
                <LoginForm submit={this.submit}/>
            </div>
        );
    }
}
LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    login: PropTypes.func.isRequired, 
    message: PropTypes.object,

}

function mapStateToProps(state) {
    return {
        message : state.user.message
    }
} 
export default connect(mapStateToProps, { login})(LoginPage);