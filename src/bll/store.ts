import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { ActionCounterType, counterReducer } from './counterReducer';
import thunk, { ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  counter: counterReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppThunkType = ThunkDispatch<AppRootStateType, void, ActionCounterType>;

// @ts-ignore
window.store = store;
