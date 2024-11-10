import { useNavigate } from 'react-router-dom'
import videoHomePage from '../../assets/video/video-homepage.mp4'
import './homepage.scss'
import { useSelector } from 'react-redux'


const HomePage = (props) => {

    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <div className="homepage-container">
            <video
                autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='first-title'>
                    There's a better way to ask
                </div>
                <div className='second-title'>
                    You don't want to make a boring form. And your audience won't answer once.
                    Create a typeform instead-and make everyone happy.

                </div>
                <div className='third-title'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} >Get started - it's free</button>
                        :
                        <button onClick={() => navigate('/users')} >Doing quiz now</button>
                    }
                </div>
            </div>
        </div >
    )
}

export default HomePage