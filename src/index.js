import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './component/admin/Admin';
import User from './component/user/user';
import HomePage from './component/Home/homepage';
import Dashboard from './component/admin/content/dashboard';
import ManageUser from './component/admin/content/manageusers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<HomePage />} />
          <Route path='users' element={<User />} />
        </Route>
        <Route path='/admin' element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path='manage-user' element={<ManageUser />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </Provider>
);

// Nếu bạn muốn đo lường hiệu suất ứng dụng, bạn có thể sử dụng reportWebVitals
reportWebVitals();
