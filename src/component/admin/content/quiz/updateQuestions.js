import './updateQuestions.scss'
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { FaFileUpload, FaMinusSquare } from "react-icons/fa";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import _, { set } from 'lodash'
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuiz,
    getQuizWithQA,
    postUpsertQA
} from '../../../../services/apiservice';


const UpdateQuestions = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isPreviewImg, SetIsPreviewImg] = useState(false)
    const [listQuiz, setListQuiz] = useState([])
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })
    const [previewImage, setPreviewImage] = useState('')
    const [question, setQuestion] = useState([
        {
            id: uuidv4(),
            description: '',
            image: '',
            previewImage: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ])


    useEffect(() => {
        getListQuiz()
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            getQAByQuizId(selectedQuiz.value)
        }
    }, [selectedQuiz])


    const getListQuiz = async () => {
        let res = await getAllQuiz()
        if (res?.EC === 0) {
            let quizSelect = res?.DT?.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(quizSelect)

        }
        else {
            toast.error(res?.EM || `Can't get list quiz`)
        }
    }

    const getQAByQuizId = async (quizId) => {
        let res = await getQuizWithQA(quizId)
        console.log('res.DT.qa:', res.DT.qa)
        if (res?.EC === 0) {
            const questionWithPreview = res.DT.qa.map(item => ({
                ...item,
                previewImage: item.imageFile, // thêm trường previewImage từ imageFile
            }));
            setQuestion(questionWithPreview);
        }
    }


    const handleImageChange = (qId, event) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === qId);
        if (index > -1) {
            const file = event?.target?.files[0];
            if (file) {
                const reader = new FileReader();

                // Khi tệp được đọc xong, xử lý base64
                reader.onloadend = () => {
                    const base64Image = reader.result; // Đây là base64 của file
                    const base64WithoutHeader = base64Image.split(',')[1];
                    // Cập nhật dữ liệu cho câu hỏi
                    questionClone[index].imageFile = base64WithoutHeader; // Gán base64 vào imageFile
                    questionClone[index].previewImage = base64WithoutHeader; // Gán base64 vào previewImage
                    setQuestion(questionClone); // Cập nhật lại state
                };

                // Đọc file dưới dạng base64
                reader.readAsDataURL(file);
            }
        }
    }



    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                previewImage: '',
                answers: [
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
            if (index > -1) {
                questionClone[index].answers.push(newAnswer)
                setQuestion(questionClone)
            }
        }
        if (type === "REMOVE") {
            let index = questionClone.findIndex(item => item.id === qId)
            if (index > -1) {
                questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== aId)
                setQuestion(questionClone)
            }
        }
    }

    const handleOnChange = (type, qId, value) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === qId)
        if (type === "QUESTION" && index > -1) {
            questionClone[index].description = value
            setQuestion(questionClone)
        }
    }

    const handleAnswerQuestion = (type, aId, qId, value) => {
        let questionClone = _.cloneDeep(question);
        let index = questionClone.findIndex(item => item.id === qId)
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(item => {
                if (item.id === aId) {
                    if (type === "CHECKBOX") {
                        item.isCorrect = value
                    }
                    if (type === "INPUTANSWER") {
                        item.description = value
                    }
                }
                return item
            })
            setQuestion(questionClone)
        }
    }

    const handleSaveQuestionsForQuiz = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error('You must select Quiz')
            return
        }
        let invalidQues = 0
        let invalidAns = 0
        let correctAnswer = 0
        question.map(item => {
            if (!item.description) {
                invalidQues++
            }
            item?.answers?.map(answers => {
                if (!answers.description) {
                    invalidAns++
                }
                if (answers.isCorrect === true) {
                    correctAnswer++
                }
            })
        })
        if (invalidAns !== 0 || invalidQues !== 0) {
            toast.error('Invalid question/answer')
            return
        }

        for (const ques of question) {
            let correct = 0
            for (const ans of ques.answers) {
                if (ans.isCorrect === true) {
                    correct++
                }
            }
            if (correct !== 1) {
                toast.error('Only 1 correct answer/question')
                return
            }
        }

        let questionClone = _.cloneDeep(question)
        questionClone = questionClone.map(item => {
            // Xóa trường previewImage
            const { previewImage, ...rest } = item;
            return rest;  // trả về phần còn lại của câu hỏi mà không có previewImage
        });
        questionClone = questionClone.map(item => {
            if (item.imageFile) {
                // Thêm "data:image/bmp;base64," vào trước nội dung của imageFile
                item.imageFile = 'data:image/jpeg;base64,' + item.imageFile;
            }
            return item;
        });
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        })
        if (res?.EC === 0) {
            toast.success('Edit question success')
            setQuestion([{
                id: uuidv4(),
                description: '',
                image: '',
                previewImage: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }])
            setDataImgPreview({
                title: '',
                url: ''
            })
            setSelectedQuiz(null)
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }

    }

    const handlePreviewImg = (item) => {
        setDataImgPreview({
            title: item?.id,
            url: `data:image/png;base64,${item?.previewImage}`
        })
        SetIsPreviewImg(true)
    }
    return (
        <div className="question-container">
            <div className='add-new-questions'>
                <div className='col-5 form-group my-3'>
                    <label className='mb-2'>Select quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                {question?.length > 0 &&
                    question.map((item, index) => {
                        return (
                            <div key={item.id} className='add-new-questions-body'>
                                <div className='title-add'>Question {index + 1} :</div>
                                <label>Question {index + 1} description</label>
                                <div className='header-and-preview-img'>
                                    <div className='add-question-answer'>
                                        <div className='add-question-header'>
                                            <input type="text" className="form-control"
                                                value={item.description}
                                                onChange={(event) => handleOnChange("QUESTION", item.id, event.target.value)} />
                                            <div onClick={() => handleAddRemoveQuestion("ADD", '')} className='icon-add-question'>
                                                <FaSquarePlus />
                                            </div>
                                            {question?.length > 1 &&
                                                <div onClick={() => handleAddRemoveQuestion("REMOVE", item.id)} className='icon-minus-question'>
                                                    <FaSquareMinus />
                                                </div>
                                            }
                                        </div>
                                        <div className='add-answer'>
                                            <div className='answers-title'>
                                                Add answers:
                                            </div>
                                            {item?.answers?.length > 0 &&
                                                item?.answers.map((answers, index) => {
                                                    return (
                                                        <div key={answers.id} className='answers'>
                                                            <div className='answers-checkbox'>
                                                                <input className="form-check-input" type="checkbox" checked={answers?.isCorrect}
                                                                    onChange={(event) => handleAnswerQuestion("CHECKBOX", answers.id, item.id, event.target.checked)}
                                                                />
                                                            </div>
                                                            <div className='answers-form col-4'>
                                                                <input type="text" className="form-control"
                                                                    onChange={(event) => handleAnswerQuestion("INPUTANSWER", answers.id, item.id, event.target.value)}
                                                                    value={answers?.description} />
                                                            </div>
                                                            <div onClick={() => handleAddRemoveAnswer("ADD", item.id, '')}
                                                                className='icon-plus-answers'>
                                                                <FaSquarePlus />
                                                            </div>
                                                            {item?.answers?.length > 1 &&
                                                                <div onClick={() => handleAddRemoveAnswer("REMOVE", item.id, answers.id)}
                                                                    className='icon-minus-answers'>
                                                                    <FaSquareMinus />
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                    <div className='preview-img-container'>
                                        <div className='questions-upload'>
                                            <label className="form-label label-upload" htmlFor={item.id}>
                                                <FaFileUpload />
                                                Upload Image
                                            </label>
                                            <input id={item.id} type="file" hidden name="image"
                                                onChange={(event) => handleImageChange(item.id, event)} />
                                        </div>
                                        <div className='col-md-12 img-preview'>
                                            {!item.previewImage ? <span>Preview Image</span>
                                                : <img onClick={() => handlePreviewImg(item)}
                                                    src={`data:image/png;base64,${item?.previewImage}`}
                                                />}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                {question?.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSaveQuestionsForQuiz()}
                            className='btn btn-primary'>Save Questions</button>
                    </div>
                }
            </div>
            <div>
            </div>
            {isPreviewImg === true &&
                <Lightbox
                    onClose={() => SetIsPreviewImg(false)}
                    image={dataImgPreview.url} title={dataImgPreview.title} />
            }
        </div>
    )
}

export default UpdateQuestions