import { Button, Col, Image, Row, Space } from "antd";
import Navbar from "../components/navbar/Navbar";
import cover from '../assests/images/Cover.png';
import landing2 from '../assests/images/Landing-about.png';
import landing3 from '../assests/images/Landing-3.png';
import LandingHome from "./landing/LandingHome";


export default function LandingPage() {
  return (
    <>
    <Row style={{backgroundColor:'#F0EEEB', minHeight:'85vh'}} >
       <Col id="1home" span={24}>
        <LandingHome/>
       </Col>
       <Col id="2about" span={24}>
        <Image src = {landing2} preview = {false}/>
       </Col>
       <Col id="3services" span={24}>
        <Image src = {landing3} preview = {false}/>
       </Col>
    </Row>
    </>
  )
}
