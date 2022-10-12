import { SuperButton } from '../Common';
import styles from './Counter.module.css';
import { memo } from 'react';

export type Props = {
  counter: number;
  setCounter: (count: number) => void;
  maxValue: number;
  errorMaxValue: string;
  errorStartValue: string;
  disabled: boolean;
};

export const Counter = memo(({ counter, setCounter, errorStartValue, errorMaxValue, maxValue, disabled }: Props) => {
  const counterClasses = counter === maxValue ? styles.countMax : styles.count;
  const supportingText = "enter values and press 'set'";
  return (
    <div className={styles.counter}>
      <div className={counterClasses}>
        {errorMaxValue || errorStartValue ? (
          <span className={styles.error}>Incorrect value</span>
        ) : disabled ? (
          <span className={styles.text}>{supportingText}</span>
        ) : (
          counter
        )}
      </div>
      <div className={styles.buttons}>
        <SuperButton disabled={counter === maxValue || disabled} onClick={() => setCounter(counter + 1)}>
          inc
        </SuperButton>
        <SuperButton disabled={counter === 0 || disabled} onClick={() => setCounter(0)}>
          reset
        </SuperButton>
      </div>
    </div>
  );
});
