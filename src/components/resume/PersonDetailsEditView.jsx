import { Button, Card, Col, Row, Space, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { FiMapPin, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openViewEditDetails } from "../../store/models/modelsSlice";
const { Title, Text, Link } = Typography;

export default function PersonDetailsEditView() {
  const dispatch = useDispatch();
  const personalData = useSelector((state)=>state.resume.personalData);
  return (
    <>
      <Row 
        className="personal-details-edit-view-w"
        onClick={() => dispatch(openViewEditDetails())}>
        <Col span={24}>
          <Card
            hoverable
            style={{
              boxShadow: "0 0 20px rgba(0,0,0,.1)",
              borderRadius: "20px",
            }}
          >
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Row justify="space-between">
                  <Text
                    className={personalData.name === null ? "hasnot-name-w":"has-name-w"} 
                  >
                    {personalData.name === null
                      ? "Your Name"
                      : personalData.name}
                  </Text>
                  <Button 
                    size="large"
                    icon={<FiEdit />}
                    onClick={() => dispatch(openViewEditDetails())}
                    style={{
                        borderRadius: '0',
                        border: '1px solid rgba(25,103,210,1)'}} />
                </Row>
              </Col>
              <Col span={24}>
                <Text
                  className={personalData.email === null ? "hasnot-content-w":"has-content-w"} 
                >
                  <Space>
                    <MailOutlined />
                    {personalData.email === null
                      ? "Email"
                      : personalData.email}
                  </Space>
                </Text>
              </Col>
              <Col span={24}>
                <Text
                  className={personalData.phone === null ? "hasnot-content-w":"has-content-w"}
                >
                  <Space>
                    <PhoneOutlined />
                    {personalData.phone === null
                      ? "Phone"
                      : personalData.phone}
                  </Space>
                </Text>
              </Col>
              <Col span={24}>
                <Text
                  className={personalData.address=== null ?"hasnot-content-w":"has-content-w"}
                >
                  <Space>
                    <FiMapPin />
                    {personalData.address === null
                      ? "Address"
                      : personalData.address}
                  </Space>
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}