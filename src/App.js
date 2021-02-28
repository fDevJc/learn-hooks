import React, { useState, useEffect } from 'react';
import './App.css';

//----------------------------------------------------------------
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
//----------------------------------------------------------------
const sections = [
  {
    key: 1,
    tab: 'section 1',
    content: 'section 1 content',
  },
  {
    key: 2,
    tab: 'section 2',
    content: 'section 2 content',
  },
];

const useTab = (sequence) => {
  const [curIdx, setIdx] = useState(0);
  return {
    section: sequence[curIdx],
    changeContent: setIdx,
  };
};
//----------------------------------------------------------------
const useTitle = (initailTitle) => {
  const [title, setTitle] = useState(initailTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};
//----------------------------------------------------------------
const App = () => {
  const titleUpdater = useTitle('Loading...');

  setTimeout(() => titleUpdater('Home'), 5000);

  const maxLen = (value) => {
    return value.length <= 10;
  };

  const name = useInput('Mr.', maxLen);
  const [item, setItem] = useState(0);

  const { section, changeContent } = useTab(sections);

  const incrementItem = () => {
    setItem(item + 1);
  };
  const decrementItem = () => {
    setItem(item - 1);
  };
  const sayHello = () => {
    console.log('hello');
  };
  useEffect(sayHello, [section]);

  return (
    <>
      <h3>useState</h3>
      <div>{item}</div>
      <button onClick={incrementItem}>increment</button>
      <br></br>
      <button onClick={decrementItem}>decrement</button>
      <h3>useInput</h3>
      <input placeholder="what' your name" {...name}></input>
      <h3>useContent</h3>
      {sections.map((section, index) => (
        <button key={section.key} onClick={() => changeContent(index)}>
          {section.tab}
        </button>
      ))}
      <div>{section.content}</div>
    </>
  );
};

export default App;
