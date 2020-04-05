import React from 'react';
import ShipperNav from '../ShipperNav/ShipperNav';

const ShipperShipmentInfo = props => {
  return (
    <div className="section__layout">
      <ShipperNav/>
      <h1 className="section__title">Shipment Info</h1>
      Here you can check info and updates about your loads
    </div>
  );
};

export default ShipperShipmentInfo;
