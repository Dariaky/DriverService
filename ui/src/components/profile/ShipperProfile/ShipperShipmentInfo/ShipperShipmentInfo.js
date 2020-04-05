import React, {useEffect, useState} from 'react';
import ShipperNav from '../ShipperNav/ShipperNav';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';


const ShipperShipmentInfo = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [assignedLoads, setAssignedLoads] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const receivedLoads = await request(`/loads/shipments`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setAssignedLoads([
          ...assignedLoads,
          ...receivedLoads
        ])

      } catch(e) {
        console.log('Loads were not received', e)
      }
    }
    fetchData();
  }, []);




  return (
    <div className="section__layout">
      <ShipperNav/>
      <h1 className="section__title">Shipment Info</h1>
      {assignedLoads.length !== 0 ? <ul className="new-loads__list">
        {assignedLoads.map(item => <li>{item.title}: {item.state}</li>)}
      </ul> : <p className="new-loads__no-items">Yet no assigned loads:(</p> }
    </div>
  );
};

export default ShipperShipmentInfo;
