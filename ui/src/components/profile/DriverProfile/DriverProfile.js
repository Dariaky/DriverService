import React from 'react';
import PropTypes from 'prop-types';

import './driver-profile.css'

const DriverProfile = props => {
  return (
    <React.Fragment>
      {/*<h1 className="section__title">Trucks</h1>*/}
      <div>
        <div className="truck__create-button-container">
          <button className="truck__create-button">Create truck</button>
        </div>
        <div className="truck__create-button-container">
          <button className="truck__create-button">Create truck</button>
        </div>
        <div className="truck__create-button-container">
          <button className="truck__create-button">Create truck</button>
        </div>

        {/*<form className="truck__form">*/}
          {/*<div className="truck__form-input-container">*/}
            {/*<input name="truckname" className="truck__input"/>*/}
            {/*<div className="truck__create-button-container">*/}
              {/*<button className="truck__create-button">Create truck</button>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</form>*/}

        {/*<ul className="truck__list">*/}
          {/*<li className="truck__item">Truck 1*/}
            {/*<button className="truck__item-button">Delete</button>*/}
          {/*</li>*/}
          {/*<li className="truck__item">Truck 2*/}
            {/*<button className="truck__item-button">Delete</button>*/}
          {/*</li>*/}
          {/*<li className="truck__item">Truck 3*/}
            {/*<button className="truck__item-button">Delete</button>*/}
          {/*</li>*/}
          {/*<li className="truck__item">Truck 4*/}
            {/*<button className="truck__item-button">Delete</button>*/}
          {/*</li>*/}
          {/*<li className="truck__item">Truck 5*/}
            {/*<button className="truck__item-button">Delete</button>*/}
          {/*</li>*/}
        {/*</ul>*/}
      </div>
    </React.Fragment>
  );
};

DriverProfile.propTypes = {

};

export default DriverProfile;
