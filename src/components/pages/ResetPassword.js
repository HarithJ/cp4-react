import React from 'react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../../actions/auth';
import logo from '../../misc/logo.png'

export class ResetPassword extends React.Component {
    submit = (data, reset=false) => {
        if (reset) {
            return this.props.reset(data).then(() => this.props.history.push('reset'));
        } else {
            return this.props.reset(data).then(() => this.props.history.push('login'));
        }
    };
    render() {
        return(
            <div>
                {!!this.props.message && <Message
                    success
                    header={this.props.message.message}
                    content='Please check your mailbox'
                />}
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
    reset: PropTypes.func.isRequired,
    message: PropTypes.object,

}

function mapStateToProps(state) {
    return {
        message : state.user.message
    }
} 
export default connect(mapStateToProps, { reset })(ResetPassword);