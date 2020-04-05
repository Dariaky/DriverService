import React from 'react';
import DriverNav from '../DriverNav/DriverNav';

const DriverShipmentInfo = props => {
  return (
    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">Shipment Info</h1>
      Here you can check info about assigned to you loads
    </div>
  );
};


export default DriverShipmentInfo;
