import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    //onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);
    return () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
  }, []);
  console.log(status);
  return status;
};

const App = () => {
  const online = useNetwork();
  return (
    <>
      <div>{online ? 'Online' : 'Offline'}</div>
    </>
  );
};

export default App;
