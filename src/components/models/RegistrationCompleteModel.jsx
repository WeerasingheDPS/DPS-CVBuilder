import {
    Form,
    Input,
    Button,
    Modal,
    Row,
    Col,
    Typography,
    Select,
    Alert,
    Spin,
    message,
    Card,
    Space,
  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeRegistrationComplete } from "../../store/models/modelsSlice";

  const { Title, Text, Link } = Typography;

export default function RegistrationCompleteModel({success, error}) {

    const isOpen = useSelector((state)=>state.models.registrationComplete);
    const dispatch = useDispatch();
  return (
    <>

<Modal
        open={isOpen}
        onCancel={() => {dispatch(closeRegistrationComplete())}}
        footer={[]}
      >
        <Row gutter={[0, 30]} style={{ padding: "2%" }}>
          <Col span={24}>
            <Title style={{ margin: "0" }}>Registration!</Title>
          </Col>
          {success && <Col span={24}>
            <Title level={3}>
                Registration is success! 
            </Title>
            <Text level={3}>
                Please check the email
            </Text>
          </Col>}
          {error && <Col span={24}>
            <Title level={3}>
                Registration is failed! 
            </Title>
            <Text level={3}>
                {error}
            </Text>
          </Col>}
        </Row>
      </Modal>
    </>
  )
}
