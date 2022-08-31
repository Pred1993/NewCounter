import { SuperButton, SuperInput } from '../Common';
import styles from './Setting.module.css';
import { memo } from 'react';

export type Props = {
  maxValue: number;
  startValue: number;
  setMaxValue: (value: number) => void;
  setStartValue: (value: number) => void;
  changeCounter: () => void;
  errorMaxValue: string | null;
  errorStartValue: string | null;
  setText: (text: string | null) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
};

export const Setting = memo(
  ({
    setDisabled,
    disabled,
    errorStartValue,
    startValue,
    setMaxValue,
    setStartValue,
    maxValue,
    errorMaxValue,
    changeCounter,
    setText,
  }: Props) => {
    const onClickHandlerSetMax = (value: number) => {
      setMaxValue(value);
      setDisabled(false);
      setText("enter values and press 'set'");
    };

    const onClickHandlerSetStart = (value: number) => {
      setStartValue(value);
      setDisabled(false);
      setText("enter values and press 'set'");
    };

    const onClickHandlerSet = () => {
      setText(null);
      localStorage.setItem('max-Value', JSON.stringify(maxValue));
      localStorage.setItem('start-Value', JSON.stringify(startValue));
      setDisabled(true);
      changeCounter();
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
  },
);
