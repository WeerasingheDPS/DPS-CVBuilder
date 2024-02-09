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
import ResumeViewPage from "./ResumeViewPage";


const ResumeFullPage = () => {
  return (
    <>
      <Row justify="center">
        <Col span={16}>
          <ResumeViewPage/>
        </Col>
      </Row>
    </>
  );
};

export default ResumeFullPage;
