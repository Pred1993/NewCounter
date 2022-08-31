import { SuperButton } from '../Common';
import styles from './Counter.module.css';
import { memo } from 'react';

export type Props = {
  counter: number;
  setCounter: (count: number) => void;
  maxValue: number;
  errorMaxValue: string;
  errorStartValue: string;
  text: string | null;
  disabled: boolean;
};

export const Counter = memo(
  ({ counter, setCounter, errorStartValue, errorMaxValue, maxValue, text, disabled }: Props) => {
    const counterClasses = counter === maxValue ? styles.countMax : styles.count;

    return (
      <div className={styles.counter}>
        <div className={counterClasses}>
          {errorMaxValue || errorStartValue ? (
            <span className={styles.error}>Incorrect value</span>
          ) : text ? (
            <span className={styles.text}>{text}</span>
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
  },
);
