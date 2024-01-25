import { useEffect, useState } from "react";
import { Col, Image, Row, Spin, Typography } from "antd";
import CreateResumeCard from '../../components/cards/resume/CreateResumeCard';
import ViewResumeCard from '../../components/cards/resume/ViewResumeCard';
import { closeLoading, openLoading } from "../../store/models/modelsSlice";
import { setHasCv, setMainContents, setPersonalData } from "../../store/resume/resumeSclice";
import { getData } from "../../api/apiProviderService";
import { useDispatch, useSelector } from "react-redux";
import GetResumeData from "../../api/getdata/getResumeData";
const { Title, Text, Link } = Typography;

export default function ShowResumePage() {

  const loading = useSelector((state)=>state.models.loading);
  const dispatch = useDispatch();
      useEffect(() => {
      GetResumeData(dispatch);
  }, []);
  let hasResume = localStorage.getItem("HAS_RESUME");
  return (
    <>
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Title level={3} style={{ marginTop: "0", marginBottom: "10px" }}>
                RESUME
              </Title>
              <hr style={{ border: "2px solid rgba(0,0,0,.4)" }} />
            </Col>
            {!hasResume ? (
              <Col span={24}>
                <CreateResumeCard />
              </Col>
            ) : (
              <Col span={24}>
                <ViewResumeCard />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      </Spin>
    </>
  );
}

