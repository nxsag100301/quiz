import { Nav } from "react-bootstrap"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from "../header/language";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/apiservice";
import { doLogOut } from "../../redux/action/userAction";


const Header = (props) => {

    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div className="content">
            <div className="content-left">

            </div>
            <div className="content-right">
                <div className='language'>
                    <Language />
                </div>
                <Nav>
                    <NavDropdown title={`Welcome ${account?.username}`} className='nav-dropdown'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </div>
    )
}

export default Header