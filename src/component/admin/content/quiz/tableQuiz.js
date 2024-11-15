import { useNavigate } from 'react-router-dom';
import './tableQuiz.scss';
import { FaPlus } from 'react-icons/fa';
import { getAllQuiz } from '../../../../services/apiservice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalEditQuiz from './modalEditQuiz';
import ModalDeleteQuiz from './modalDeleteQuiz';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Questions from '../question/questions';
import UpdateQuestions from './updateQuestions';
import AssignQuiz from './assignQuiz';

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [quizInfo, setQuizInfo] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getListQuiz();
    }, []);

    const handleEditQuiz = (item) => {
        setIsShowEditModal(!isShowEditModal);
        setQuizInfo(item);
    };

    const handleDeleteQuiz = (item) => {
        setIsShowDeleteModal(!isShowDeleteModal);
        setQuizInfo(item);
    };

    const getListQuiz = async () => {
        let res = await getAllQuiz();
        if (res?.EC === 0) {
            setListQuiz(res?.DT);
        } else {
            toast.error(res?.EM || `Can't get list quiz`);
        }
    };

    return (
        <>
            <ModalEditQuiz
                handleEditQuiz={handleEditQuiz}
                isShowEditModal={isShowEditModal}
                quizInfo={quizInfo}
                getListQuiz={getListQuiz}
            />
            <ModalDeleteQuiz
                quizInfo={quizInfo}
                isShowDeleteModal={isShowDeleteModal}
                getListQuiz={getListQuiz}
                handleDeleteQuiz={handleDeleteQuiz}
            />
            <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
                <div className="table-quiz-container">
                    <AccordionItem id="item-1" className="accordion-item">
                        <AccordionItemHeading>
                            <AccordionItemButton>List quiz</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="add-new-quiz">
                                <button onClick={() => navigate('/admin/manage-quiz')}>
                                    <FaPlus />
                                    Add new quiz
                                </button>
                            </div>
                            <div className="table-quiz-content">
                                <table className="table table-striped table-bordered ">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Difficulty</th>
                                            <th>Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listQuiz?.length > 0 &&
                                            listQuiz.map((item, index) => {
                                                return (
                                                    <tr key={`list-quiz-${index}`}>
                                                        <th>{index + 1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.difficulty}</td>
                                                        <td>
                                                            <div className="list-quiz-btn">
                                                                <button
                                                                    onClick={() => handleEditQuiz(item)}
                                                                    className="list-quiz-btn-edit"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteQuiz(item)}
                                                                    className="list-quiz-btn-delete"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem id="item-2" className="accordion-item">
                        <AccordionItemHeading>
                            <AccordionItemButton>Update Q/A Quiz</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='manage-question'>
                                <UpdateQuestions />
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem id="item-3" className="accordion-item">
                        <AccordionItemHeading>
                            <AccordionItemButton>Assign to User</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <AssignQuiz />
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem id="item-4" className="accordion-item">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Manage question
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='manage-question'>
                                <Questions />
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                </div>
            </Accordion>
        </>
    );
};

export default TableQuiz;
