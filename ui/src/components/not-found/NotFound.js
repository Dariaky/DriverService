import React from 'react';
import PropTypes from 'prop-types';

const NotFound = props => {
  return (
    <div>
      <h1>
        Whoooooops! Page not found:(
      </h1>
      <a href="/">Back Home</a>
    </div>
  );
};

NotFound.propTypes = {

};

export default NotFound;
