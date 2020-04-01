import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useHttp} from '../../../../../hooks/http.hook';
import {useMessage} from '../../../../../hooks/message.hook';

const NewLoadItemFull = props => {

  const history = useHistory();
  const storageName = 'userData';
  const storeData = JSON.parse(localStorage.getItem(storageName));
  const pathname = window.location.pathname;
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [newLoad, setLoad] = useState({
    id: '',
    title: '',
    width: 0,
    length: 0,
    height: 0,
    payload: 0,
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const postLoadItemHandler = async () => {

    await request(`${pathname}`, 'PUT', null, {
      'Content-Type': 'application/json',
      'Authorization': storeData.token
    });

  };

  const deleteLoadItemHandler = async () => {

    await request(`${pathname}`, 'DELETE', null, {
      'Content-Type': 'application/json',
      'Authorization': storeData.token
    });
    console.log('Load was deleted');
    history.push('/loads/new-loads');

  };

  const editLoadItemHandler = async () => {

    await request(`${pathname}`, 'PATCH', null, {
      'Content-Type': 'application/json',
      'Authorization': storeData.token
    });


  };


  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const receiveLoad = await request(`${pathname}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token
        });

        setLoad({
          ...newLoad,
          id: receiveLoad.load._id,
          title: receiveLoad.load.title,
          width: receiveLoad.load.dimensions.width,
          length: receiveLoad.load.dimensions.length,
          height: receiveLoad.load.dimensions.height,
          payload: receiveLoad.load.payload,
        });

      } catch(e) {
        console.log('Load was not received', e)
      }
    }
    fetchData();
  }), []);



  return (
    <div>
        Title: {newLoad.title}
      <div>
        Width: {newLoad.width}
        Length: {newLoad.length}
        Height: {newLoad.height}
      </div>
      <div>
        PayLoad: {newLoad.payload}
      </div>
      <button onClick={editLoadItemHandler}>Edit</button>
      <button onClick={deleteLoadItemHandler}>Delete</button>
      <button onClick={postLoadItemHandler}>Post</button>
    </div>
  );
};

NewLoadItemFull.propTypes = {

};

export default NewLoadItemFull;
