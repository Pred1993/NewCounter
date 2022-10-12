import { useEffect, useState } from 'react';

import { Counter } from './Components/Counter/Counter';
import { Setting } from './Components/Setting/Setting';

import styles from './App.module.css';

export const App = () => {
  const [maxValue, setMaxValue] = useState<number>(5);
  const [startValue, setStartValue] = useState<number>(0);
  const [counter, setCounter] = useState<number>(startValue);
  const [errorMaxValue, setErrorMaxValue] = useState<string>('');
  const [errorStartValue, setErrorStartValue] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const getStartValue = localStorage.getItem('start-Value');
    const getMaxValue = localStorage.getItem('max-Value');

    if (getStartValue && getMaxValue) {
      setMaxValue(JSON.parse(getMaxValue));
      setCounter(JSON.parse(getStartValue));
      setStartValue(JSON.parse(getStartValue));
    }
  }, []);

  useEffect(() => {
    if (maxValue < 0 || maxValue < startValue) {
      setErrorMaxValue('Incorrect value');
      setErrorStartValue('');
    } else if (startValue < 0) {
      setErrorStartValue('Incorrect value');
      setErrorMaxValue('');
    } else if (maxValue === startValue) {
      setErrorMaxValue('Incorrect value');
      setErrorStartValue('Incorrect value');
    } else {
      setErrorStartValue('');
      setErrorMaxValue('');
    }
  }, [maxValue, startValue]);
  const changeCounter = () => {
    const getStartValue = localStorage.getItem('start-Value');

    if (getStartValue) {
      setCounter(JSON.parse(getStartValue));
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.column}>
        <Setting
          setMaxValue={setMaxValue}
          setStartValue={setStartValue}
          maxValue={maxValue}
          startValue={startValue}
          changeCounter={changeCounter}
          errorMaxValue={errorMaxValue}
          errorStartValue={errorStartValue}
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <Counter
          counter={counter}
          setCounter={setCounter}
          maxValue={maxValue}
          errorMaxValue={errorMaxValue}
          errorStartValue={errorStartValue}
          disabled={!disabled}
        />
      </div>
    </div>
  );
};
