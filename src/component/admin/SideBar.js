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
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";

const SideBar = (props) => {
    // Nhận `collapsed` và `handleOffSidebar` từ props
    const { collapsed, handleOffSidebar } = props;

    const navigate = useNavigate()

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
                    }}>
                    {/* Khi nhấp vào biểu tượng `MdQuiz`, sẽ gọi `handleOffSidebar` để đóng/mở sidebar */}
                    <span style={{ cursor: "pointer" }} onClick={handleOffSidebar}><MdQuiz size={25} /></span>&nbsp;
                    <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => navigate('/')}>Nxsag</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<MdDashboard />}><Link to="/admin">Dashboard</Link></MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title={"Features"} icon={<IoHandLeft />}>
                        <MenuItem icon={<FaRegUser />}><Link to="manage-user">Quản lý Users</Link></MenuItem>
                        <Menu iconShape="circle">
                            <SubMenu title={"Quản lý Quiz"} icon={<RiQuestionAnswerFill />}>
                                <MenuItem icon={<IoMdAddCircle />}><Link to="manage-quiz">Thêm Quiz</Link></MenuItem>
                                <MenuItem icon={<FaListUl />}><Link to="list-quiz">Danh sách Quiz</Link></MenuItem>
                            </SubMenu>
                        </Menu>
                        <MenuItem icon={<FaQuestionCircle />}><Link to='manage-questions'>Quản lý câu hỏi</Link> </MenuItem>
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
