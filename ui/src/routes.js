import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Profile from './components/profile/Profile';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ChangePassword from './components/ChangePassword';


const useRoutes = (isAuthenticated, userId, role) => {

  if(!isAuthenticated) {
    return (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} userId={userId} role={role}/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Header isAuthenticated={isAuthenticated} userId={userId} role={role}/>
      <Switch>
        <Route path={`/profile/${userId}`} exact component={Profile}/>
        <Route path={`/profile/${userId}/change-password`} exact component={ChangePassword}/>
        <Route path="/" exact component={Main} />
      </Switch>
      <Footer/>
    </React.Fragment>
  );




};

useRoutes.propTypes = {

};

export default useRoutes;
