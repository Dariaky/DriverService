import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Profile from './components/profile/Profile';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';


const useRoutes = isAuthenticated => {

  if(!isAuthenticated) {
    return (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated}/>
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
      <Header isAuthenticated={isAuthenticated}/>
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Main} />
        <Redirect to="/profile" />
      </Switch>
      <Footer/>
    </React.Fragment>
  );




};

useRoutes.propTypes = {

};

export default useRoutes;
