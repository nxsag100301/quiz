import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";

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
                <div className="admin-main">
                    content
                </div>
            </div>
        </div>
    );
};

export default Admin;
