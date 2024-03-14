import { useState } from "react";
import { useNavigate } from "react-router-dom";


import {
  Form,
  Image,
  Input,
  Button,
  Checkbox,
  Radio,
  Row,
  Col,
  Typography,
  Alert,
  message,
  Spin,
} from "antd";
import { postData } from "../api/apiProviderService";
const { Link, Title, Text } = Typography;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };
  const validatePassword = (password) => {
    // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(newConfirmPassword === password);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if(validateEmail && validatePassword && passwordsMatch){
      let registerData = {
        email: email,
        password: password,
      };

      const requestData = {
        url: "cvCreator/register",
        data: registerData
      }
        try{
            const response = await postData(requestData);
            if(response.data.success){
              message.success("User is registered successfully");
              window.location.href("/login")
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setLoading(false);
            }
        }catch(e){
          console.log(e.message);
          message.error(e.message);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setLoading(false);
        }
       
    }else{
      message.error("Please fill all and try again!");
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
    }
    
  };

  return (
    <>
      <Spin spinning={loading}>
      <Row
        className="login-main"
        align="middle"
        justify='center'
      >
        <Col span={24}>
          <Row justify='center'>
            <Col span={10}>
              <Row justify="center" align="middle">
                <Col
                  span={18}
                 className="login-form"
                >
                  <Row >
                    <Title style={{ marginTop: "15px" }} level={2}>
                      SIGN UP
                    </Title>
                  </Row>
                  <Row block justify="center">
                  </Row>
                  <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                  >
                    <Form.Item
                      required
                      className="no-star"
                      label="Email"
                      name="email"
                    >
                      <Input
                        required
                        onChange={handleEmailChange}
                        style={{
                          padding: "6px 10px 6px",
                          border: "2px solid white",
                          fontSize: "medium",
                        }}
                        allowClear
                      />
                    { email &&
                    (isValidEmail ? null : <Text type='danger'>Email is not valid!</Text>)}
                    </Form.Item>
                    
                    <Form.Item
                      required
                      className="no-star"
                      label="Password"
                      name="password"
                    >
                      <Input.Password
                        value={password}
                        onChange={handlePasswordChange}
                        style={{
                          padding: "6x 10px 6px",
                          fontSize: "medium",
                          border: "2px solid white"
                        }}
                        allowClear
                        
                      />
                  { password &&    
                    ( isValidPassword ? 
                    <Text 
                    style={{marginBottom:0}} 
                      type="success">
                        Password is strong
                      </Text> : 
                      <Text 
                        type='danger'>
                          Create a strong password with a mix of letters, numbers and symbols with at least 8 characters
                      </Text>)}
                    </Form.Item>

                    <Form.Item
                      required
                      className="no-star"
                      label="Confirm Password"
                      name="password"
                    >
                      <Input.Password
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{
                          padding: "6px 10px 6px",
                          border: "2px solid white",
                          fontSize: "medium",
                        }}
                        allowClear
                      />
                      {confirmPassword && (passwordsMatch ? <Text type="success">Passwords match</Text> : <Text type='danger'>Passwords do not match</Text>)}
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                        htmlType="submit"
                        block
                        type="primary"
                        loading={loading}
                        style={{
                          padding: "5px 0 30px",
                          fontSize: "medium",
                          fontWeight: "500",
                        }}
                      >
                        Register
                      </Button>
                    </Form.Item>
                  </Form>
                  <Button onClick={() => navigate("/")}>Back to Home</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      </Spin>
    </>
  );
}
