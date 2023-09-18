import { Button, Col, Image, Row, Space } from "antd";
import Navbar from "../components/navbar/Navbar";

export default function LandingPage() {
  return (
    <>
    <Row style={{backgroundColor:'#F0EEEB', minHeight:'100vh'}}>
       <Col span={24}>
        <Navbar/>
       </Col>
    </Row>
    </>
  )
}
