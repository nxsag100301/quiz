import { useEffect } from 'react'
import CountDown from './countDown'
import './rightContent.scss'


const RightContent = (props) => {
    const { dataQuiz, handleFinishQuizTimesUp, setIndex } = props

    const onTimesUp = () => {
        handleFinishQuizTimesUp()
    }

    const getClassQuestion = (question) => {
        if (question?.answers?.length > 0) {
            let isNotAnswered = question.answers.find(item =>
                item.isSelected === true
            )
            if (isNotAnswered) {
                return "question answered"
            }
            else {
                return "question not-answer"
            }
        }
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
                            <div
                                key={`question-${index}`}
                                onClick={() => setIndex(index)}
                                className={index === props.index ? `question active ${getClassQuestion(item)} ` : getClassQuestion(item)}>
                                {index + 1}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default RightContent