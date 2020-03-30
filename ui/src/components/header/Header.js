import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './header.css';

const Header = props => {

  if(!props.isAuthenticated) {
    return (
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <Link className="header__logo-link" to="/">DriverApp</Link>
          </div>
          <div className="header__log">
            <Link
              className="header__link header__login-link"
              to="/login">Log in</Link>
            <Link
              className="header__link header__register-link"
              to="/registration">Register</Link>
          </div>
        </div>
      </header>
    )
  } else {
    return(
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <Link className="header__logo-link" to="/">DriverApp</Link>
          </div>
          <div className="header__logo">
            <Link className="header__logo-link" to="/profile">Profile</Link>
          </div>
          <div className="header__log">
            <Link
              className="header__link header__login-link"
              to="/logout">Log out</Link>
            <Link
              className="header__link header__register-link"
              to="/delete-account">Delete account</Link>
          </div>
        </div>
      </header>
    )
  }


};

Header.propTypes = {

};

export default Header;
