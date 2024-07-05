import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import loginPic from '../assets/images/landing-1.png';


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
import { LogIn } from "../api/apiProviderService";
import { tr } from "date-fns/locale";
import RegistrationCompleteModel from "../components/models/RegistrationCompleteModel";
import { openRegistrationComplete } from "../store/models/modelsSlice";
const {Link, Title, Text } = Typography;


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(true);
    const [error, setError] = useState(null);

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
     // setIsValidEmail(validateEmail(newEmail));
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
;
    
    const submitHandler = async () => {
      setLoading(true);
      if(true){
        let userCredentials = {
          email: email,
          password: password
        };
        const data = {
          url:"auth/login",
          data:userCredentials
        }
          try{
            const response = await LogIn(data);
            if(response.data.success){
              localStorage.setItem("ACCESS_TOKEN", response.data.result.accessToken);
              localStorage.setItem("REFRESH_TOKEN", response.data.result.refreshToken);
              localStorage.setItem("IS_LOGGED_IN", true);
              localStorage.setItem("USER", JSON.stringify(response.data.result.systemUser));
              localStorage.setItem("USER_ID", response.data.result.systemUser.id);
              window.location.href = "resume";              
              setEmail('');
              setPassword('');
              setLoading(false);
            }
          }catch(e){
            console.log(e.message);
            message.error("Invalid Usernae or password!");
            setSuccess(false);
            setError("Invalid Usernae or password!");
            dispatch(openRegistrationComplete())
            setEmail('');
            setPassword('');
            setLoading(false);
          }
      }else{
        message.error("Email is invalid!");
        setLoading(false);
        setEmail('');
        setPassword('');
      }

    };
  
  return (
    <>
      <Row className="login-main" align='middle'>
        <RegistrationCompleteModel success={success} error={error}/>
        <Col span={24}>
          <Row align="middle" justify='center'>
            <Col span={10}   >
              <Row justify='center' align='middle' >
                <Col span={18} className="login-form" >
                  <Row
                    style={{ marginBottom: "4px" }}
                  >
                    <Title level={2}>LOGIN</Title>
                  </Row>
                  <Form
                    layout="vertical"
                    onFinish={submitHandler}
                    autoComplete="off"
                  >
                    <Form.Item label="Email" name="email">
                      <Input
                        value={email}
                        style={{
                          padding: "6px 10px 6px",
                          marginBottom: "0px",
                          fontSize: "medium",
                          background: "transparent",
                          border: "2px solid white"
                        }}
                        required
                        allowClear
                        onChange={handleEmailChange}
                      />
                      { email &&
                    (isValidEmail ? null : <Text type='danger'>Email is not valid!</Text>)}
                    {/* (isValidEmail ? <Text type="success">Email is valid</Text> : <Text type='danger'>Email is not valid!</Text>)} */}

                    </Form.Item>

                    <Form.Item label="Password" name="password">
                      <Input.Password
                        required
                        value={password}
                        style={{
                          padding: "6px 10px 6px",
                          marginBottom: "0px",
                          fontSize: "medium",
                          border: "2px solid white"
                        }}
                        allowClear
                        onChange={(e) => {setPassword(e.target.value);console.log(password)}}
                      />
                    </Form.Item>

                    <Row justify="space-between" block>
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <Link
                        onClick={() => {
                          console.log("click forget");
                        }}
                      >
                        Forget Password
                      </Link>
                    </Row>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          padding: "5px 0 30px",
                          fontSize: "medium",
                          fontWeight: "500",
                          marginBottom: "5px",
                        }}
                      >
                        Log In
                      </Button>
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>navigate("/")}>Back to Home</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
