import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import NewLoadItem from './NewLoadItem(short)/NewLoadItem';


const NewLoads = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [newLoads, setNewLoads] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const receivedNewLoads = await request(`/loads/new-loads`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });
        console.log(receivedNewLoads.foundNewLoads);
        setNewLoads([
          ...newLoads,
          ...receivedNewLoads.foundNewLoads
        ]) // meno male

      } catch(e) {
        console.log('Loads were not received', e)
      }
    }
    fetchData();
  }), []);


  return (

          <div>
            <h1>Your Newly created Loads</h1>
            {newLoads.length !== 0 ? <ul>
              {newLoads.map(item => <NewLoadItem key={item._id} {...item}/>)}
            </ul> : <p>Yet no new loads:(</p> }

          </div>

  );
};

NewLoads.propTypes = {

};

export default NewLoads;
