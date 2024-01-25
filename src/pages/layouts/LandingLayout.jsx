import { Col, Row, Layout } from 'antd'
import React from 'react'
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar'
import LandingPage from '../LandingPage';
const { Content } = Layout;

export default function LandingLayout() {
    const location = useLocation();

  return (
    <>                                                                                  
          <Row
            justify="center"
            style={{
              paddingTop:"0vh",
              height: "15vh",
              position: "sticky",
              top: "0",
              left: "0",
              width: "100%",
              backgroundColor: "white",
              zIndex: "2",
            }}
          >
            <Col span={24}>
              <Navbar/>
            </Col>
          </Row>
          <Row>
            {location.pathname ===  "/" ? <Col span={24}> <LandingPage/></Col> : <Col span={24}><Outlet/></Col>}
          </Row>
    </>
  )
}
