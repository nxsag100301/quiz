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
import ManageQuiz from './component/admin/content/quiz/manageQuiz';
import TableQuiz from './component/admin/content/quiz/tableQuiz';
import Questions from './component/admin/content/question/questions';
import PrivateRoute from './routes/privateRoute';
import { Suspense } from 'react';

const NotFound = () => {
    return (
        <div className='alert alert-danger text-center mt-5'>
            404.Not found data with you current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<PrivateRoute> <ListQuiz /> </PrivateRoute>} />
                </Route>
                <Route path='/quiz/:id' element={<PrivateRoute><DetailQuiz /></PrivateRoute>} />
                <Route path='/admin' element={<PrivateRoute> <Admin /> </PrivateRoute>} >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path='manage-quiz' element={<ManageQuiz />} />
                    <Route path='list-quiz' element={<TableQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
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
        </Suspense>
    )
}

export default Layout