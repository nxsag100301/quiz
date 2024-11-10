import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Header = () => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignUp = () => {
        navigate("/register")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Quiz with React Hook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' as={Link} to="/">Home</NavLink>
                        <NavLink className='nav-link' as={Link} to="/users">User</NavLink>
                        <NavLink className='nav-link' as={Link} to="/admin">Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleSignUp()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title={`Welcome ${account?.username}`} id="basic-nav-dropdown">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;