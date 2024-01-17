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
import ShowSubContent from "./ShowSubContent";
const { Title, Text, Link } = Typography;
export default function ShowContent({item}) {
  if (item.contentTitle === "Profile") {
      return (
        <>
          <Row justify="space-between" gutter={[15, 15]}>
            <Col span={24}>
              <Title level={3}>{item.contentTitle}</Title>
              <hr style={{ border: "2px solid rgba(0,0,0,.6)" }} />
              {item.subContents &&
                <Text>{item.subContents[0].description}</Text>}
            </Col>
          </Row>
        </>
      );
  } else {
    {
      if (item != null) {
        return (
          <>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <Row justify="space-between" gutter={[15, 15]}>
                      <Col span={24}>
                        {item.contentTitle &&
                          <Title level={3}>{item.contentTitle}</Title>}
                        <hr style={{ border: "2px solid rgba(0,0,0,.6)", margin:'0' }}  />
                      </Col>
                      <Col span={24}>
                        {item.subContents &&
                          item.subContents.map((item) => {
                            return <ShowSubContent item={item} />;
                          })}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        );
      }
    }
  }
}