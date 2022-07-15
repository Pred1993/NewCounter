import React, {useEffect, useState} from 'react';
import s from './App.module.css'
import {Counter} from "./Components/Counter/Counter";
import {Setting} from "./Components/Setting/Setting";

function App() {
    const [maxValue, setMaxValue] = useState<number>(5)
    const [startValue, setStartValue] = useState<number>(0)
    const [counter, setCounter] = useState<number>(startValue)
    const [errorMaxValue, setErrorMaxValue] = useState<string>('')
    const [errorStartValue, setErrorStartValue] = useState<string>('')
    const [text, setText] = useState<string | null>(null)
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        let getStartValue = localStorage.getItem('start-Value')
        if (getStartValue) {
            let newStartValue = JSON.parse(getStartValue)
            setCounter(newStartValue)
            setStartValue(newStartValue)
        }
        let getMaxValue = localStorage.getItem('max-Value')
        if (getMaxValue) {
            let newMaxValue = JSON.parse(getMaxValue)
            setMaxValue(newMaxValue)
        }
    }, [])
    useEffect(() => {
        if (maxValue < 0 || maxValue <= startValue) {
            setText("enter values and press 'set'")
            setErrorMaxValue('Incorrect value')
        } else {
            setErrorMaxValue('')
            setErrorStartValue('')
        }
    }, [maxValue, startValue])

    useEffect(() => {
        if (startValue < 0 || maxValue <= startValue) {
            setErrorStartValue('Incorrect value')
        } else {
            setErrorStartValue('')
            setErrorMaxValue('')
        }
    }, [maxValue, startValue])

    const changeCounter = () => {
        let getStartValue = localStorage.getItem('start-Value')
        if (getStartValue) {
            let newStartValue = JSON.parse(getStartValue)
            setCounter(newStartValue)
        }
    }
    return (
        <div className={s.screen}>
            <div className={s.column}>
                <Setting
                    setMaxValue={setMaxValue}
                    setStartValue={setStartValue}
                    maxValue={maxValue}
                    startValue={startValue}
                    changeCounter={changeCounter}
                    errorMaxValue={errorMaxValue}
                    errorStartValue={errorStartValue}
                    setText={setText}
                    disabled={disabled}
                    setDisabled={setDisabled}
                />
                <Counter
                    counter={counter}
                    setCounter={setCounter}
                    maxValue={maxValue}
                    errorMaxValue={errorMaxValue}
                    errorStartValue={errorStartValue}
                    text={text}
                    disabled={!disabled}
                /></div>
        </div>

    );
}

export default App;
