import { SuperButton } from '../Common';
import styles from './Counter.module.css';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../bll/store';
import { incCounterAC, ResetCounterAC } from '../../bll/counterReducer';

export const Counter = memo(() => {
  const counter = useSelector<AppRootStateType, number>((state) => state.counter.counter);
  const maxValue = useSelector<AppRootStateType, number>((state) => state.counter.maxValue);
  const disabled = useSelector<AppRootStateType, boolean>((state) => state.counter.disabled);
  const errorStartValue = useSelector<AppRootStateType, string>((state) => state.counter.errorStartValue);
  const errorMaxValue = useSelector<AppRootStateType, string>((state) => state.counter.errorMaxValue);
  const supportingText = "enter values and press 'set'";
  const dispatch = useDispatch<AppThunkType>();
  const counterClasses = counter === maxValue ? styles.countMax : styles.count;
  return (
    <div className={styles.counter}>
      <div className={counterClasses}>
        {errorMaxValue || errorStartValue ? (
          <span className={styles.error}>Incorrect value</span>
        ) : !disabled ? (
          <span className={styles.text}>{supportingText}</span>
        ) : (
          counter
        )}
      </div>
      <div className={styles.buttons}>
        <SuperButton disabled={counter === maxValue || !disabled} onClick={() => dispatch(incCounterAC())}>
          inc
        </SuperButton>
        <SuperButton disabled={counter === 0 || !disabled} onClick={() => dispatch(ResetCounterAC())}>
          reset
        </SuperButton>
      </div>
    </div>
  );
});
