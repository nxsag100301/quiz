import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const putEditUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id } })
}

const getAllUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password })
}

const postRegister = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password })
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizDataById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data)
}

const getAllQuiz = () => {
    return axios.get('api/v1/quiz/all')
}

const putEditQuiz = (quizId, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', quizId);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data)
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}

const postCreateNewQuestionForQuiz = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data })
}

const logOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token })
}

const getOverview = () => {
    return axios.get('api/v1/overview')
}

export {
    postCreateNewUser, getAllUsers,
    putEditUser, deleteUser,
    getAllUsersWithPaginate, postLogin,
    postRegister, getQuizByUser,
    getQuizDataById, postSubmitQuiz,
    postCreateNewQuiz, getAllQuiz,
    putEditQuiz, deleteQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuiz,
    getQuizWithQA, postUpsertQA, logOut, getOverview

}