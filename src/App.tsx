import { Counter } from './Components/Counter/Counter';
import { Setting } from './Components/Setting/Setting';
import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.column}>
        <Setting />
        <Counter />
      </div>
    </div>
  );
};
