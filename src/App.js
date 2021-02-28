import React, { useState } from 'react';
import './App.css';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    let validationCheck = true;
    if (typeof validator === 'function') {
      validationCheck = validator(value);
    }
    if (validationCheck) {
      setValue(value);
    } else {
      console.log('max len');
    }
  };
  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => {
    return value.length <= 10;
  };

  const name = useInput('Mr.', maxLen);
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
