import { useEffect } from 'react';

import { Counter } from './Components/Counter/Counter';
import { Setting } from './Components/Setting/Setting';

import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { AppThunkType } from './bll/store';
import { getFromLocalStorageTC } from './bll/counterReducer';

export const App = () => {
  const dispatch = useDispatch<AppThunkType>();
  useEffect(() => {
    dispatch(getFromLocalStorageTC());
  }, []);
  return (
    <div className={styles.screen}>
      <div className={styles.column}>
        <Setting />
        <Counter />
      </div>
    </div>
  );
};
