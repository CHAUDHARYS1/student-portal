import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";




const UserActivityMonitor = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      let timeoutId;
  
      function setTokenTimeout() {
        // If a timeout has already been set, clear it
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
  
        // Set a new timeout to remove the token after 5 seconds
        timeoutId = setTimeout(() => {
          localStorage.removeItem('token');
          message.info('You have been logged out due to inactivity.', 5, () => navigate('/login'));
        }, 5 * 1000); // 5 seconds in milliseconds
      }
  
      // Set the initial timeout when the component mounts
      setTokenTimeout();
  
      // Reset the timeout whenever the user moves the mouse
      window.addEventListener('mousemove', setTokenTimeout);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('mousemove', setTokenTimeout);
      };
    }, [navigate]);
  
    return null;
  };


export default UserActivityMonitor;