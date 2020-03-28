import React from 'react';
import PropTypes from 'prop-types';

import './profile.css'

const Profile = props => {
  return (
    <section>
      <h1 className="section__title">Notes</h1>
      <div>
        <form>
          <input name="notename" />
            <button>Create Note</button>
        </form>
        <ul className="notes__list">
          <li className="notes__item">Note 1 <button>Delete</button></li>
          <li className="notes__item">Note 2 <button>Delete</button></li>
          <li className="notes__item">Note 3 <button>Delete</button></li>
          <li className="notes__item">Note 4 <button>Delete</button></li>
          <li className="notes__item">Note 5 <button>Delete</button></li>
        </ul>
      </div>
    </section>
  );
};

Profile.propTypes = {

};

export default Profile;
