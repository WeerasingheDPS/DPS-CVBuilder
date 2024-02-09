import React, { useState } from "react";
import { Layout, Row, Col, Typography, Divider, Image, Button, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { FiMapPin, FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import ResumeViewPage from "../../pages/resume/ResumeViewPage";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const EditingResume = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{
          padding: "10px",
          transform: "scale(.75)",
          transformOrigin: "top left",
          width: "800px",
        }}
      >
        <Col span={22}>
     <ResumeViewPage/>
        </Col>
      </Row>
    </>
  );
};

export default EditingResume;

