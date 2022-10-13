import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './bll/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
