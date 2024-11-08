import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiservice"
import { toast } from "react-toastify"


const TableUsers = (props) => {

    const { allUsers, handleOpenCloseEditModal, handleDeleteUser } = props

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="colSpan">#</th>
                    <th scope="colSpan">Email</th>
                    <th scope="colSpan">Username</th>
                    <th scope="colSpan">Role</th>
                    <th scope="colSpan">Handle</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.length > 0 &&
                    allUsers.map((item, index) => {
                        return (
                            <tr key={`table-users-${index}`}>
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-primary">Detail</button>
                                    <button className="btn btn-warning mx-2"
                                        onClick={() => handleOpenCloseEditModal(item)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleDeleteUser(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default TableUsers