import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const useFullScreen = () => {
  const element = useRef();
  const fullScreenHandler = () => {
    element.current.requestFullscreen();
  };

  const exitFullScreenHandler = () => {
    document.exitFullscreen();
  };

  return {
    ref: element,
    fullScreen: fullScreenHandler,
    exitSceen: exitFullScreenHandler,
  };
};

const App = () => {
  const { ref, fullScreen, exitSceen } = useFullScreen();
  return (
    <>
      <div ref={ref}>
        <img src="https://placeimg.com/500/500" alt="ranImg"></img>
        <button onClick={exitSceen}>Exit Screen</button>
      </div>
      <button onClick={fullScreen}>Full Screen</button>
    </>
  );
};

export default App;
