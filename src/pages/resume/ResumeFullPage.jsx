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
        <Col style={{padding: "3%", boxShadow: "0px 0px 5px  rgba(0,0,0,.2)", minHeight: "90vh"}} span={18}>
          <ResumeViewPage/>
        </Col>
      </Row>
    </>
  );
};

export default ResumeFullPage;
