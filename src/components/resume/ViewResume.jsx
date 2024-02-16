import { Button, Card, Col, Row, Typography, Collapse,Spin } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useEffect, useRef } from "react";
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
import GetResumeData from "../../api/getdata/getResumeData";
import { postData } from "../../api/apiProviderService";


const { Title, Text } = Typography;

export default function ViewResume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const mainContents = useSelector((state)=> state.resume.mainContents);
  const activeContent = useSelector((state)=>state.resume.activeContent);

  const loading = useSelector((state)=>state.models.loading);
  const viewEdit = useSelector((state) => state.models.viewEditDetails);
  const addContent = useSelector((state) => state.models.addContent);

  const personalData = useSelector((state) => state.resume.personalData);
  let hasResume = localStorage.getItem("HAS_RESUME");


  useEffect(() => {
    if(mainContents.length == 0 || personalData === null && hasResume){
      GetResumeData(dispatch);
    }
  }, []);

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

  const downloadPdf = async () => {
    const inputRef = document.getElementById("resume-id");
  

      html2canvas(inputRef).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        // Calculate the center position for the image on the PDF page
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        //const imgY = 30;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;
  
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      // pdf.addImage(imgData, 'JPEG', 0, 0, imgX, imgY);

        pdf.save('Resume.pdf');
      });
   
  };
  
  const downloadPdfs = async() =>{
     const inputRef = document.getElementById("resume-id");

  //  try{
  //   html2canvas(inputRef).then((canvas) =>{
  //     const imgData = canvas.toDataURL('image/png');
  //      const pdf = new jsPDF();
  //     const pdfWidth = pdf.internal.pageSize.getWidth;
  //     const pdfHeight = pdf.internal.pageSize.getHeight;
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgx = (pdfWidth - imgWidth * ratio) / 2;
  //     //const imgY = (pdfHeight - imgHeight * ratio) / 2;

  //     const imgy = 30;
  //     pdf.addImage(imgData, 'PNG', imgx, imgy, imgWidth * ratio, imgHeight * ratio);
  //     pdf.save('Resume.pdf');

  //   })
  //  }catch(e){
  //   console.log(e);
  //  }

    const sdata = {
      resume: document.getElementById("resume-id").innerHTML
    }
    const sendData = {
      url: `resume/download/1`,
      data: sdata
    }

    try{
      const response = await postData(sendData);
      console.log(response);

    }
    catch(e){
      console.log(e);
    }
    

  }

  return (
    <>
      <Spin spinning={loading}>
        
      <Row
      gutter={20}
        style={{
          overflow: "hidden",
          display: "flex",
          height: "80vh",
        }}
      >
        <Col
        xl={12}
        md={11}
        sm={16}
        xs={18}
          style={{
            overflowY: "scroll",
            flex: 1,
         //   height: "100%",
          
          }}
        >
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Row justify='end' gutter={20}>
                <Col>
                <Button 
                onClick={()=>navigate("/viewresumepage")}
                type="primary"
                size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                style={{borderRadius: '0'}}>
                View Resume
              </Button>
                </Col>
                <Col>
                <Button 
                onClick={downloadPdf}
                type="primary"
                size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                style={{borderRadius: '0'}}>
                Download Resume
              </Button>
                </Col>
              </Row>
              
            </Col>
            {!addContent && (
              <Col span={24}>
                {!viewEdit && (
                  <PersonDetailsEditView/>
                )}
                {viewEdit && (
                  <EditPersonalDetails/>
                )}
              </Col>
            )}
            {addContent && (
              <Col span={24}>
                <AddContent/>
              </Col>
            )}
            <Col span={24}>
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
        xl={12}
        md={13}
        sm={24}
            style={{
            //overflowY: "auto",
            height: "80vh",
            flex: 1,
            zIndex:2
          }}>
          <EditingResume ref={pdfRef}/>
        </Col>
      </Row>
      </Spin>
    </>
  );
}