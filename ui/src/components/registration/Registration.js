import React from 'react';
import PropTypes from 'prop-types';

import './registration.css'

const Registration = props => {
  return (
    <div className="registration">
      <h1 className="section__title">Registration</h1>
      <form method="POST" className="form registration__form"
            action="/registration">
        <div className="form__container">
          <label htmlFor="user-email" className="form__label">Email</label>
          <input id="user-email" name="email" placeholder="john@gmail.com"
                 className="form__input" />
        </div>
        <div className="form__container">
          <label htmlFor="user-name" className="form__label">Name</label>
          <input id="user-name" name="name" placeholder="John Doe"
                 className="form__input" />
        </div>
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Password</label>
          <input id="user-password" name="password" className="form__input" />
        </div>
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Role</label>
          <select id="user-role" name="role" className="form__input">
            <option>Driver</option>
            <option>Shipper</option>
          </select>
        </div>
        <div className="form__container">
          <button type="submit"
                  className="form__submit-button form__registration-button">Register
          </button>
        </div>
      </form>
    </div>
  );
};

Registration.propTypes = {

};

export default Registration;
