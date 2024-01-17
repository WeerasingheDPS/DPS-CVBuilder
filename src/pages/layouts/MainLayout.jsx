import { Col, Row, Layout } from 'antd'
import React from 'react'
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar'
const { Content } = Layout;

export default function MainLayout() {
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
              <Navbar status={true}/>
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
                <Outlet/>
              </Content>
              <h1>This is footer</h1>
            </Layout>
          </Layout>
        </Layout>
    </>
  )
}
