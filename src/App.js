import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import RecipesPage from './components/pages/RecipesPage'
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';
import TopNavigation from './components/navigation/TopNavigation'
import './style.css';



const App = ({ location, isAuthenticated }) => (
    <div>
      { isAuthenticated && <TopNavigation/> }
      <div className="ui container">
        <Route location={ location }path="/" exact component={HomePage} />
        <GuestRoute location={ location } path='/login' exact component={LoginPage} />
        <GuestRoute location={ location } path='/signup' exact component={SignupPage} />
        <UserRoute location={ location } path='/dashboard' exact component={ DashboardPage } />
        <UserRoute location={ location } path='/category/:category_id/recipes' exact component={ RecipesPage } />
      </div>
    </div>
    )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}


export default connect(mapStateToProps)(App);
