import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../../hooks/http.hook';

import './profile.css'


const Profile = props => {

  const { request } = useHttp();

  const storageName = 'userData';

  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const user = await request(`/profile/${storeData.userId}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'Role': storeData.role,
        });

        console.log("DATA from login: ", user);

      } catch(e) {

      }
    }
    fetchData();
  }), []);


  return (
    <section>
      <h1 className="section__title">Notes</h1>
      <div>
        <form>
          <input name="notename" />
            <button>Your truck</button>
        </form>
        <ul className="notes__list">
          <li className="notes__item">Truck 1 <button>Delete</button></li>
          <li className="notes__item">Truck 2 <button>Delete</button></li>
          <li className="notes__item">Truck 3 <button>Delete</button></li>
          <li className="notes__item">Truck 4 <button>Delete</button></li>
          <li className="notes__item">Truck 5 <button>Delete</button></li>
        </ul>
      </div>
    </section>
  );
};

Profile.propTypes = {

};

export default Profile;
