import React from 'react'
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
import { FacebookOutlined, MailOutlined } from '@ant-design/icons';

  const {Link, Title, Text } = Typography;


export default function Footer() {
  return (
    <>
    <Row className='footer-main' align='middle' justify='center'>
        <Col span={20}>
            <Row justify="space-around" gutter={[20, 40]}>
                <Col>
                    <Title level={5} className="title-text">
                        CONTACT US
                    </Title>
                    <Text className='title-text'>
                    <MailOutlined /> dpscvbuilder@gmail.com 
                    </Text> <br/>

                    <Text className='title-text'>
                    <FacebookOutlined /> dpscvbuilderofficial 
                    </Text> <br/>

                    
                    
                </Col>
                <Col>
                    <Title level={5} className="title-text">
                        SERVICE
                    </Title>
                    <Text className="title-text">Create Resume</Text><br/>
                    <Text className="title-text">Resume Writing Service</Text><br/>
                    <Text className="title-text">Resume Optimization Service</Text><br/>
                </Col>
                <Col>
                    <Title level={5} className="title-text">
                        SUPPORT
                    </Title>
                    <Text className="title-text">About Us</Text><br/>
                    <Text className="title-text">Contact</Text><br/>
                    <Text className="title-text">FAQ</Text><br/>
                </Col>
                <Col>
                    <Title level={5} className="title-text">
                       DPS Cv Builder
                    </Title>
                    <Text className="title-text">Privacy And Cookie Statement</Text><br/>
                    <Text className="title-text">Terms and Conditions</Text><br/>
                    <Text className="title-text">Pricing</Text><br/>

                </Col>
                <Col span={24}>
                <Text className="title-text">2024 © DPSCvBuilder.com | Terms and Conditions | Privacy and Cookie Statement</Text><br/>
                </Col>
            </Row>
        </Col>
    </Row>
    </>
  )
}
