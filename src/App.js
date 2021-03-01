import React, { useState, useEffect, useRef } from 'react';
import './App.css';
const useScroll = () => {
  const [scrollY, setScrollY] = useState();

  const scrollChange = () => {
    console.log(window.scrollY);
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollChange);
    return () => {
      window.removeEventListener('scroll', scrollChange);
    };
  }, []);
  return scrollY;
};
const App = () => {
  const y = useScroll();
  return (
    <>
      <div style={{ height: '1000vh' }}>
        <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>
          Hello
        </h1>
      </div>
    </>
  );
};

export default App;
