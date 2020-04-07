import React from 'react';

import './main.css'
const Main = props => {
  return (
    <div>
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">
            Welcome To Load Transportation Application!
          </h1>
          <p className="intro__subtitle">
            Register to join our cargo community. Create shipper account in
            case you want to find trucks for your loads or driver account to
            start delivering loads.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
