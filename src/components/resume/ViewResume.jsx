import { Button, Card, Col, Row, Typography, Collapse,Spin } from "antd";
import { useState, useEffect } from "react";
import EditPersonalDetails from "./EditPersonalDetails";
import PersonDetailsEditView from "./PersonDetailsEditView";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddContent,
  openCustomContent,
  openViewEditDetails,
} from "../../store/models/modelsSlice";
import CustomContentModel from "./CustomContentModel";
import AddContent from "./AddContent";
import { useNavigate } from "react-router-dom";
import { setActiveContent, setMainContents } from "../../store/resume/resumeSclice";
import EditingResume from "./EditingResume";
import ResumeViewPage from "../../pages/resume/ResumeViewPage";


const { Title, Text } = Typography;

export default function ViewResume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainContents = useSelector((state)=> state.resume.mainContents);
  const activeContent = useSelector((state)=>state.resume.activeContent);

  const loading = useSelector((state)=>state.models.loading);
  const viewEdit = useSelector((state) => state.models.viewEditDetails);
  const addContent = useSelector((state) => state.models.addContent);

  const handleContent = (data) => {
    dispatch(setActiveContent(data))
    dispatch(openAddContent());
  };

  const addNewSubContent = (data) => {
    let conData = [...mainContents];
    let subContent = {
          subContentId:data.key,
          title: null,
          link:null,
          subTitle: null,
          city: null,
          country: null,
          startDate:null,
          endDate:null,
          showStartYearOnly:true,
          showEndYearOnly:true,
          present: false,
          description: null
    }
    const updatedList = conData.map((outerItem) => {
        if (outerItem.contentId === data.index) {
          console.log("IN-D")
          // If the outer item ID matches, add new data to the inner subContents
          return {
            ...outerItem,
            subContents: [...outerItem.subContents, subContent],
          };
        }
        return outerItem;
      });
      dispatch(setMainContents(updatedList));
      handleContent(data);
  };

  return (
    <>
      <Spin spinning={loading}>
      <Row
        style={{
          overflow: "hidden",
          display: "flex",
          height: "80vh",
        }}
      >

        <Col
          span={12}
          style={{
            overflowY: "scroll",
            flex: 1,
            height: "100%",
          }}
        >
          <Row gutter={[20, 20]}>
            <Col span={22}>
              <Row justify='end' gutter={20}>
                <Col>
                <Button 
                onClick={()=>navigate("/viewresume")}
                type="primary"
                size="large"
                style={{borderRadius: '0'}}>
                View Resume
              </Button>
                </Col>
              </Row>
              
            </Col>
            {!addContent && (
              <Col span={22}>
                {!viewEdit && (
                  <PersonDetailsEditView/>
                )}
                {viewEdit && (
                  <EditPersonalDetails/>
                )}
              </Col>
            )}
            {addContent && (
              <Col span={22}>
                <AddContent/>
              </Col>
            )}
            <Col span={22}>
              {!addContent && (
                <Row justify="center" gutter={[0, 15]}>
                  { mainContents &&
                  mainContents.map((mainItem, index) => {
                    let subTitle = mainItem.contentTitle;
                    if(mainItem != null){
                      return (
                        <Col span={24}>
                          <Row justify="center">
                            <Col span={24}>
                              <Collapse
                                style={{
                                  boxShadow: "0 0 30px rgba(0,0,0,.1)",
                                  borderRadius: "20px",
                                  cursor: "pointer",
                                }}
                                ghost
                                collapsible="header"
                                expandIconPosition="end"
                                //defaultActiveKey={["1"]}
                                items={[
                                  {
                                    key: "1",
                                    label: (
                                      <Row justify="center">
                                        <Col
                                          style={{
                                            boxShadow: "0 0 30px rgba(0,0,0,.1)",
                                            cursor: "pointer",
                                            borderRadius: "50px",
                                          }}
                                        >
                                          <Text
                                            style={{
                                              margin: "20px 40px",
                                              fontSize: "25px",
                                              fontWeight: "800",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {mainItem.contentTitle}
                                          </Text>
                                        </Col>
                                      </Row>
                                    ),
                                    children: (
                                      <>
                                        <Row gutter={[20, 20]}>

                                          {mainItem.subContents.length === 0 ? null :
                                          mainItem.subContents.map((subItem) => {
                                          const  data = {
                                              index:mainItem.contentId,
                                              key:subItem.subContentId,
                                              title: subTitle,
                                            };
                                            return (
                                              <>
                                                {subItem != null &&
                                                  <Col
                                                  span={24}
                                                  onClick={()=>
                                                    handleContent(data)
                                                  }
                                                >
                                                  <Text
                                                    style={{
                                                      margin: "0",
                                                      fontSize: "22px",
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    {subItem.title === null
                                                      ? subTitle
                                                      : subItem.title}
                                                  </Text>
                                                </Col>}
                                              </>
                                            );
                                          })}
                                         <Col span={24}>
                                            <Row justify="center">
                                              <Button
                                                onClick={() =>
                                                  { const data ={
                                                    index: mainItem.contentId,
                                                    key: mainItem.subContents.length,
                                                    title: subTitle
                                                  }
                                                  addNewSubContent(data)
                                                  }
                                                }
                                                style={{ borderRadius: "0" }}
                                                type="primary"
                                                size="large"
                                              >
                                                + Add {mainItem.contentTitle}
                                              </Button>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </>
                                    ),
                                  },
                                ]}
                              />
                            </Col>
                          </Row>
                        </Col>
                      );
                    }
                  })}
                  {!viewEdit && (
                    <Button
                      onClick={() => dispatch(openCustomContent())}
                      size="large"
                      type="primary"
                      style={{
                        color: "white",
                        height: "50px",
                        width: "300px",
                        borderRadius: "0",
                      }}
                    >
                      + Add Content
                    </Button>
                  )}
                </Row>
              )}
              <CustomContentModel/>
            </Col>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            overflowY: "auto",
            height: "80vh",
            flex: 1,
          }}>
          <EditingResume/>
        </Col>
      </Row>
      </Spin>
    </>
  );
}