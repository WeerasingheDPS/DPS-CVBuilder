import { Button, Col, Image, Row, Space } from "antd";
import { RightCircleFilled, LogoutOutlined } from "@ant-design/icons";
import logo from "../../assests/images/CVBuilderLogo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
   const navigate = useNavigate();
   const isLogin = localStorage.getItem("IS_LOGGED_IN") == null ? false : localStorage.getItem("IS_LOGGED_IN");
  return (
    <>
      <Row className="nav-bar-main-w"
      >
        <Col span={24}>
          <Row justify="center">
            <Col span={20}>
              <Row justify="space-between" align="middle">
                <Col  md={8} sm={9} xs={8}> 
                  <Image src={logo} preview={false} />
                </Col>
                <Col>
                  <Space>
                    {!isLogin && (
                        <>
                         <Button
                          onClick={()=>navigate("/signup")}
                          className="navbar-getstart-button"
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
                      shape="round"
                      size="large"
                      className="navbar-login-button"
                      onClick={()=>navigate("/login")}
                    >
                      <span style={{ fontWeight: "700" }}>
                        Login <LogoutOutlined />
                      </span>
                    </Button>
                        </>
                     )}

                    {isLogin && (
                      <Button
                        className="navbar-login-button"
                        shape="round"
                        size="large"
                        onClick={()=>{localStorage.clear(); window.location.href="/"}}
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
