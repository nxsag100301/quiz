import './questions.scss'
import Select from 'react-select';
import React, { useState } from 'react';
import { FaFileUpload, FaMinusSquare } from "react-icons/fa";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

const Questions = (props) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const [question, setQuestion] = useState([
        {
            id: uuidv4(),
            description: 'ques 1',
            image: '',
            answer: [
                {
                    id: uuidv4(),
                    description: 'ans 1',
                    isCorrect: false
                }
            ]
        }
    ])


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleImageChange = (event) => {
        if (event?.target?.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                answer: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestion([...question, newQuestion])
        }
        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(question);
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestion(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, qId, aId) => {
        let questionClone = _.cloneDeep(question);
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === qId)
            questionClone[index].answer.push(newAnswer)
            setQuestion(questionClone)
        }
        if (type === "REMOVE") {
            let index = questionClone.findIndex(item => item.id === qId)
            questionClone[index].answer = questionClone[index].answer.filter(item => item.id !== aId)
            setQuestion(questionClone)
        }
    }


    // console.log('check ques:', question)
    return (
        <div className="question-container">
            <div className="manage-questions-title">
                Manage Questions
            </div>
            <div className='add-new-questions'>
                <div className='col-5 form-group my-3'>
                    <label className='mb-2'>Select quiz</label>
                    <Select
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                {question?.length > 0 &&
                    question.map((item, index) => {
                        return (
                            <div key={item.id} className='add-new-questions-body'>
                                <div className='title-add'>Question {index + 1} :</div>
                                <div className='add-question-header'>
                                    <div>Question {index + 1} description</div>
                                    <div className="question-description col-4">
                                        <input type="text" className="form-control" value={item.description} />
                                    </div>
                                    <div onClick={() => handleAddRemoveQuestion("ADD", '')} className='icon-add-question'>
                                        <FaSquarePlus />
                                    </div>
                                    {question?.length > 1 &&
                                        <div onClick={() => handleAddRemoveQuestion("REMOVE", item.id)} className='icon-minus-question'>
                                            <FaSquareMinus />
                                        </div>
                                    }
                                </div>
                                <div className='questions-upload'>
                                    <label className="form-label label-upload" htmlFor='upload-image'>
                                        <FaFileUpload />
                                        Upload Image
                                    </label>
                                    <input id="upload-image" type="file" hidden name="image"
                                        onChange={(event) => handleImageChange(event)} />
                                </div>
                                <div className='col-md-12 img-preview'>
                                    {!previewImage ? <span>Preview Image</span> : <img src={previewImage} />}
                                </div>
                                <div className='answers-title'>
                                    Add answers:
                                </div>
                                {item?.answer?.length > 0 &&
                                    item?.answer.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers'>
                                                <div className='answers-checkbox'>
                                                    <input className="form-check-input" type="checkbox" checked={answer?.isCorrect} />
                                                </div>
                                                <div className='answers-form col-4'>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" value={answer?.description} />
                                                </div>
                                                <div onClick={() => handleAddRemoveAnswer("ADD", item.id, '')}
                                                    className='icon-plus-answers'>
                                                    <FaSquarePlus />
                                                </div>
                                                {item?.answer?.length > 1 &&
                                                    <div onClick={() => handleAddRemoveAnswer("REMOVE", item.id, answer.id)}
                                                        className='icon-minus-answers'>
                                                        <FaSquareMinus />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Questions