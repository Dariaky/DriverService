import React from 'react';
import PropTypes from 'prop-types';

import './shipper-profile.css';

const ShipperProfile = props => {
  return (
    <React.Fragment>
      <h1 className="section__title">Loads</h1>
      <div>
        <form className="load__form">
          <div className="load__form-input-container">
            <input name="loadname" className="load__input"/>
            <div className="load__create-button-container">
              <button className="load__create-button">Create load</button>
            </div>
          </div>
        </form>

        <ul className="load__list">
          <li className="load__item">Load 1
            <button className="load__item-button">Delete</button>
          </li>
          <li className="load__item">Load 2
            <button className="load__item-button">Delete</button>
          </li>
          <li className="load__item">Load 3
            <button className="load__item-button">Delete</button>
          </li>
          <li className="load__item">Load 4
            <button className="load__item-button">Delete</button>
          </li>
          <li className="load__item">Load 5
            <button className="load__item-button">Delete</button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

ShipperProfile.propTypes = {

};

export default ShipperProfile;
