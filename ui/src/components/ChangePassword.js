import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const ChangePassword = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);



  const changePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      const data = await request(`/profile/${storeData.userId}/change-password`, 'PUT', {...form, role: storeData.role}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log(data)
    } catch(e) {
      console.log('Password was not changed', e)
    }
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };


  return (
    <div className="login">
      <h1 className="section__title">Change Password</h1>
      <form
        onSubmit={changePasswordHandler}
        className="form login__form">
        <div className="form__container">
          <label htmlFor="user-old-password" className="form__label">Old Password</label>
          <input
            id="user-old-password"
            type="password"
            name="oldPassword"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="user-new-password"
                 className="form__label">New Password</label>
          <input
            type="password"
            id="user-new-password"
            name="newPassword"
            className="form__input"
            onChange={changeHandler}
          />
          <p>{error}</p>
        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {

};

export default ChangePassword;
