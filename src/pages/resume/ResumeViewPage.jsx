import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Divider,
  Image,
  Button,
  Space,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { FiMapPin, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowContent from "../../components/resume/ShowContent";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const ResumeViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pdfRef = useRef();
  const personalData = useSelector((state) => state.resume.personalData);
  const mainContents = useSelector((state) => state.resume.mainContents);
  return (
    <>
      <Row justify="center" align="middle" style={{ padding: "5% 0" }}>
        <Col span={24} id="resumeData">
          <Row justify="space-between">
            <Col span={18}>
              <Row gutter={[20, 10]}>
                {personalData.name && (
                  <Col span={24}>
                    <Title level={2} style={{ margin: "0" }}>
                      {personalData.name}
                    </Title>
                  </Col>
                )}
                {personalData.jobTitle && (
                  <Col span={24}>
                    <Title level={4} style={{ margin: "0" }}>
                      {personalData.jobTitle}
                    </Title>
                  </Col>
                )}
                {personalData.email && (
                  <Col>
                    <Text>
                      <MailOutlined style={{ marginRight: "7px" }} />
                      {personalData.email}
                    </Text>
                  </Col>
                )}
                {personalData.phone && (
                  <Col>
                    <Text>
                      <PhoneOutlined style={{ marginRight: "7px" }} />
                      {personalData.phone}
                    </Text>
                  </Col>
                )}
                {personalData.address && (
                  <Col>
                    <Text>
                      <FiMapPin style={{ marginRight: "7px" }} />
                      {personalData.address}
                    </Text>
                  </Col>
                )}
                {personalData.linkedInLabel && (
                  <Col>
                    <Link href={personalData.linkedIn} target="_blank">
                      <Text>
                        <LinkedinOutlined style={{ marginRight: "7px" }} />
                        {personalData.linkedInLabel}
                      </Text>
                    </Link>
                  </Col>
                )}
                {personalData.githubLabel && (
                  <Col>
                    <Link href={personalData.github} target="_blank">
                      <Text>
                        <GithubOutlined style={{ marginRight: "5px" }} />
                        {personalData.githubLabel}
                      </Text>
                    </Link>
                  </Col>
                )}
              </Row>
            </Col>

            {personalData.profilePicture && (
              <Col>
                <Image
                  src={personalData.profilePicture}
                  alt="Profile_Picture"
                  style={{
                    borderRadius: "50%",
                    width: "175px",
                    height: "150px",
                  }}
                />
              </Col>
            )}
          </Row>
          {mainContents != null && mainContents.map((items) => {
              return(
                <>
                <ShowContent item = {items}/>
                </>
              )
            })}
        </Col>
      </Row>
    </>
  );
};

export default ResumeViewPage;
