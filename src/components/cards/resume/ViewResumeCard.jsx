import { Card, Col, Image, Row, Typography } from "antd";
import addDocs from "../../../assests/images/viewCV.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Title, Text, Link } = Typography;
export default function ViewResumeCard() {
    const navigate = useNavigate();
    const personalData = useSelector((state)=>state.resume.personalData);
  return (
    <>
      <Row style={{ cursor: "pointer" }} onClick={()=>navigate("/viewresume")}>
        <Card hoverable>
          <Col span={24}>
            <Image width={100} preview={false} src={personalData? personalData.profilePicture?personalData.profilePicture: addDocs : addDocs} />
          </Col>
          <Col span={24}>
            <span>View Resume</span>
          </Col>
        </Card>
      </Row>
    </>
  );
}
