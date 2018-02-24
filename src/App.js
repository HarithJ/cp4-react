import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';



const App = ({ location }) => (
      <div>
        <Route location={ location }path="/" exact component={HomePage} />
        <GuestRoute location={ location } path='/login' exact component={LoginPage} />
        <GuestRoute location={ location } path='/signup' exact component={SignupPage} />
        <UserRoute location={ location } path='/dashboard' exact component={ DashboardPage } />
      </div>
    )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};
export default App;
