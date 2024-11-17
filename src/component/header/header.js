import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../services/apiservice';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './language';


const Header = () => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignUp = () => {
        navigate("/register")
    }

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token)
        if (res?.EC === 0) {
            dispatch(doLogOut())
            navigate("/login")
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Quiz with React Hook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' as={Link} to="/">Home</NavLink>
                        {isAuthenticated === true &&
                            <>
                                <NavLink className='nav-link' as={Link} to="/users">User</NavLink>
                                {account.role === "ADMIN" && <NavLink className='nav-link' as={Link} to="/admin">Admin</NavLink>}
                            </>
                        }
                    </Nav>
                    <Nav>
                        <div className='language'>
                            <Language />
                        </div>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleSignUp()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title={`Welcome ${account?.username}`} className='nav-dropdown'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;