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
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '../store/models/modelsSlice';

export default function Sidebar (){

   // const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state)=>state.models.collapsed);

    const sidebarItems = [
       
        {
            id: 3,
            label: "Resume",
            key: "/resume",
            icon: <AuditOutlined />,
          },
          
          {
            id: 10,
            label: "Settings",
            key: "/settings",
            icon: <SettingFilled />,
            children: [
              {
                label: "ChangePassword",
                key: "/changepassword",
                icon: <LockFilled />,
              },
            ],
          },
        ]
   
    const onClick = ({ key }) => {
        if(isCollapsed){
            toggleCollapsed();
        }
            navigate(key);
    
    };
    const toggleCollapsed = () => {
        dispatch(setCollapsed());
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
                minWidth: isCollapsed ? '50px' : "250px",
                paddingTop:"4%",
                left: '0',
                overflow: 'auto',
                scrollbarWidth: '0',
                maxHeight: '85vh',
               // zIndex: "9999"
            }} className='sidebar-main-w'>
                <Col span={24}>
                    <Row style={{
                        display: 'flex',
                        justifyContent: isCollapsed ? 'center' : 'end',
                        
                    }}>
                        <Col span={24} >
                            <Row >
                                <Button
                                    className='collaps-btn'
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

