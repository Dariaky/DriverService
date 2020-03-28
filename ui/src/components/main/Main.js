import React from 'react';
import PropTypes from 'prop-types';

import './main.css'

const Main = props => {
  return (
    <section className="intro">
      <div className="intro__container">
        <h1 className="intro__title">
          Welcome To Driver Application!
        </h1>
        <p className="intro__subtitle">
          Please register to start ordering trucks and delivering loads
        </p>
      </div>
    </section>
  );
};

Main.propTypes = {

};

export default Main;
