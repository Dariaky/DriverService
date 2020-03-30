import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Profile from './components/profile/Profile';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';

const useRoutes = isAuthenticated => {
  if(isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Redirect to="/" />
    </Switch>
  );
};

useRoutes.propTypes = {

};

export default useRoutes;
