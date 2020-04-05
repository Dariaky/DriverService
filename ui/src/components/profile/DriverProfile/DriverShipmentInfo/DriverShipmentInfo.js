import React, {useEffect, useState} from 'react';
import DriverNav from '../DriverNav/DriverNav';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';

const DriverShipmentInfo = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const receivedShipments = await request(`/trucks/shipments`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setShipments([
          ...shipments,
          ...receivedShipments
        ])

      } catch(e) {
        console.log('Shipments were not received', e)
      }
    }
    fetchData();
  }, []);


  return (
    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">Shipment Info</h1>

        {shipments.length !== 0 ? <ul className="driver-shipments__list">
          {shipments.map(shipment =>
            <li className="driver-shipments__item">
            <h4>Load Title: {shipment.title}</h4>
            <div>Load state: {shipment.state}</div>
          </li>
          )}
        </ul> : <p className="driver-shipments__no-items">Yet no assigned loads:(</p> }

    </div>
  );
};


export default DriverShipmentInfo;
