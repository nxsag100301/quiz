import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FaFileUpload } from "react-icons/fa";
import { putEditQuiz } from '../../../../services/apiservice';
import { toast } from 'react-toastify';

const ModalEditQuiz = (props) => {

    const { isShowEditModal, handleEditQuiz, quizInfo, getListQuiz } = props

    const [quizId, setQuizId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescrption] = useState('')
    const [difficulty, setDifficulty] = useState('EASY')
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setQuizId(quizInfo?.id)
        setName(quizInfo?.name)
        setDescrption(quizInfo?.description)
        setDifficulty(buildDataSelect(quizInfo?.difficulty))
        setImage(quizInfo?.image)
        setPreviewImage(`data:image/png;base64,${quizInfo?.image}`)
    }, [quizInfo])


    const buildDataSelect = (data) => {
        let result = []
        if (data) {
            let obj = {}
            obj.value = data;
            obj.label = data;
            result.push(obj)
        }
        return result;
    }


    const options = [
        { value: 'EASY', label: 'Easy' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'HARD', label: 'Hard' },
    ];

    const handleImageChange = (event) => {
        if (event?.target?.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleConfirmEditQuiz = async () => {
        let res = await putEditQuiz(quizId, description, name, difficulty?.value, image)
        console.log('check res:', res)
        if (res?.EC === 0) {
            toast.success('Edit success!')
            handleEditQuiz()
            getListQuiz()
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }
    }

    return (
        <div className='modal-edit-quiz'>
            <Modal show={isShowEditModal}
                onHide={handleEditQuiz}
                size='lg'
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="edit-quiz">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="1"
                                value={name} onChange={(event) => setName(event.target.value)} />
                            <label>Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="1"
                                value={description} onChange={(event) => setDescrption(event.target.value)} />
                            <label>Description</label>
                        </div>
                        <div className='quiz-select my-3'>

                            <Select
                                value={difficulty}
                                onChange={setDifficulty}
                                options={options}
                                placeholder="Difficultly"
                            />
                        </div>
                        <div className='more-actions'>
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditQuiz}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmEditQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalEditQuiz