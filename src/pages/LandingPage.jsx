import { Button, Col, Image, Row, Space } from "antd";
import Navbar from "../components/navbar/Navbar";
import cover from '../assests/images/Cover.png';

export default function LandingPage() {
  return (
    <>
    <Row style={{backgroundColor:'#F0EEEB', minHeight:'100vh'}}>
       <Col span={24}>
       <Image src={cover} preview = {false}/ >
       </Col>
    </Row>
    </>
  )
}
