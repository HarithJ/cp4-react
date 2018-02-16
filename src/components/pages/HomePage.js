import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";



const HomePage = ({ isAuthenticated, logout, token}) => (
        <div>
            <h1>
                Home Page
            </h1>
    {isAuthenticated ? (<button onClick={() => logout(token) }> Logout</button> ): 
            (<div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>)}
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