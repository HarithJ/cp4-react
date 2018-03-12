import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import LoginPage from './components/pages/LoginPage';
import ResetPassword from './components/pages/ResetPassword';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import RecipesPage from './components/pages/RecipesPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';
import TopNavigation from './components/navigation/TopNavigation';
import './style.css';

const App = ({location, isAuthenticated}) => (
  <div>
    {isAuthenticated && <TopNavigation/>}
    <div className="ui container">
      <Switch>
        <Route path="/" location={location} exact component={HomePage}/>
        <GuestRoute location={location} path="/login" exact component={LoginPage}/>
        <GuestRoute location={location} path="/signup" exact component={SignupPage}/>
        <UserRoute
          location={location}
          path="/dashboard"
          exact
          component={DashboardPage}/>
        <UserRoute
          location={location}
          path="/category/:categoryId/recipes"
          exact
          component={RecipesPage}/>
        <Route path="/reset" location={location} exact component={ResetPassword}/>
        <Route location={location} path="*" exact component={NotFound}/>
      </Switch>
    </div>
  </div>
);

App.propTypes = {
  location: PropTypes
    .shape({pathname: PropTypes.string.isRequired})
    .isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
