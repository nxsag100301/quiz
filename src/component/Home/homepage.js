import videoHomePage from '../../assets/video/video-homepage.mp4'
import './homepage.scss'


const HomePage = (props) => {
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
                    <button>Get started - it's free</button>
                </div>
            </div>
        </div >
    )
}

export default HomePage