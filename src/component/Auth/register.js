import './register.scss'
import { useState } from 'react'
import { postRegister } from '../../services/apiservice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showHidePassword, setShowHidePassword] = useState(false)

    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }

    const handleSignUp = async () => {
        if (!email || !password) {
            toast.error("Invalid email/password")
            return;
        }
        const isValid = validateEmail(email)
        if (!isValid) {
            toast.error(`Email: ${email} invalid`)
            return;
        }
        let res = await postRegister(email, username, password)
        if (res?.EC === 0) {
            toast.success('Success')
            navigate('/login')
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className="register-container">
            <div className='register-header'>
                <div className='content-register-header'>
                    <span>Already have account?</span>
                    <button onClick={() => handleLogin()}>Sign In</button>
                    <div className='register-help'>
                        <span>Need help?</span>
                    </div>
                </div>

            </div>
            <div className='register-title col-2 mx-auto'>
                Quiz with React Hook (NXSag)
            </div>
            <div className='register-welcome col-2 mx-auto'>
                Register
            </div>
            <div className='register-form col-2 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div className="password-design">
                        <input type={showHidePassword === false ? 'password' : 'text'} className='form-control' value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                        <span className="password-icon" onClick={() => handleShowHidePassword()} >
                            {showHidePassword === true ? <IoIosEyeOff /> : <IoIosEye />}
                        </span>
                    </div>
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' className='form-control' value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='btn-register'>
                    <button onClick={() => handleSignUp()} >Sign Up</button>
                </div>
                <div className='go-homepage'>
                    <span onClick={() => handleLogin()}> &#60;&#60; Go to Login</span>
                </div>
            </div>
        </div>
    )
}

export default Register