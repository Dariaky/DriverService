import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import TruckItemShort from './TruckItem(short)/TruckItemShort';
import './my-trucks.css';


const MyTrucks = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [myTrucks, setMyTrucks] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const trucks = await request(`/trucks/my-trucks`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setMyTrucks([
          ...myTrucks,
          ...trucks.foundTrucks
        ])

      } catch(e) {
        console.log('Trucks were not received', e)
      }
    }
    fetchData();
  }), []);


  return (

    <div>
      <h1 className="section__title">My Trucks</h1>
      {myTrucks.length !== 0 ? <ul className="truck__list">
        {myTrucks.map(item => <TruckItemShort key={item._id} {...item}/>)}
      </ul> : <p>Yet no new trucks:(</p> }

    </div>

  );
};

MyTrucks.propTypes = {

};

export default MyTrucks;
