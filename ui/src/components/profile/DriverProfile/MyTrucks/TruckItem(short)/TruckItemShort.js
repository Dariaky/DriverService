import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const TruckItemShort = ({_id, model, assignedTo}) => {

  const history = useHistory();

  const showTruckHandler = () => {
    history.push(`/trucks/${_id}`);
  };

  const cls = ['truck__item'];

  if(assignedTo) {
    cls.push('isAssigned');
  }

  return (
    <li className={cls.join(' ')}>
      <h2>Model: {model}</h2>

      <button onClick={showTruckHandler}>View Details</button>
    </li>
  );
};

TruckItemShort.propTypes = {

};

export default TruckItemShort;
