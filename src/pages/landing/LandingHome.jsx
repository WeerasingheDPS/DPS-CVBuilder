import { ArrowsAltOutlined } from "@ant-design/icons";
import {
    Form,
    Image,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Typography,
    Alert,
    message,
  } from "antd";
import { Link } from "react-scroll";
  const { Title, Text } = Typography;
export default function LandingHome() {
  return (
    <>
    <Row justify='space-around' align='middle' className='landing-home-main'>
        <Col  span={22}>
            <Row gutter={[0,60]} align='middle'>
                <Col span={24}>
                    <Text className="huge-title-white">
                        Unlock Your Career 
                    </Text>
                    <br/>
                    <Text className="huge-title-white">
                    Success with Our
                    </Text>
                    <br/>
                    <Text className="huge-title-orange">
                    DPS CV Builder
                    </Text>
                </Col>
                <Col span={24}>
                    <Row gutter={20} align='bottom'>
                        <Col>
                            <Text className="normal-title">
                                Ready To Land Your
                            </Text>
                            <br/>
                            <Text className="normal-title-orange">
                                 Dream Job
                            </Text>
                            <br/>
                            <Text className="normal-title">
                                DPS CV Builder Let's Build Your CV Today!
                            </Text>
                        </Col>
                        <Col>

                            <Link 
                            to="2about"
                            smooth={true}
                            offset={-100}
                            duration={500} >
                            <Button 
                                shape="round" 
                                size="large" 
                                type="primary" 
                                icon={<ArrowsAltOutlined/>}>
                                    
                                    Get Started
                            </Button>
                            </Link>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </Col>
    </Row>
    </>
  )
}
