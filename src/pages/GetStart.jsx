import { Col, Row } from 'antd'
import React from 'react'
import Navbar from '../components/navbar/Navbar'

export default function GetStart() {
  return (
    <>
    <Row>
        <Col span={24}>
            <Navbar status={false}/>
        </Col>
        <Col span={24}>   
        </Col>
    </Row>
    </>
  )
}
