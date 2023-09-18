import { Button, Col, Image, Row, Space } from "antd";
import { RightCircleFilled,LogoutOutlined} from '@ant-design/icons';
import logo from '../../assests/images/CVBuilderLogo.png';

export default function Navbar({status}) {
  return (
    <>
    <Row style={{backgroundColor:'#F0EEEB', minHeight:'100vh'}}>
        <Col span={24}>
            <Row justify='center' style={{padding:'1%'}}>
                <Col span={18}>
                    <Row justify='space-between' align='middle' >
                        <Col span={5}>
                        <Image src={logo} preview={false}/>
                        </Col>
                        <Col>
                        <Space >
                        {status &&
                        <Button 
                            style={{color:'rgba(255, 116, 0, 1)',border: '4px solid rgba(0,0,0,.05)',height:'45px'}}
                            shape="round"
                            size="large">
                                <span style={{color:'rgba(0, 0, 0, 1)', fontWeight: '700', }}>Get Started</span>
                                <RightCircleFilled  />    
                        </Button>}
                        <Button 
                            style={{backgroundColor:'rgb(32,14,50)',color:'#FFF'}}
                            shape="round"
                            size="large">
                                <span style={{fontWeight: '700', }}>Login  <LogoutOutlined /></span>
                        </Button>
                        </Space>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        </Col>
    </Row>
    </>
  )
}
