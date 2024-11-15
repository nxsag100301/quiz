import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { getAllQuiz, getAllUsers, postAssignQuiz } from '../../../../services/apiservice';
import { toast } from 'react-toastify';



const AssignQuiz = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [listQuiz, setListQuiz] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        getListQuiz()
        getListUser()
    }, [])


    const getListQuiz = async () => {
        let res = await getAllQuiz()
        if (res?.EC === 0) {
            let quizSelect = res?.DT?.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(quizSelect)

        }
        else {
            toast.error(res?.EM || `Can't get list quiz`)
        }
    }

    const getListUser = async () => {
        let res = await getAllUsers()
        // console.log('res:', res)
        if (res?.EC === 0) {
            let userSelect = res?.DT?.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(userSelect)

        }
        else {
            toast.error(res?.EM || `Can't get list quiz`)
        }
    }

    const handleAssignQuizToUser = async () => {
        if (!selectedQuiz || !selectedUser) {
            toast.error('Invalid input')
            return
        }
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res?.EC === 0) {
            toast.success('Assign quiz success')
            setSelectedQuiz(null)
            setSelectedUser(null)
        }
        else {
            toast.error(res?.EM || "Something wrong")
        }
    }

    // console.log('check listQuiz:', listQuiz)
    // console.log('check listuser:', listUser)
    return (
        <div className="assign-quiz-container row">
            <div className='col-5 form-group my-3'>
                <label className='mb-2'>Select quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-5 form-group my-3 mx-5'>
                <label className='mb-2'>Select User</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button onClick={() => handleAssignQuizToUser()}
                    className='btn btn-primary'>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz