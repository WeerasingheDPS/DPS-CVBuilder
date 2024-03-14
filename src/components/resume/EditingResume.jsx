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
          transform: "scale(.95)",
          transformOrigin: "top left",
         // width: "800px",
        }}
      >
        <Col span={24}
        // xs={12} sm={14} md={16} lg={20} xl={22} xxl={24}
        >
     <ResumeViewPage/>
        </Col>
      </Row>
    </>
  );
};

export default EditingResume;

