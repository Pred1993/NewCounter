import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    onClick?: () => void
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, onClick,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const onClickHandler = () => {
        onClick && onClick()
    }
    const finalClassName = `${red ? s.red : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            onClick={onClickHandler}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton