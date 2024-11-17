import './dashboard.scss'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getOverview } from '../../../services/apiservice';
import { useEffect, useState } from 'react';



const Dashboard = (props) => {

    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverview()
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview()
        if (res?.EC === 0) {
            setDataOverview(res?.DT)
            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz
            Qs = res?.DT?.others?.countQuestions
            As = res?.DT?.others?.countAnswers
            const data = [
                { "name": "Quizzes", "Qz": Qz },
                { "name": "Questions", "Qs": Qs },
                { "name": "Answers", "As": As },
            ];
            setDataChart(data)

        }
        else {
            setDataOverview([])
        }
    }

    console.log('check state:', dataOverview)
    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='content-left'>
                    <div className='total-number'>
                        <span className='text-1'>Total users</span>
                        <span className='text-2'>{dataOverview?.users?.total}</span>
                    </div>
                    <div className='total-number'>
                        <span className='text-1'>Total quizzes</span>
                        <span className='text-2'>{dataOverview?.others?.countQuiz}</span>
                    </div>
                    <div className='total-number'>
                        <span className='text-1'>Total questions</span>
                        <span className='text-2'>{dataOverview?.others?.countQuestions}</span>
                    </div>
                    <div className='total-number'>
                        <span className='text-1'>Total answers</span>
                        <span className='text-2'>{dataOverview?.others?.countAnswers}</span>
                    </div>
                </div>
                <div className='content-right'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray={"3 3"} /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill='#8884d8' />
                            <Bar dataKey="Qs" fill='#82ca9d' />
                            <Bar dataKey="As" fill='#8A2BE2' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard