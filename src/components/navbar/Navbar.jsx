import { Button, Col, Image, Row, Space } from "antd";
import { RightCircleFilled, LogoutOutlined } from "@ant-design/icons";
import logo from "../../assests/images/CVBuilderLogo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ status }) {
   const navigate = useNavigate();
  return (
    <>
      <Row
        style={{
          backgroundColor: "#F0EEEB",
          minHeight: "15vh",
          flexDirection: "column",
          position: "sticky",
          top: "0vh",
          left: "0",
          overflow: "auto",
          scrollbarWidth: "0",
        }}
      >
        <Col span={24}>
          <Row justify="center" style={{ padding: "1%" }}>
            <Col span={18}>
              <Row justify="space-between" align="middle">
                <Col span={5}>
                  <Image src={logo} preview={false} />
                </Col>
                <Col>
                  <Space>
                    {status && (
                        <>
                         <Button
                         onClick={()=>navigate("/signup")}
                        style={{
                          color: "rgba(255, 116, 0, 1)",
                          border: "4px solid rgba(0,0,0,.05)",
                          height: "45px",
                        }}
                        shape="round"
                        size="large"
                      >
                        <span
                          style={{
                            color: "rgba(0, 0, 0, 1)",
                            fontWeight: "700",
                          }}
                        >
                          Get Started
                        </span>
                        <RightCircleFilled />
                      </Button>
                    
                    <Button
                      style={{
                        backgroundColor: "rgb(32,14,50)",
                        color: "#FFF",
                      }}
                      shape="round"
                      size="large"
                      onClick={()=>navigate("/login")}
                    >
                      <span style={{ fontWeight: "700" }}>
                        Login <LogoutOutlined />
                      </span>
                    </Button>
                        </>
                     )}

                    {!status && (
                      <Button
                        style={{
                          backgroundColor: "rgb(32,14,50)",
                          color: "#FFF",
                        }}
                        shape="round"
                        size="large"
                      >
                        <span style={{ fontWeight: "700" }}>
                          Logout <LogoutOutlined />
                        </span>
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
