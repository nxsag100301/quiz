import './manageQuiz.scss'
import Select from 'react-select';
import { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { postCreateNewQuiz } from '../../../../services/apiservice';
import { toast } from 'react-toastify';


const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescrption] = useState('')
    const [difficulty, setDifficulty] = useState('EASY')
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);

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

    const handleAddNewQuiz = async () => {
        if (!name || !description || !image || !difficulty) {
            toast.error('Missing input params')
            return;
        }
        else {
            let res = await postCreateNewQuiz(description, name, difficulty?.value, image)
            if (res?.EC === 0) {
                toast.success(`Create ${name} success`)
                setName('')
                setDescrption('')
                setDifficulty('EASY')
                setImage(null)
                setPreviewImage(null)
            }
            else {
                toast.error(res?.EM || "Some thing wrong")
            }
        }
    }

    return (
        <div className="quiz-container">
            <div className="quiz-title">
                Manage Quiz
            </div>
            <div className="add-new-quiz">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new quiz:</legend>
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
                            defaultValue={difficulty}
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
                    <div className='btn-add-new-quiz'>
                        <button
                            onClick={() => handleAddNewQuiz()}>
                            Add new</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default ManageQuiz