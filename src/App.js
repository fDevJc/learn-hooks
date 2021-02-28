import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [item, setItem] = useState(0);
  const incrementItem = () => {
    setItem(item + 1);
  };
  const decrementItem = () => {
    setItem(item - 1);
  };
  return (
    <>
      <div>{item}</div>
      <button onClick={incrementItem}>increment</button>
      <br></br>
      <button onClick={decrementItem}>decrement</button>
    </>
  );
};

export default App;
