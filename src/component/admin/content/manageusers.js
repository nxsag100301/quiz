import { useState, useEffect } from "react"
import ModalAddNewUser from "./modaladdnewuser"
import './manageusers.scss'
import { ImUserPlus } from "react-icons/im";
import { getAllUsers } from "../../../services/apiservice";
import { toast } from "react-toastify"
import ModalEditUser from "./modalEditUser";
import ModalDeleteUser from "./modalDeleteUser";
import TableUsersPaginate from "./tableUserPaginate";
import { getAllUsersWithPaginate } from "../../../services/apiservice";

const ManageUser = (props) => {

    const LIMIT_USER = 4;
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [allUsers, setAllUsers] = useState('')
    const [userEdit, setUserEdit] = useState('')
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [pageCount, setPagecount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const handleOpenCloseModal = () => {
        setIsShowModal(!isShowModal)
    }

    const handleOpenCloseEditModal = (userEdit) => {
        setIsShowEditModal(!isShowEditModal)
        setUserEdit(userEdit)
    }

    const handleDeleteUser = (userEdit) => {
        setIsShowDeleteModal(!isShowDeleteModal)
        setUserEdit(userEdit)
    }

    useEffect(() => {
        fetchAllUsersWithPaginate(currentPage)
    }, [])

    const fetchAllUsers = async () => {
        let res = await getAllUsers()
        if (res?.EC === 0) {
            setAllUsers(res.DT)
        }
        else {
            toast.error(res?.EM)
            setAllUsers('')
        }
    }

    const fetchAllUsersWithPaginate = async (page) => {
        let res = await getAllUsersWithPaginate(page, LIMIT_USER)
        if (res?.EC === 0) {
            setAllUsers(res?.DT?.users)
            setPagecount(res?.DT?.totalPages)
        }
        else {
            toast.error('Something wrong')
            setAllUsers('')
        }
    }

    return (
        <>
            <ModalAddNewUser isShowModal={isShowModal}
                handleOpenCloseModal={handleOpenCloseModal}
                fetchAllUsers={fetchAllUsers}
                fetchAllUsersWithPaginate={fetchAllUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalEditUser
                isShowEditModal={isShowEditModal}
                handleOpenCloseEditModal={handleOpenCloseEditModal}
                fetchAllUsers={fetchAllUsers}
                userEdit={userEdit}
                fetchAllUsersWithPaginate={fetchAllUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser isShowDeleteModal={isShowDeleteModal}
                handleDeleteUser={handleDeleteUser}
                fetchAllUsers={fetchAllUsers}
                userEdit={userEdit}
                fetchAllUsersWithPaginate={fetchAllUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className="manage-user-container">
                <div className="manage-title">
                    Manage User
                </div>
                <div className="user-content">
                    <div className="btn-add-new">
                        <button onClick={() => handleOpenCloseModal()}><ImUserPlus /> Add new user</button>

                    </div>
                    <div className="table-user-container">
                        <TableUsersPaginate allUsers={allUsers}
                            handleOpenCloseEditModal={handleOpenCloseEditModal}
                            handleDeleteUser={handleDeleteUser}
                            fetchAllUsersWithPaginate={fetchAllUsersWithPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageUser