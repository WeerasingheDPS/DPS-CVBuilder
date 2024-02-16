import { Col, Row, Layout } from 'antd'
import React from 'react'
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar'
import ShowResumePage from '../resume/ShowResumePage';
import Footer from '../Footer';
const { Content } = Layout;

export default function MainLayout() {

  const location = useLocation();
  const isLogin = localStorage.getItem("IS_LOGGED_IN") === null ? false : localStorage.getItem("IS_LOGGED_IN");


  return (
    <>
        <Row 
            justify="center"
            className='main-layout-navbar-w'>
            <Col span={24}>
              <Navbar/>
            </Col>
          </Row>
       <Layout>
    
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Sidebar />
            <Layout style={{ backgroundColor: "white" }}>
              <Content
                className='main-layout-content-w'
               >
                  {isLogin && location.pathname === "/"  ? <Col span={24}> <ShowResumePage/></Col> : <Col span={24}><Outlet/></Col>}
                  <Col span={24}>
                    {/* <Footer/> */}
                  </Col>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    </>
  )
}
