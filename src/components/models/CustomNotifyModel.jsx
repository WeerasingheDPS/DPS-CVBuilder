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

export default function CustomNotifyModel({ login, title, content, success, onClose, isOpen }) {
  const dispatch = useDispatch();
  const inIsOpen = useSelector((state)=>state.models.registrationComplete);
  return (
    <>
      <Modal
        centered
        open={login? inIsOpen : isOpen}
        onCancel={login? () => dispatch(closeRegistrationComplete()) : onClose}
        footer={[]}
      >
        <Row gutter={[0, 0]} justify="center" style={{ padding: "2%" }}>
          <Col>
            <Title block style={{ margin: "0" }}>{title}</Title>
          </Col>
            <Col span={24}>
              <Title type={`${success ? "success" : "danger"}`} level={3}>{title} {"is"} {`${success ? "success!" : "failed!"}`}</Title>
              <Text level={3}>{content}</Text>
            </Col>
        </Row>
      </Modal>
    </>
  );
}
