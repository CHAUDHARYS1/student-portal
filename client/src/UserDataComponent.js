// UserDataComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDataComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures that the effect runs only once

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Data</h2>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user properties as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDataComponent;
