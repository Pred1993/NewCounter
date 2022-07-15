import React from 'react';
import s from './Counter.module.css'
import SuperButton from "../Common/SuperButton/SuperButton";

export type CounterPropsType = {
    counter: number
    setCounter: (count: number) => void
    maxValue: number
    errorMaxValue: string
    errorStartValue: string
    text: string | null
    disabled: boolean
}
export const Counter = ({counter, setCounter, errorStartValue, errorMaxValue, maxValue, text, disabled}: CounterPropsType) => {
    return (
        <div>
            <div className={s.counter}>
                <div className={counter === maxValue ? s.Count : s.Count1}>{errorMaxValue || errorStartValue
                    ? <span className={s.error}>Incorrect value</span>
                    : text ? <span className={s.text}>{text}</span> : counter }
                </div>
                <div className={s.buttons}>
                    <SuperButton
                        disabled={counter === maxValue || disabled} onClick={() => setCounter(counter + 1)}
                    >
                        inc
                    </SuperButton>
                    <SuperButton
                        disabled={counter === 0 || disabled}
                        onClick={() => setCounter(0)}
                    >
                        reset
                    </SuperButton>
                </div>
            </div>
        </div>

    )
}
