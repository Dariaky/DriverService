import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useHttp} from '../../../../../hooks/http.hook';
import {useMessage} from '../../../../../hooks/message.hook';
import EditLoad
  from '../../../ShipperProfile/NewLoads/NewLoadItem(full)/NewLoadItemFull';
import EditTruck from '../../EditTruck/EditTruck';

const TruckItemFull = props => {

  const history = useHistory();
  const storageName = 'userData';
  const storeData = JSON.parse(localStorage.getItem(storageName));
  const pathname = window.location.pathname;
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [editForm, setEditForm] = useState(false);

  const [truck, setTruck] = useState({
    model: '',
    type: '',
    assignedTo: '',
  });


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const receivedTruck = await request(`${pathname}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token
        });

        setTruck({
          ...truck,
          model: receivedTruck.truck.model,
          type: receivedTruck.truck.type,
          assignedTo: receivedTruck.truck.assignedTo,
        });


      } catch(e) {
        console.log('Truck was not received', e)
      }
    }
    fetchData();
  }), []);

  const editTruckHandler = () => {
    setEditForm(!editForm);
  };

  const onEditedTruck = (editedTruck) => {

    setTruck({
      ...truck,
      model: editedTruck.editedTruck.model,
      type: editedTruck.editedTruck.type,
    });
    setEditForm(false);

  };



  const deleteTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}`, 'DELETE', null, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was deleted!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not deleted', e);
      history.push('/trucks/my-trucks');
    }
  };


  const assignTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}/assign`, 'PATCH', {userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });


      console.log("Truck was assigned!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not assigned', e)
    }
  };

  const reassignTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}/reassign`, 'PATCH', {userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was reassigned!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not reassigned', e)
    }
  };

  const buttonLayout = (assigned) => {

    if (assigned === '') {
      return (
        <React.Fragment>
          <button onClick={editTruckHandler}>Edit</button>
          <button onClick={deleteTruckHandler}>Delete</button>
          <button onClick={assignTruckHandler}>Assign</button>

          { editForm ? <EditTruck onEditedTruck={onEditedTruck} {...truck}/> : ''}
        </React.Fragment>
      )
    } else {
      return <button onClick={reassignTruckHandler}>Reassign</button>
    }

  };

  return (
    <div>
      <div>
        Model: {truck.model}
      </div>
      <div>
        Type: {truck.type}
      </div>
      {buttonLayout(truck.assignedTo)}
    </div>
  );
};

TruckItemFull.propTypes = {

};

export default TruckItemFull;
