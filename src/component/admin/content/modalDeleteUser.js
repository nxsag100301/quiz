import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../../../services/apiservice';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { isShowDeleteModal, handleDeleteUser, userEdit, fetchAllUsersWithPaginate } = props

    const [id, setId] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        setId(userEdit?.id)
        setEmail(userEdit?.email)
    }, [userEdit])

    const handleConfirmDelete = async () => {
        let id = userEdit?.id
        let res = await deleteUser(id)
        console.log('check res:', res)
        if (res?.EC === 0) {
            toast.success(`Delete ${userEdit?.email} success`)
            handleDeleteUser()
            await fetchAllUsersWithPaginate(props.currentPage)
        }
        else {
            toast.error('Fail')
        }
    }

    return (
        <Modal show={isShowDeleteModal}
            backdrop="static"
            onHide={handleDeleteUser}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete: <b>{userEdit?.email}</b></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteUser}>Cancel</Button>
                <Button variant="danger" onClick={() => handleConfirmDelete()}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;
