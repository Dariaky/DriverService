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

  };

  const deleteUser = async () => {
    console.log("Props in headers: ", props);
  };

  const UnAuthorizedMenu = () => {
    return (
      <div className="header__log">
        <Link
          className="header__link header__login-link"
          to="/login">Log in</Link>
        <Link
          className="header__link header__register-link"
          to="/registration">Register</Link>
      </div>
    )
  };

  const AuthorizedMenu = () => {
    return (
      <React.Fragment>
      <div className="header__logo">
        <Link className="header__logo-link"
              to={`/profile/${props.userId}`}>Profile</Link>
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

        {props.userRole === 'shipper' ? <Link
          onClick={deleteUser}
          className="header__link header__register-link"
          to={`/profile/${props.userId}/delete-account`}>Delete Account</Link> : ''}
      </div>
      </React.Fragment>
    )
  };

    return (
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <Link className="header__logo-link" to="/">DriverApp</Link>
          </div>
            {!props.isAuthenticated ? <UnAuthorizedMenu/> : <AuthorizedMenu/>}
        </div>
      </header>
    )




};

Header.propTypes = {

};

export default Header;
