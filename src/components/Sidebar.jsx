import { Button, Menu, Row, Col,ConfigProvider } from 'antd';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    DashboardFilled,
    BellOutlined,
    SettingFilled,
    SketchSquareFilled,
    LockFilled,
    UserOutlined,
    FileAddOutlined,
    FileSearchOutlined,
    DropboxOutlined,
    AuditOutlined,
    FileSyncOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from "@ant-design/icons";

  import { BiLogOutCircle,BiCommentX } from "react-icons/bi";
  import { BsBuildingUp } from "react-icons/bs";
  import { FiSlack, FiUsers,FiEdit } from "react-icons/fi";
  import { FaEnvelopeOpenText } from "react-icons/fa";
  import { AiOutlineDollar,AiOutlineSubnode } from "react-icons/ai";
  import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export default function Sidebar (){

    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const sidebarItems = [
        {
          id: 1,
          label: "sfgegth",
          key: "/dashboard",
          icon: <DashboardFilled />,
        },
        {
          id: 2,
          label: "",
          key: "/profile",
          icon: <UserOutlined />,
        },
        {
            id: 3,
            label: "",
            key: "/resume",
            icon: <AuditOutlined />,
          },
          {
            id: 4,
            label: "",
            key: "/appliedjobs",
            icon: <FileSearchOutlined />,
          },
          {
            id: 5,
            label: "",
            key: "/savedjobs",
            icon: <FileAddOutlined />,
          },
          {
            id: 6,
            label: "",
            key: "scheduledinterviews",
            icon: <FiSlack />,
          }
        ]
   
    const onClick = ({ key }) => {
            navigate(key);
    
    };
    const toggleCollapsed = (e) => {
       setIsCollapsed(!isCollapsed);
    };

    return (
        <>
         <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: 'rgba(25,103,210,255)',
                    },
                }}>
            <Row style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: '15vh',
                backgroundColor: 'white',
                minWidth: isCollapsed ? '60px' : "100px",
                left: '0',
                overflow: 'auto',
                scrollbarWidth: '0',
                maxHeight: '85vh'
            }} className='sidebar-main-w'>
                <Col span={24}>
                    <Row style={{
                        display: 'flex',
                        justifyContent: isCollapsed ? 'center' : 'end',
                        
                    }}>
                        <Col span={24} >
                            <Row >
                                <Button

                                    onClick={toggleCollapsed}
                                    style={{
                                        marginBottom: 16,
                                    }}
                                >
                                    {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                </Button>
                            </Row>
                        </Col>

                    </Row>
                    <Row > 
                        <Col span={24} >
                            <Menu
                                style={{width: '100%',
                                        height: '100%',backgroundColor: 'white',
                                       }}      
                                mode="inline"
                                inlineCollapsed={isCollapsed}
                                items={sidebarItems}
                                onClick={onClick} />
                                
                        </Col>
                    </Row>
                </Col>
            </Row>
            </ConfigProvider>
        </>
    )
}

