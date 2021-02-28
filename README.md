# learn-react-hooks

learn react's hooks

---

## useState

```javascript
const [item, setItem] = useState(0);

const incrementItem = () => {
  setItem(item + 1);
};
```

---

## make useInput() by using hooks

```javascript
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
```

---

## useEffect

```javascript
useEffect(callbackFunc, deps);
```

componentDidMount

componentWillUnMount

componentDidUpdate

동일한 효과를 줄수있다.

# New things

## optional chaining

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined
// no error

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

---

## Rules of Hooks

https://reactjs.org/docs/hooks-rules.html#explanation
