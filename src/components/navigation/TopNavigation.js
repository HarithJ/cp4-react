import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import gravatarUrl from 'gravatar-url';
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
            <Image
              avatar
              src={gravatarUrl(user.email, { d: 'mm' })}
            />
        }
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
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
