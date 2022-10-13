import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { ActionCounterType, counterReducer } from './counterReducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { loadState, saveState } from '../utils/localStorage-utils';

export type AppThunkType = ThunkDispatch<AppRootStateType, void, ActionCounterType>; // типизация диспатчей
export type AppRootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  counter: counterReducer,
});
// средний параметр - получение значений из Local Storage
export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
}); // загрузка значений в Local Storage

// @ts-ignore
window.store = store;
