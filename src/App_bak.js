import React, { useState, useEffect, useRef } from 'react';
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
  console.log('useTitle');
  const [title, setTitle] = useState(initailTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};
//----------------------------------------------------------------
/*
  useEffect의 
  dependency 가 없을때 
  function은 componentDidMount, componentDidUpdate때 실행
  dependency 가 존재할때에는
  function은 componentDidMount에서만 실행

  return 은 componentWillunmount
*/
const useClick = (onClick) => {
  /* error 
  참고 : 
  https://reactjs.org/docs/hooks-rules.html#explanation
  if (typeof onClick !== 'function') {
    return;
  }
  */
  console.log('useClick');
  const ref = useRef();
  const element = ref.current;

  useEffect(() => {
    console.log('useClick/useEffect');
    if (element) {
      element.addEventListener('click', onClick);
    }
    return () => {
      if (element) {
        element.removeEventListener('click', onClick);
      }
    };
  }, []);

  return element;
};
//----------------------------------------------------------------
const useBeforeLeave = (func) => {
  const handle = (event) => {
    const { screenY } = event;
    console.log(screenY);
    if (screenY <= 0) {
      func();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseleave', handle);
    return () => {
      document.removeEventListener('mouseleave', handle);
    };
  }, []);
};

//----------------------------------------------------------------
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
//----------------------------------------------------------------
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
//----------------------------------------------------------------
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
//----------------------------------------------------------------

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
//----------------------------------------------------------------
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
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
const App = () => {
  const titleUpdater = useTitle('Loading...');

  //setTimeout(() => titleUpdater('Home'), 5000);

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
    //console.log('hello');
  };
  useEffect(sayHello, [section]);

  const useRefTest = useRef();
  //setTimeout(() => useRefTest.current?.focus(), 3000);

  const useClickTest = useClick(() => {
    alert(1);
  });

  const funcLeave = () => {
    console.log('pls do not leave');
  };
  useBeforeLeave(funcLeave);

  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  const online = useNetwork();
  const y = useScroll();
  const { ref, fullScreen, exitSceen } = useFullScreen();
  const alertNotification = useNotification('Are you sure?');
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
      <br></br>
      <input ref={useRefTest} placeholder="ref"></input>
      <br></br>
      <h1 ref={useClickTest}>useClick</h1>
      <div>
        <h1 {...fadeInH1}>hello</h1>
        <p {...fadeInP}>blablablablabla</p>
      </div>
      <div>{online ? 'Online' : 'Offline'}</div>
      <div style={{ height: '1000vh' }}>
        <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>
          Hello
        </h1>
      </div>
      <div ref={ref}>
        <img src="https://placeimg.com/500/500" alt="ranImg"></img>
        <button onClick={exitSceen}>Exit Screen</button>
      </div>
      <button onClick={fullScreen}>Full Screen</button>
      <div>
        <button onClick={alertNotification}>Hello</button>
      </div>
    </>
  );
};

export default App;
