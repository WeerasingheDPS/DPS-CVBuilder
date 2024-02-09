import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Alert,
  message,
  Spin
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userChangePassword } from "../api/apiProviderService";

const { Title } = Typography;

export default function () {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("USER_ID");

  const navigate = useNavigate();
  const [oldp, setOldp] = useState("");
  const [newp, setNewp] = useState("");
  const [confirmp, setConfirmp] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    let change = {
      oldPassword: oldp,
      newPassword: newp,
    };
     try{
      const response = await userChangePassword(change);
      if (response.data.success) {
        setOldp("");
        setNewp("");
        setConfirmp("");
        setLoading(false);
        console.log(response);
        message.success(response.data.result);
      }
     }catch(e){
      setOldp("");
      setNewp("");
      setConfirmp("");
      setLoading(false);
      console.log(e)
      message.error(e.response.data.failure.description);
     }
  };

  return (
    <>
      <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Row justify="center">
            <Col span={22}>
              <Form onFinish={handleChangePassword}>
                <Row>
                  <Col span={24}>
                    <Title level={2}>CHANGE PASSWORD</Title>
                    <Divider />
                  </Col>
                  <Col span={24}>
                    <Title level={4} style={{ marginTop: "5px" }}>
                      Old Password
                    </Title>
                    <Input
                      type="password"
                      value={oldp}
                      onChange={(e) => setOldp(e.target.value)}
                      style={{
                        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                        borderRadius: '0',
                        height: "40px",
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={11}>
                    <Title level={4}> New Password</Title>
                    <Input
                      type="password"
                      value={newp}
                      onChange={(e) => setNewp(e.target.value)}
                      style={{
                        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                        borderRadius: '0',
                        height: "40px",
                      }}
                    />
                  </Col>
                  <Col span={11}>
                    <Title level={4}> Confirm New Password</Title>
                    <Input
                      type="password"
                      value={confirmp}
                      onChange={(e) => setConfirmp(e.target.value)}
                      style={{
                        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                        borderRadius: '0',
                        height: "40px",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      htmlType="submit"
                      style={{ marginTop: "40%", borderRadius:'0' }}
                      type="primary"
                      size="large"
                    >
                      Change
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      </Spin>
    </>
  );
}
