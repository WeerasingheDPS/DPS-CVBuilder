import { ArrowsAltOutlined } from "@ant-design/icons";
import Landing from '../../assests/images/Landing-01.png';
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
    <Row className='landing-home-main'>
        <Col  span={24}>
            <Row gutter={[0,10]}>
                <Col span={24}>
                   <Image preview={false} src={Landing}/>
                </Col>
                <Col span={24}>
                    <Row justify='center'>
                        <Col span={18}>
                            <Link 
                            to="2about"
                            smooth={true}
                            offset={-100}
                            duration={500} >
                            <Button 
                                shape="round" 
                                size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}                         onClick={()=>{localStorage.clear(); window.location.href="/"}}
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
