import './language.scss'
import { useTranslation } from 'react-i18next';

const Language = (props) => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <div className='change-language'>
            <span onClick={() => handleChangeLanguage('vi')} className={i18n?.language === 'vi' ? 'lan-vn active' : 'lan-vn'}>VN</span>
            <span onClick={() => handleChangeLanguage('en')} className={i18n?.language === 'en' ? 'lan-en active' : 'lan-en'}>EN</span>
        </div>
    )
}

export default Language