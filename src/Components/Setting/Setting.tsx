import { SuperButton, SuperInput } from '../Common';
import styles from './Setting.module.css';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../bll/store';
import {
  setDisabledAC,
  setErrorMaxValueAC,
  setErrorStartValueAC,
  setInLocalStorageTC,
  setMaxValueAC,
  setStartValueAC,
} from '../../bll/counterReducer';

export const Setting = memo(() => {
  const disabled = useSelector<AppRootStateType, boolean>((state) => state.counter.disabled);
  const maxValue = useSelector<AppRootStateType, number>((state) => state.counter.maxValue);
  const startValue = useSelector<AppRootStateType, number>((state) => state.counter.startValue);
  const errorStartValue = useSelector<AppRootStateType, string>((state) => state.counter.errorStartValue);
  const errorMaxValue = useSelector<AppRootStateType, string>((state) => state.counter.errorMaxValue);
  const dispatch = useDispatch<AppThunkType>();

  useEffect(() => {
    if (maxValue < 0 || maxValue < startValue) {
      dispatch(setErrorMaxValueAC('Incorrect value'));
      maxValue < 0 && startValue < 0
        ? dispatch(setErrorStartValueAC('Incorrect value'))
        : dispatch(setErrorStartValueAC(''));
    } else if (startValue < 0) {
      dispatch(setErrorStartValueAC('Incorrect value'));
      dispatch(setErrorMaxValueAC(''));
    } else if (maxValue === startValue) {
      dispatch(setErrorMaxValueAC('Incorrect value'));
      dispatch(setErrorStartValueAC('Incorrect value'));
    } else {
      dispatch(setErrorStartValueAC(''));
      dispatch(setErrorMaxValueAC(''));
    }
  }, [maxValue, startValue]);

  const onClickHandlerSetMax = (value: number) => {
    if (Number.isNaN(value)) {
      return;
    } else {
      dispatch(setMaxValueAC(value));
      dispatch(setDisabledAC(false));
    }
  };

  const onClickHandlerSetStart = (value: number) => {
    if (Number.isNaN(value)) {
      return;
    } else {
      dispatch(setStartValueAC(value));
      dispatch(setDisabledAC(false));
    }
  };

  const onClickHandlerSet = () => {
    dispatch(setInLocalStorageTC());
    dispatch(setDisabledAC(true));
  };

  const isDisabled = startValue < 0 || maxValue < 0 || maxValue <= startValue || disabled;

  return (
    <div className={styles.setting}>
      <div className={styles.input}>
        <div className={styles.maxValue}>
          <span className={styles.textMax}>max value: </span>
          <SuperInput type={'number'} value={maxValue} onChangeNumber={onClickHandlerSetMax} error={errorMaxValue} />
        </div>
        <div className={styles.startValue}>
          <span className={styles.textStart}>start value: </span>
          <SuperInput
            type={'number'}
            value={startValue}
            onChangeNumber={onClickHandlerSetStart}
            error={errorStartValue}
          />
        </div>
      </div>
      <div className={styles.button}>
        <SuperButton disabled={isDisabled} onClick={onClickHandlerSet}>
          set
        </SuperButton>
      </div>
    </div>
  );
});
