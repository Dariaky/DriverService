import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {LoginContext} from '../../context/LoginContext';
import './header.css';
import Profile from '../profile/Profile';

const Header = props => {

  const authorization = useContext(LoginContext);

  const logoutHandler = () => {
    authorization.logout();
  };

  const changePasswordHandler = async () => {
    // sending put request to /propfile/:id/password
    // try {
    //   const data = await request('/login', 'PUT', {...form});
    //   // console.log('DATA: ', data.jtwToken, data.userId, data.userName);
    //
    //   authorization.login(data.jwtToken, data.userId, data.role)
    // } catch(e) {
    //
    // }
  };


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
            <Link className="header__logo-link" to={`/profile/${props.userId}`}>Profile</Link>
          </div>
          <div className="header__log">
            <Link
              to="/"
              className="header__link header__login-link"
              onClick={logoutHandler}>Log out</Link>
            <Link
              onClick={changePasswordHandler}
              className="header__link header__register-link"
              to={`/profile/${props.userId}/change-password`}>Change Password</Link>
          </div>
        </div>
      </header>
    )
  }


};

Header.propTypes = {

};

export default Header;
