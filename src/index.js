import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import 'nprogress/nprogress.css'
import { PersistGate } from 'redux-persist/integration/react';
import "react-awesome-lightbox/build/style.css";
import i18n from './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// Nếu bạn muốn đo lường hiệu suất ứng dụng, bạn có thể sử dụng reportWebVitals
reportWebVitals();
