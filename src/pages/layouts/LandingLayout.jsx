import { Col, Row, Layout } from 'antd'
import React from 'react'
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar'
import LandingPage from '../LandingPage';
import Footer from '../Footer';
const { Content } = Layout;

export default function LandingLayout() {
    const location = useLocation();

  return (
    <>                                                                                  
          <Row
            justify="center"
           className='landing-layout-w'
          >
            <Col span={24} className='landing-navbar-w'>
              <Navbar/>
            </Col>
          </Row>
          <Row className='landing-content-w'>
              {location.pathname ===  "/" ? <Col span={24}> <LandingPage/></Col> : <Col span={24}><Outlet/></Col>}
              <Col span={24}>
                {location.pathname === "/" ? <Col id='4footer' span={24}> <Footer/></Col> : null}
              </Col>
          </Row>
    </>
  )
}
