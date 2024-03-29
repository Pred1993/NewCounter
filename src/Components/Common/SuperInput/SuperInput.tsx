import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, memo } from 'react';
import s from './SuperInput.module.css';
// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeNumber?: (value: number) => void;
  onEnter?: () => void;
  error?: string | null;
  spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = memo(
  ({
    type,
    onChange,
    onChangeNumber,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,

    ...restProps // все остальные пропсы попадут в объект restProps
  }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && // если есть пропс onChange
        onChange(e); // то передать ему е (поскольку onChange не обязателен)
      onChangeNumber && onChangeNumber(e.currentTarget.valueAsNumber);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e);

      onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter(); // то вызвать его
    };

    // const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className}`; // need to fix with (?:) and s.superInput

    return (
      <>
        <input
          type={'number'}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputClassName}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />
        {/*{error && <span className={finalSpanClassName}>{error}</span>}*/}
      </>
    );
  },
);

export default SuperInputText;
