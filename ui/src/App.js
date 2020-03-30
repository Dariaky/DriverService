import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import useRoutes from './routes';
import {useLogin} from './hooks/login.hook';
import {LoginContext} from './context/LoginContext';


function App() {
  const {token, login, logout, userId} = useLogin();

  const isAuthenticated = !!token; // true false

  const routes = useRoutes(isAuthenticated);
  return (
    <LoginContext.Provider value={{
      token, login, logout, userId
    }}>
      <Router>
        <div className="App">
            {routes}
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
