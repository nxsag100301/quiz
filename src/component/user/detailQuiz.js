import { useEffect, useState } from 'react'
import './detailQuiz.scss'
import { useParams, useLocation, Link, NavLink } from 'react-router-dom'
import { getQuizDataById, postSubmitQuiz } from '../../services/apiservice'
import _ from 'lodash'
import Question from './question'
import { toast } from 'react-toastify'
import ModalResult from './modalResult'
import RightContent from './content/rightContent'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DetailQuiz = (props) => {

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowResultModal, setIsShowResultModal] = useState(false)
    const [dataModal, setDataModal] = useState('')

    const location = useLocation()
    const params = useParams()
    const quizId = params.id
    // console.log('check location:', location)

    useEffect(() => {
        fetchQuestion()
    }, [quizId])

    const handleCheckBoxParent = (aId, qId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let questionIndex = dataQuizClone.findIndex(item => +item.questionId === +qId);
        if (questionIndex !== -1 && dataQuizClone[questionIndex].answers) {
            dataQuizClone[questionIndex].answers = dataQuizClone[questionIndex].answers.map(answer => {
                if (+answer.id === +aId) {
                    return {
                        ...answer,
                        isSelected: !answer.isSelected
                    };
                }
                return answer;
            });
        }

        setDataQuiz(dataQuizClone);
    };

    const fetchQuestion = async () => {
        let res = await getQuizDataById(quizId)
        if (res?.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription = null
                    let image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item?.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
            // console.log('check data', data)
        }
    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz?.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = +item.questionId
                let userAnswerId = []
                if (item?.answers?.length > 0) {
                    item?.answers.forEach(item => {
                        if (item.isSelected === true) {
                            userAnswerId.push(item.id)
                        }
                    })
                }
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers
        }
        let hasErr = 0
        payload.answers.forEach(item => {
            if (item.userAnswerId.length !== 1) {
                hasErr++
            }
        })
        if (hasErr !== 0) {
            toast.error('You must choose only 1 answer')
            return
        }
        else {
            let res = await postSubmitQuiz(payload)
            if (res?.EC === 0) {
                setIsShowResultModal(true)
                setDataModal(res?.DT)
            }
            else {
                toast.error(res?.EM || "Something wrong")
            }
        }
    }
    const handleFinishQuizTimesUp = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz?.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = +item.questionId
                let userAnswerId = []
                if (item?.answers?.length > 0) {
                    item?.answers.forEach(item => {
                        if (item.isSelected === true) {
                            userAnswerId.push(item.id)
                        }
                    })
                }
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers
        }
        let res = await postSubmitQuiz(payload)
        if (res?.EC === 0) {
            setIsShowResultModal(true)
            setDataModal(res?.DT)
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }
    }
    return (
        <>
            <div className="detail-quiz-container">
                <ModalResult handleIsShowResult={() => setIsShowResultModal(!isShowResultModal)}
                    isShowResultModal={isShowResultModal}
                    dataModal={dataModal}
                />
                <Breadcrumb className='detail-quiz-breadcrumb'>
                    <NavLink to="/" className='breadcrumb-item'>Home</NavLink>
                    <NavLink to="/users" className='breadcrumb-item'>Users</NavLink>
                    <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
                </Breadcrumb>
                <div className='quiz-content-container'>
                    <div className='quiz-left-content'>
                        <div className='quiz-title'>
                            Quiz {quizId}: {location?.state?.quizTitle}
                        </div>
                        <hr />
                        <div className='quiz-body'>

                        </div>
                        <div className='quiz-content'>
                            <Question
                                handleCheckBoxParent={handleCheckBoxParent}
                                index={index}
                                data={dataQuiz && dataQuiz.length > 0
                                    ?
                                    dataQuiz[index]
                                    :
                                    []
                                } />
                        </div>
                        <div className='quiz-footer'>
                            <button className='btn btn-primary'
                                onClick={() => setIndex(index - 1)}
                                disabled={index === 0 ? true : false}
                            >Prev</button>
                            <button className='btn btn-primary'
                                onClick={() => setIndex(index + 1)}
                                disabled={index + 1 === dataQuiz?.length ? true : false}
                            >
                                Next
                            </button>
                            <button className='btn btn-warning'
                                onClick={() => handleFinishQuiz()}
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                    <div className='quiz-right-content'>
                        <RightContent
                            dataQuiz={dataQuiz}
                            handleFinishQuizTimesUp={handleFinishQuizTimesUp}
                            setIndex={setIndex}
                            index={index} />
                    </div>
                </div>
            </div>

        </>

    )
}

export default DetailQuiz