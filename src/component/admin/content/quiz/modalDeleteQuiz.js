import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiservice';

const ModalDeleteQuiz = (props) => {

    const [id, setId] = useState('');
    const [quizName, setQuizName] = useState('')

    const { quizInfo, isShowDeleteModal, getListQuiz, handleDeleteQuiz } = props

    useEffect(() => {
        setId(quizInfo?.id)
        setQuizName(quizInfo?.name)
    }, [quizInfo])

    const handleConfirmDelete = async () => {
        let res = await deleteQuiz(id)
        if (res?.EC === 0) {
            toast.success(`${quizName} deleted`)
            handleDeleteQuiz()
            getListQuiz()
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }

    }

    return (
        <Modal show={isShowDeleteModal}
            backdrop="static"
            onHide={handleDeleteQuiz}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete: <b>{quizName}</b> </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteQuiz}>Cancel</Button>
                <Button variant="danger" onClick={() => handleConfirmDelete()}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteQuiz;
