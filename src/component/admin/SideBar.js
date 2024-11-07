import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGithub, FaRegUser, FaQuestionCircle } from 'react-icons/fa';
import { MdQuiz, MdDashboard } from "react-icons/md";
import { IoHandLeft } from "react-icons/io5";

const SideBar = (props) => {
    // Nhận `collapsed` và `handleOffSidebar` từ props
    const { collapsed, handleOffSidebar } = props;

    return (
        <ProSidebar
            collapsed={collapsed} // Áp dụng trạng thái `collapsed` để kiểm soát mở/đóng sidebar
            breakPoint="md"
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {/* Khi nhấp vào biểu tượng `MdQuiz`, sẽ gọi `handleOffSidebar` để đóng/mở sidebar */}
                    <span onClick={handleOffSidebar}><MdQuiz size={25} /></span> Quiz with React Hook
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title={"Features"} icon={<IoHandLeft />}>
                        <MenuItem icon={<FaRegUser />}> Quản lý Users</MenuItem>
                        <MenuItem icon={<MdQuiz />}> Quản lý Quiz</MenuItem>
                        <MenuItem icon={<FaQuestionCircle />}> Quản lý câu hỏi</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper" style={{ padding: '20px 24px' }}>
                    <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            ViewSource
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;
