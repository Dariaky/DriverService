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
import DeleteAccount from './components/DeleteAccount';

import CreateLoad
  from './components/profile/ShipperProfile/CreateLoad/CreateLoad';
import NewLoads from './components/profile/ShipperProfile/NewLoads/NewLoads';
import PostedLoads
  from './components/profile/ShipperProfile/PostedLoads/PostedLoads';
import LoadsHistory
  from './components/profile/ShipperProfile/LoadsHistory/LoadsHistory';
import NewLoadItemFull
  from './components/profile/ShipperProfile/NewLoads/NewLoadItem(full)/NewLoadItemFull';


const useRoutes = (isAuthenticated, userId, userRole) => {

  if(!isAuthenticated) {
    return (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} userId={userId} userRole={userRole}/>
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
      <Header isAuthenticated={isAuthenticated} userId={userId} userRole={userRole}/>
      <Switch>
        <Route path={`/profile/:id`} exact component={Profile} />}/>
        <Route path={`/profile/:id/change-password`} exact component={ChangePassword}/>
        <Route path={`/profile/:id/delete-account`} exact component={DeleteAccount}/>

        <Route path={`/loads/create-load`} exact component={CreateLoad}/>
        <Route path={`/loads/new-loads`} exact component={NewLoads}/>
        <Route path={`/loads/posted-loads`} exact component={PostedLoads}/>
        <Route path={`/loads/loads-history`} exact component={LoadsHistory}/>

        <Route path={`/loads/:id`} exact component={NewLoadItemFull}/>
        <Route path={`/loads/:id/hello`} exact component={NewLoadItemFull}/>

        <Route path="/" exact component={Main} />
      </Switch>
      <Footer/>
    </React.Fragment>
  );




};

useRoutes.propTypes = {

};

export default useRoutes;
