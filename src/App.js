import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const useFadeIn = (durantion = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${durantion}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <>
      <div>
        <h1 {...fadeInH1}>hello</h1>
        <p {...fadeInP}>blablablablabla</p>
      </div>
    </>
  );
};

export default App;
