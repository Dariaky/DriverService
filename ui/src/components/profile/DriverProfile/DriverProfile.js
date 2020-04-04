import React from 'react';
import PropTypes from 'prop-types';

import './driver-profile.css'
import {Link} from 'react-router-dom';

const DriverProfile = props => {
  return (
    <React.Fragment>
      <h1 className="section__title">Welcome {props.user.name}!</h1>
      <ul className="options__list">
        <li className="truck__create-button-container">
          <Link to={`/trucks/create-truck`} className="truck__create-button">Create Truck</Link>
        </li>
        <li className="truck__create-button-container">
          <Link to={`/trucks/my-trucks`} className="truck__create-button">My Trucks</Link>
        </li>
        <li className="truck__create-button-container">
          <Link to={`/trucks/my-orders`} className="truck__create-button">My Orders</Link>
        </li>
      </ul>
    </React.Fragment>






  );
};

DriverProfile.propTypes = {

};

export default DriverProfile;
