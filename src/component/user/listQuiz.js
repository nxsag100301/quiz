import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiservice"
import { toast } from "react-toastify"
import './listQuiz.scss'
import { useNavigate } from "react-router-dom"

const ListQuiz = (props) => {

    const [arrQuiz, setArrQuiz] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let res = await getQuizByUser()
        if (res?.EC === 0) {
            setArrQuiz(res.DT)
        }
        else {
            toast.error(res?.EM || 'Something wrong')
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrQuiz?.length > 0 ?
                arrQuiz.map((item, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <div className="quiz-image">
                                <img src={`data:image/png;base64,${item.image}`} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <div className="button-quiz-start">
                                    <button className="btn btn-primary"
                                        onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}>
                                        Start now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div>You don't have any quiz now!</div>}
        </div>
    )
}

export default ListQuiz