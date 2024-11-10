import { useNavigate } from 'react-router-dom'
import './login.scss'
import { postLogin } from '../../services/apiservice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IoIosEyeOff, IoIosEye } from "react-icons/io"
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner } from "react-icons/im"

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleLogin()
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {

        if (!email || !password) {
            toast.error("Invalid email/password")
            return;
        }
        const isValid = validateEmail(email)
        if (!isValid) {
            toast.error(`Email: ${email} invalid`)
            return;
        }
        setIsLoading(true)
        let res = await postLogin(email, password)
        if (res?.EC === 0) {
            dispatch(doLogin(res))
            toast.success('Login success')
            setIsLoading(false)
            navigate('/')
        }
        else {
            setIsLoading(false)
            toast.error(res?.EM || "Something wrong")
        }

    }

    const handleSignUp = () => {
        navigate("/register")
    }

    const handleGoHomepage = () => {
        navigate('/')
    }

    return (
        <div className="login-container">
            <div className='login-header'>
                <div className='content-login-header'>
                    <span>Don't have account yet?</span>
                    <button onClick={() => handleSignUp()} >Sign Up</button>
                    <div className='login-help'>
                        <span>Need help?</span>
                    </div>
                </div>

            </div>
            <div className='login-title col-2 mx-auto'>
                Quiz with React Hook (NXSag)
            </div>
            <div className='login-welcome col-2 mx-auto'>
                Hello, who's this?
            </div>
            <div className='login-form col-2 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={handleEnter}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div className="password-design">
                        <input type={showHidePassword === false ? 'password' : 'text'} className='form-control' value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={handleEnter} />
                        <span className="password-icon" onClick={() => handleShowHidePassword()} >
                            {showHidePassword === true ? <IoIosEyeOff /> : <IoIosEye />}
                        </span>
                    </div>
                </div>
                <div className='forgot-password-login'>
                    <span>Forgot your password?</span>
                </div>
                <div className='btn-login'>
                    <button onClick={() => handleLogin()} disabled={isLoading}>
                        <ImSpinner className='loader-icon' hidden={!isLoading} />
                        <span>Login</span>
                    </button>
                </div>
                <div className='go-homepage'>
                    <span onClick={() => handleGoHomepage()}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login