import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import useAxios from './useAxios';

const App = () => {
  const opts = {
    url: 'https://koreanjson.com/posts/1',
  };
  const state = useAxios(opts);
  console.log('>>', state);
  return (
    <>
      <div>
        <span></span>
      </div>
    </>
  );
};

export default App;
