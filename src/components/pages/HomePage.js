import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import logo from '../../misc/logo.png';

export const HomePage = ({ isAuthenticated, logout, token }) => (
  <div className="homepage">
    <h1>
      Home
    </h1>
    {isAuthenticated
      ? (
        <button onClick={() => logout(token)}>
          Logout
        </button>
      )
      : (
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <Button size="massive" as={Link} to="/login">Login</Button>
            {' '}
            or
            {' '}
            <Button  size="massive" secondary as={Link} to="/signup">signup</Button>
            <div className="large-logo"><img src={logo} alt="logo" /></div>
          </div>
        </div>
        
      )}
  </div>

);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.string
};
HomePage.defaultProps = {
  token: null
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user['Access token'],
    token: state.user['Access token']
  };
}
export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
