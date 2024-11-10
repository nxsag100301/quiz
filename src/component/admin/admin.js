import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleOffSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} handleOffSidebar={handleOffSidebar} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
};

export default Admin;
