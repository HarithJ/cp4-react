import React from 'react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { reset } from '../../actions/auth';
import logo from '../../misc/logo.png'

class ResetPassword extends React.Component {
    submit = data => {
        return this.props.reset(data).then(() => this.props.history.push('login'));
    };
    render() {
        return(
            <div>
                <h1>
                    Reset Password
                </h1>
                <div className="large-logo"><img src={logo} alt='logo'/></div>
                <ResetPasswordForm submit={this.submit}/>
            </div>
        );
    }
}
ResetPassword.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    reset: PropTypes.func.isRequired

}
export default connect(null, /*{ reset }*/)(ResetPassword);