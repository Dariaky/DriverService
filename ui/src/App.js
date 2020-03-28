import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
