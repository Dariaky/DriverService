import React from 'react';
import PropTypes from 'prop-types';

import './shipper-profile.css';
import {Link} from 'react-router-dom';

const ShipperProfile = props => {
  return (
    <React.Fragment>
      <h1 className="section__title">Welcome {props.user.name}!</h1>
      <ul className="load__list">
        <li className="load__create-button-container">
          <Link to={`/loads/create-load`} className="load__create-button">Create Load</Link>
        </li>
        <li className="load__create-button-container">
          <Link to={`/loads/new-loads`} className="load__create-button">New</Link>
        </li>
        <li className="load__create-button-container">
          <Link to={`/loads/posted-loads`} className="load__create-button">In Progress</Link>
        </li>
        <li className="load__create-button-container">
          <Link to={`/loads/loads-history`} className="load__create-button">My History</Link>
        </li>
      </ul>

    </React.Fragment>
  );
};

ShipperProfile.propTypes = {

};

export default ShipperProfile;
