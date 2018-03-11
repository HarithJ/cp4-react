import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";
import logo from '../../misc/logo.png'




export const HomePage = ({ isAuthenticated, logout, token}) => (
    <div className='homepage'>
        <h1> Home </h1>
        {isAuthenticated ? (<button onClick={() => logout(token) }> Logout</button> ): 
            (<div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
                <div className="large-logo"><img src={logo} alt='logo'/></div>
            </div>
            )}
    </div>

);

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user['Access token'],
        token: state.user['Access token']
    }
}
export default connect(mapStateToProps, { logout })(HomePage);