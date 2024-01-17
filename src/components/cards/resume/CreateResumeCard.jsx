import { Card, Col, Image, Row, Typography } from "antd";
import addDoc from "../../../assests/images/CREATECV.png";
import { useNavigate } from "react-router-dom";
const { Title, Text, Link } = Typography;
export default function CreateResumeCard() {
    const navigate = useNavigate();
  return (
    <>
      <Row style={{ cursor: "pointer" }} onClick={()=>navigate("/createresume")}>
        <Card hoverable>
          <Col span={24}>
            <Image width={100} preview={false} src={addDoc} />
          </Col>
          <Col span={24}>
            <span>Create Resume</span>
          </Col>
        </Card>
      </Row>
    </>
  );
}
