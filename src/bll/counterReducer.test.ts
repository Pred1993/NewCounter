import {
  counterReducer,
  incCounterAC,
  InitialStateType,
  setCounterAC,
  setDisabledAC,
  setErrorMaxValueAC,
  setErrorStartValueAC,
  setMaxValueAC,
  setStartValueAC,
} from './counterReducer';

let startState: InitialStateType;
beforeEach(() => {
  startState = {
    maxValue: 5,
    startValue: 0,
    counter: 0,
    errorMaxValue: '',
    errorStartValue: '',
    disabled: false,
  };
});

test('property maxValue should be change', () => {
  const endState = counterReducer(startState, setMaxValueAC(10));
  expect(endState.maxValue).toBe(10);
});

test('property startValue should be change', () => {
  const endState = counterReducer(startState, setStartValueAC(5));
  expect(endState.startValue).toBe(5);
});

test('property counter should be change', () => {
  const endState = counterReducer(startState, setCounterAC(5));
  expect(endState.counter).toBe(5);
});

test('property errorMaxValue should be change', () => {
  const endState = counterReducer(startState, setErrorMaxValueAC('Error'));
  expect(endState.errorMaxValue).toBe('Error');
});

test('property errorStartValue should be change', () => {
  const endState = counterReducer(startState, setErrorStartValueAC('Error start'));
  expect(endState.errorStartValue).toBe('Error start');
});

test('property disabled should be change', () => {
  const endState = counterReducer(startState, setDisabledAC(true));
  expect(endState.disabled).toBe(true);
});

test('property counter should be change to 1 ', () => {
  const endState = counterReducer(startState, incCounterAC());
  expect(endState.counter).toBe(1);
});
