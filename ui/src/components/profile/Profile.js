import React, {useEffect, useCallback, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';

import PropTypes from 'prop-types';

import ShipperProfile from './ShipperProfile/ShipperProfile';
import DriverProfile from './DriverProfile/DriverProfile';


const Profile = props => {

  const { request } = useHttp();

  const storageName = 'userData';

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });


  useEffect( useCallback(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const user = await request(`/profile/${storeData.userId}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'Role': storeData.role,
        });

        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })

      } catch(e) {
        console.log('Something went wrong', e);
      }
    }
    fetchData();
  }), []);




  return (
    <section>
      {/*<h1>Welcome {user.name}!</h1>*/}
      {user.role === 'driver' ? <DriverProfile user={user}/> : <ShipperProfile user={user}/>}
    </section>
  );
};

Profile.propTypes = {

};

export default Profile;
