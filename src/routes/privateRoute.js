import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])
    return (
        <div>
            {isAuthenticated === true ? props.children : ''}
        </div>
    )
}

export default PrivateRoute