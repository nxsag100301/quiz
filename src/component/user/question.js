import { useState } from "react"
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const Question = (props) => {

    const { data, index, handleCheckBoxParent } = props
    const [isShowImg, setIsShowImg] = useState(false)
    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleCheckBox = (event, aId, qId) => {
        let isChecked = event.target.checked
        handleCheckBoxParent(aId, qId)
    }


    return (
        <div className="question-container">
            {data?.image ?
                <div className="question-image">
                    <img onClick={() => setIsShowImg(true)}
                        src={`data:image/png;base64,${data.image}`} />
                </div>
                :
                <div className="question-image"></div>
            }
            <div className='question'>
                Question {index + 1}: {data?.questionDescription} ?
            </div>
            <div className='answer'>
                {data?.answers?.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={item.isSelected}
                                        onChange={(event) => handleCheckBox(event, item.id, data.questionId)}
                                    />
                                    <label className="form-check-label">
                                        {item?.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                {isShowImg == true &&
                    <Lightbox image={`data:image/png;base64,${data.image}`}
                        onClose={() => setIsShowImg(false)}
                        title={data.questionDescription}></Lightbox>
                }
            </div>
        </div>
    )
}

export default Question