import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './component/admin/Admin';
import User from './component/user/user';
import HomePage from './component/Home/homepage';
import Dashboard from './component/admin/content/dashboard';
import ManageUser from './component/admin/content/manageusers';
import Login from './component/Auth/login';
import App from './App';
import Register from './component/Auth/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './component/user/listQuiz';
import DetailQuiz from './component/user/detailQuiz';

const NotFound = () => {
    return (
        <div className='alert alert-danger text-center mt-5'>
            404.Not found data with you current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<ListQuiz />} />
                    <Route path='/quiz/:id' element={<DetailQuiz />} />
                </Route>


                <Route path='/admin' element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
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
        </>
    )
}

export default Layout