import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const UserActivityMonitor = () => {
  const navigate = useNavigate();
  const timeoutId = useRef();

  function setTokenTimeout() {
    // If a timeout has already been set, clear it
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Set a new timeout to remove the token after 5 seconds
    timeoutId.current = setTimeout(() => {
      const token = localStorage.getItem("token");

      // Only show the modal if the user is still present
      if (token) {
        let autoLogoutTimeOutId;
        let countdownIntervalId;
        let countdown = 120; // 2 minutes in seconds

        const modal = Modal.confirm({
          title: "You have been inactive for a while.",
          content: `You will be logged out due to inactivity in ${countdown}.`,
          okText: "Logout",
          cancelText: "Stay logged in",
          onOk() {
            clearInterval(countdownIntervalId);
            clearTimeout(autoLogoutTimeOutId);
            localStorage.removeItem("token");
            navigate("/login");
          },
          onCancel() {
            clearInterval(countdownIntervalId);
            clearTimeout(autoLogoutTimeOutId);
            setTokenTimeout(); // Reset the timeout if the user wants to stay logged in
          },
        });

        // Update the modal content every second to show the countdown
        countdownIntervalId = setInterval(() => {
          countdown--;
          modal.update({
            content: `You will be logged out due to inactivity in ${countdown}.`,
          });
        }, 1000); // 1 second in milliseconds

        // Automatically call the onOk function after 10 seconds
        autoLogoutTimeOutId = setTimeout(() => {
          clearInterval(countdownIntervalId);
          modal.update({
            open: false,
          });
          localStorage.removeItem("token");
          navigate("/login");
        }, 2 * 60 * 1000); // 2 minutes in milliseconds
      }
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
  }

  // Throttle function
  function throttle(func, delay) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= delay) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  }

  useEffect(() => {
    // Set the initial timeout when the component mounts
    setTokenTimeout();

    // Reset the timeout whenever the user moves the mouse
    const throttledSetTokenTimeout = throttle(setTokenTimeout, 1000);
    window.addEventListener("mousemove", setTokenTimeout);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", setTokenTimeout);
    };
  }, [navigate]); // Empty array means this effect runs only on mount and unmount

  return null;
};
export default UserActivityMonitor;
