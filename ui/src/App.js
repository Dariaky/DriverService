import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import useRoutes from './routes';
import {useLogin} from './hooks/login.hook';
import {LoginContext} from './context/LoginContext';

function App() {
  const {token, login, logout, userId} = useLogin();
  console.log("TOKEN",token);
  const isAuthenticated = !!token;
  console.log("AUTHENTICATED",isAuthenticated);
  const routes = useRoutes(isAuthenticated);
  return (
    <LoginContext.Provider value={{
      token, login, logout, userId
    }}>
      <Router>
        <div className="App">
          <Header/>
            {routes}
          <Footer/>
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
