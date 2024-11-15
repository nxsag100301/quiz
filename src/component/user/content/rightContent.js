import CountDown from './countDown'
import './rightContent.scss'


const RightContent = (props) => {
    const { dataQuiz, handleFinishQuizTimesUp } = props
    const onTimesUp = () => {
        handleFinishQuizTimesUp()
    }
    return (
        <div className="right-content-container">
            <div className="main-timer">
                <CountDown onTimesUp={onTimesUp} />
            </div>
            <div className="main-question">
                {dataQuiz?.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-${index}`} className="question">{index + 1}</div>
                        )
                    })}
            </div>
        </div>
    )
}

export default RightContent