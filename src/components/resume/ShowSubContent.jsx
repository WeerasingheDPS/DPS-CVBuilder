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
import moment from "moment";
const { Title, Text, Link } = Typography;

export default function ShowSubContent({ item }) {
  return (
    <>
      <Row >
        <Col span={24}>
          <Row className="show-sub-content-w" justify="space-between" gutter={[0,5]}>
            <Col span={17}>
              <Row>
                <Col span={24}>
                 {item.title &&
                  <Link href={item.link}>
                    <Text strong>
                      {item.title}
                    </Text>
                  </Link>}<br/>
                  {item.subTitle &&
                    <Text>
                    {item.subTitle}
                  </Text>}
                </Col>
              </Row>
            </Col>
            <Col span={7}>
              <Row justify="end">
                <Col span={24}>
                  <Row justify="end">
                    <Text style={{ textAlign: "right" }}>
                      <Space>
                        {item.startDate != null
                          ? (item.showStartYearOnly
                            ?(item.start===null?null:moment(new Date(item.startDate)).format("YYYY")) 
                            : (item.start===null?null:moment(new Date(item.startDate)).format("MMMM YYYY")))
                          : null}

                        {item.startDate != null && item.endDate != null|| item.present
                          ? "-"
                          : null}

                        {item.endDate != null || item.present
                          ? (item.present
                            ? "Present"
                            : (item.showEndYearOnly
                            ?(item.endDate===null?null:moment(new Date(item.endDate)).format("YYYY") )
                            :( item.endDate===null?null:moment(new Date(item.endDate)).format("MMMM YYYY"))))
                          : null}
                      </Space>
                    </Text>
                  </Row>
                </Col>                
                <Col span={24}>
                  <Row justify="end">
                    {item.city &&
                    <Text>
                      {item.city}
                    </Text>}
                     {
                    (<Text>
                    </Text>)}
                    {item.country &&
                     <Text>
                     {item.country}
                     </Text>}
                  </Row>
                </Col>
              </Row>
            </Col>
            {item.description &&
          <Col span={24} style={{ width: "500px !important" }}>
                  <div
                    className=" format-text-w"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Col>}
          </Row>
        </Col>
      </Row>
    </>
  );
}