# learn-react-hooks

learn react's hooks

## useState

```javascript
const [item, setItem] = useState(0);

const incrementItem = () => {
  setItem(item + 1);
};
```

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
