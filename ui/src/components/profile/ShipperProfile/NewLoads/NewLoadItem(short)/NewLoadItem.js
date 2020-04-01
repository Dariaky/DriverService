import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewLoadItem = ({_id, title, payload}) => {

  const history = useHistory();

  const showNewLoadHandler = () => {

    history.push(`/loads/${_id}`);
  };

  return (
    <li>
      <h2>Title: {title}</h2>
      <div>
        Payload: {payload}
      </div>
      <button onClick={showNewLoadHandler}>View Details</button>
    </li>
  );
};

NewLoadItem.propTypes = {

};

export default NewLoadItem;
