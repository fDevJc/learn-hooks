import React, { useState } from 'react';
import './App.css';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  return { value, onChange };
};

const App = () => {
  const name = useInput('Mr.');
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
      <br></br>
      <input placeholder="what' your name" {...name}></input>
    </>
  );
};

export default App;
