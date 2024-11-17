import { useNavigate } from 'react-router-dom'
import videoHomePage from '../../assets/video/video-homepage.mp4'
import './homepage.scss'
import { useSelector } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next';


const HomePage = (props) => {

    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video
                autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='first-title'>
                    {t('homepage.title1')}
                </div>
                <div className='second-title'>
                    {t('homepage.title2')}
                </div>
                <div className='third-title'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} > {t('homepage.title3.start')}</button>
                        :
                        <button onClick={() => navigate('/users')} > {t('homepage.title3.doquiz')}</button>
                    }
                </div>
            </div>
        </div >
    )
}

export default HomePage