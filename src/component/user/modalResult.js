import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const ModalResult = (props) => {
    const { isShowResultModal, handleIsShowResult, dataModal } = props


    useEffect(() => {
    }, [])
    console.log('check dataModal:', dataModal)
    return (
        <Modal show={isShowResultModal}
            backdrop="static"
            onHide={handleIsShowResult}
        >
            <Modal.Header closeButton>
                <Modal.Title>Your result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Total question: <b>{dataModal?.countTotal}</b>

                </div>
                <div>
                    Correct: <b>{dataModal?.countCorrect}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleIsShowResult}>Close</Button>
                <Button variant="primary" onClick={handleIsShowResult}>Show answers</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalResult;
