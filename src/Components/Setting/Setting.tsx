import React from 'react';
import s from './Setting.module.css'
import SuperButton from "../Common/SuperButton/SuperButton";
import SuperInput from "../Common/SuperInput/SuperInput";
export type SettingPropsType = {
    maxValue: number
    startValue: number
    setMaxValue: (value: number) => void
    setStartValue: (value: number) => void
    changeCounter: () => void
    errorMaxValue: string | null
    errorStartValue: string | null
    setText: (text: string | null) => void
    disabled: boolean
    setDisabled: (disabled: boolean) => void
}
export const Setting = ({setDisabled, disabled, errorStartValue, startValue, setMaxValue, setStartValue, maxValue, errorMaxValue, changeCounter, setText}: SettingPropsType) => {

    const onClickHandlerSetMax = (value: number) => {
        setMaxValue(value)
        setDisabled(false)
    }
    const onClickHandlerSetStart = (value: number) => {
        setStartValue(value)
        setDisabled(false)
    }
    const onClickHandlerSet = () => {
        setText(null)
        localStorage.setItem('max-Value', JSON.stringify(maxValue))
        localStorage.setItem('start-Value', JSON.stringify(
            startValue))
        setDisabled(true)
        changeCounter()

    }
    const conditions = startValue < 0 || maxValue < 0 || maxValue <= startValue || disabled
    return (
        <div>
            <div className={s.setting}>
                <div className={s.input}>
                    <div className={s.maxValue}><span className={s.textMax}>max value:   </span>
                        <SuperInput type={"number"}
                                    value={maxValue}
                                    onChangeNumber={onClickHandlerSetMax}
                                    error={errorMaxValue}
                        /></div>
                    <div className={s.startValue}><span className={s.textStart}>start value: </span>
                        <SuperInput type={"number"}
                                    value={startValue}
                                    onChangeNumber={onClickHandlerSetStart}
                                    error={errorStartValue}
                        /></div>
                </div>
                <div className={s.button}>
                    <SuperButton
                        disabled={conditions}
                        onClick={onClickHandlerSet}
                    >
                        set
                    </SuperButton>
                </div>
            </div>
        </div>

    )
}