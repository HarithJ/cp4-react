import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import logo from '../../misc/logo.png';

const TopNavigation = ({ user, logout }) => (
  <Menu secondary pointing>
    <Menu
      secondary
      pointing
      className="ui container"
      style={{
      width: '63%'
    }}
    >
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
      <Menu.Menu position="right" >
        <Dropdown
          trigger={
            <Avatar name={user.email} size={30} round />
        }
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/' onClick={() => logout()}>Logout</Dropdown.Item>
            <Dropdown.Item as={Link} to="/reset">Reset</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes
    .shape({ email: PropTypes.string.isRequired })
    .isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);
