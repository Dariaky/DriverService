import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';

import PropTypes from 'prop-types';

const CreateLoad = props => {

  const history = useHistory();
  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    title: '',
    width: '',
    length: '',
    height: '',
    payload: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);



  const createLoadHandler = async (e) => {
    e.preventDefault();

    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`/loads/create-load`, 'POST', {...form, userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Load was created!");
      history.push(`/loads/new-loads`);

    } catch(e) {
      console.log('Load was not created', e)
    }
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };


  return (
    <div>
      <h1>Create load</h1>
      <form
        onSubmit={createLoadHandler}
        className="form login__form">
        <div className="form__container">
          <label htmlFor="load-title" className="form__label">Title</label>
          <input
            id="load-title"
            type="text"
            name="title"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-width"
                 className="form__label">Width</label>
          <input
            type="number"
            id="load-width"
            name="width"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-length"
                 className="form__label">Length</label>
          <input
            type="number"
            id="load-length"
            name="length"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-height"
                 className="form__label">Height</label>
          <input
            type="number"
            id="load-height"
            name="height"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-payload"
                 className="form__label">Payload</label>
          <input
            type="number"
            id="load-payload"
            name="payload"
            className="form__input"
            onChange={changeHandler}
          />

        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Create Load
          </button>
        </div>
      </form>
    </div>
  );
};

CreateLoad.propTypes = {

};

export default CreateLoad;