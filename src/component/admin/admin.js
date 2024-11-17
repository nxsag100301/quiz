import SideBar from "./SideBar";
import './Admin.scss';
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from "react-redux";
import Header from "./header";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated === false || account.role !== "ADMIN") {
            navigate('/')
        }
    }, [isAuthenticated, account, navigate])

    const handleOffSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="admin-container">
            {isAuthenticated && account.role === "ADMIN" &&
                <>
                    <div className="admin-sidebar">
                        <SideBar collapsed={collapsed} handleOffSidebar={handleOffSidebar} />
                    </div>
                    <div className="admin-content">
                        <div className="admin-header">
                            <Header />
                        </div>
                        <div className="admin-main">
                            <PerfectScrollbar>
                                <Outlet />
                            </PerfectScrollbar>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Admin;
