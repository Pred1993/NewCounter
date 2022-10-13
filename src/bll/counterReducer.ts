import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

const initialState = {
  maxValue: 5,
  startValue: 0,
  counter: 0,
  errorMaxValue: '',
  errorStartValue: '',
  disabled: false,
};

export const counterReducer = (state: InitialStateType = initialState, action: ActionCounterType): InitialStateType => {
  switch (action.type) {
    case 'INCREMENT-COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'SET-COUNTER-FROM-LOCALE-STORAGE':
      return { ...state, counter: action.counter };
    case 'RESET-COUNTER':
      return { ...state, counter: 0 };
    case 'SET-MAX-VALUE':
      return { ...state, maxValue: action.maxValue };
    case 'SET-START-VALUE':
      return { ...state, startValue: action.startValue };
    case 'SET-ERROR-MAX-VALUE':
      return { ...state, errorMaxValue: action.errorMaxValue };
    case 'SET-ERROR-START-VALUE':
      return { ...state, errorStartValue: action.errorStartValue };
    case 'SET-DISABLED':
      return { ...state, disabled: action.disabled };
    default:
      return state;
  }
};

//types
export type InitialStateType = typeof initialState;
export type ActionCounterType =
  | ReturnType<typeof setMaxValueAC>
  | ReturnType<typeof setStartValueAC>
  | ReturnType<typeof incCounterAC>
  | ReturnType<typeof setErrorMaxValueAC>
  | ReturnType<typeof setErrorStartValueAC>
  | ReturnType<typeof setDisabledAC>
  | ReturnType<typeof ResetCounterAC>
  | ReturnType<typeof setCounterAC>;

//action
export const incCounterAC = () => ({ type: 'INCREMENT-COUNTER' } as const);
export const setCounterAC = (counter: number) => ({ type: 'SET-COUNTER-FROM-LOCALE-STORAGE', counter } as const);
export const ResetCounterAC = () => ({ type: 'RESET-COUNTER' } as const);
export const setMaxValueAC = (maxValue: number) => ({ type: 'SET-MAX-VALUE', maxValue } as const);
export const setDisabledAC = (disabled: boolean) => ({ type: 'SET-DISABLED', disabled } as const);
export const setStartValueAC = (startValue: number) => ({ type: 'SET-START-VALUE', startValue } as const);
export const setErrorMaxValueAC = (errorMaxValue: string) => ({ type: 'SET-ERROR-MAX-VALUE', errorMaxValue } as const);
export const setErrorStartValueAC = (errorStartValue: string) =>
  ({ type: 'SET-ERROR-START-VALUE', errorStartValue } as const);

// thunk
export const setInLocalStorageTC = () => (dispatch: Dispatch<ActionCounterType>, getState: () => AppRootStateType) => {
  const maxValue = getState().counter.maxValue;
  const startValue = getState().counter.startValue;
  localStorage.setItem('max-Value', JSON.stringify(maxValue));
  localStorage.setItem('start-Value', JSON.stringify(startValue));
  dispatch(setCounterAC(startValue));
};

export const getFromLocalStorageTC = () => (dispatch: Dispatch<ActionCounterType>) => {
  const getStartValue = localStorage.getItem('start-Value');
  const getMaxValue = localStorage.getItem('max-Value');
  if (getStartValue && getMaxValue) {
    dispatch(setMaxValueAC(JSON.parse(getMaxValue)));
    dispatch(setStartValueAC(JSON.parse(getStartValue)));
    dispatch(setCounterAC(JSON.parse(getStartValue)));
  }
};
