import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFileUpload } from "react-icons/fa";
import { putEditUser } from '../../../services/apiservice';
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {

    const { isShowEditModal, handleOpenCloseEditModal, userEdit, fetchAllUsersWithPaginate } = props

    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setId(userEdit?.id)
        setEmail(userEdit?.email)
        setPassword('fakepassword')
        setUsername(userEdit?.username)
        setRole(userEdit?.role)
        setImage(userEdit?.image)
        if (userEdit?.image) {
            setPreviewImage(`data:image/png;base64,${userEdit.image}`);
        }
        else {
            setPreviewImage('')
        }
    }, [userEdit])

    const handleImageChange = (event) => {
        if (event?.target?.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const handleConfirmEdit = async () => {
        let res = await putEditUser(id, username, role, image)
        if (res?.EC === 0) {
            toast.success('Edit user success')
            handleOpenCloseEditModal()
            await fetchAllUsersWithPaginate(props.currentPage)
        }
        else {
            toast.error(res?.EM)
        }
    }

    return (
        <>
            <Modal size='lg' show={isShowEditModal}
                onHide={handleOpenCloseEditModal}
                backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} name="email"
                                onChange={(event) => setEmail(event.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} name="password"
                                onChange={(event) => setPassword(event.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} name="username"
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} name="role"
                                onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload"
                                htmlFor='upload-image'
                            ><FaFileUpload /> Upload Image</label>
                            <input id="upload-image" type="file" hidden name="image"
                                onChange={(event) => handleImageChange(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {!previewImage ? <span>Preview Image</span> : <img src={previewImage} />}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleOpenCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmEdit()}>
                        Confirm Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser