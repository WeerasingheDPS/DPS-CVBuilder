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

  return (
    <>
       <Layout>
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
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Sidebar />
            <Layout style={{ backgroundColor: "white" }}>
              <Content
                style={{
                  padding: "70px",
                  margin:  30,
                  minHeight: "85vh",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 5px  rgba(0,0,0,.2)",
                  zIndex: 0
                }}>
                  {location.pathname === "/" ? <Col span={24}> <ShowResumePage/></Col> : <Col span={24}><Outlet/></Col>}
                  <Col span={24}>
                    <Footer/>
                  </Col>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    </>
  )
}
