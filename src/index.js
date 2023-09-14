import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from 'redux/store';
import App from './components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/goit-react-hw-07-phonebook">
    <PersistGate loading={null} persistor={persistedStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </BrowserRouter>
);
