import ReactPaginate from "react-paginate"
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";


const TableUsersPaginate = (props) => {

    const { allUsers, handleOpenCloseEditModal, handleDeleteUser, fetchAllUsersWithPaginate, pageCount } = props

    const handlePageClick = (event) => {
        fetchAllUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected + 1}`);
    }

    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Id</th>
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
                                    <th>{item.id}</th>
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
            <div className="user-paginate">
                <ReactPaginate
                    nextLabel={<GrFormNextLink />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<GrFormPreviousLink />}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUsersPaginate