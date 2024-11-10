import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFileUpload } from "react-icons/fa";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiservice';

const ModalAddNewUser = (props) => {
    const { isShowModal, handleOpenCloseModal, fetchAllUsers, fetchAllUsersWithPaginate } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        if (event?.target?.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSubmitCreateUser = async () => {
        if (!email || !password || !username) {
            toast.error("Please fill in all fields.");
            return;
        }
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        let res = await postCreateNewUser(email, password, username, role, image)
        if (res?.EC === 0) {
            toast.success('Add new user successful')
            handleOpenCloseModal()
            setEmail('');
            setPassword('');
            setUsername('');
            setRole('USER');
            setImage('');
            setPreviewImage('');
            props.setCurrentPage(1)
            await fetchAllUsersWithPaginate(1)
        }
        else {
            toast.error(res?.EM)
        }

    }

    return (
        <>
            <Modal size='lg' show={isShowModal}
                onHide={handleOpenCloseModal}
                backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} name="email"
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} name="password"
                                onChange={(event) => setPassword(event.target.value)} />
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
                    <Button variant="secondary" onClick={handleOpenCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;