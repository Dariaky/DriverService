import React from 'react';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';

import './login.css'

const Login = props => {
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = (loginInfo) => {
    console.log(loginInfo);
  };

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   fetch(`https://hooks.zapier.com/hooks/catch/1239764/oo73gyz/`, {
  //     method: 'POST',
  //     body: JSON.stringify({ email, comment, key: feature }),
  //   }).then(() => setIsSent(true))
  // }



  return (
    <div className="login">
      <h1 className="section__title">Sign In</h1>
      <form method="POST" className="form login__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__container">
          <label htmlFor="user-email" className="form__label">Email</label>
          <input
            id="user-email"
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form__input"
            ref={register({required: true})}
          />
        </div>
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Password</label>
          <input
            id="user-password"
            name="password"
            className="form__input"
            ref={register({required: true, minLength: 3})}
          />
        </div>
        {errors.password && <p>Password in invalid</p>}
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Role</label>
          <select
            ref={register}
            id="user-role"
            name="role"
            className="form__input">
            <option>Driver</option>
            <option>Shipper</option>
          </select>
        </div>
        <div className="form__container">
          <button type="submit" className="form__submit-button">Sign In</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {

};

export default Login;
