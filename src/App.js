import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const useNotification = (title) => {
  const alertNotification = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((res) => {
        if (res === 'granted') {
          new Notification(title);
        } else {
          return;
        }
      });
    } else {
      console.log('granted');
      new Notification(title);
    }
  };

  return alertNotification;
};

const App = () => {
  const alertNotification = useNotification('Are you sure?');
  return (
    <>
      <div>
        <button onClick={alertNotification}>Hello</button>
      </div>
    </>
  );
};

export default App;
