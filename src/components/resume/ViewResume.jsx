import { Button, Card, Col, Row, Typography, Collapse,Spin, message } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useEffect, useRef } from "react";
import EditPersonalDetails from "./EditPersonalDetails";
import PersonDetailsEditView from "./PersonDetailsEditView";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoading,
  openAddContent,
  openCustomContent,
  openLoading,
  openViewEditDetails,
} from "../../store/models/modelsSlice";
import CustomContentModel from "./CustomContentModel";
import AddContent from "./AddContent";
import { useNavigate } from "react-router-dom";
import { setActiveContent, setMainContents } from "../../store/resume/resumeSclice";
import EditingResume from "./EditingResume";
import ResumeViewPage from "../../pages/resume/ResumeViewPage";
import GetResumeData from "../../api/getdata/getResumeData";
import { downloadPdfFromFireBase, postData, processDownloadResume } from "../../api/apiProviderService";
import { saveAs } from "file-saver";
import { downloadResume } from "../../api/resume/resumeService";


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

  const userId = localStorage.getItem("USER_ID");


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

  const downloadPdfsssss = async () => {
    const inputRef = document.getElementById("resume-id");

    // Configure html2canvas to capture the whole document with proper styles
    html2canvas(inputRef, {
        scale: 2, // Increase scale to improve resolution
        useCORS: true, // Enable cross-origin resource sharing
        scrollY: -window.scrollY, // Capture the whole document, not just the visible part
        scrollX: -window.scrollX
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        // Calculate the center position for the image on the PDF page
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('Resume.pdf');
    });
};


  // const downloadPdf = async () => {
  //   const inputRef = document.getElementById("resume-id");
  

  //     html2canvas(inputRef).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF("p", "pt", "a4");
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();
  //       const imgWidth = canvas.width;
  //       const imgHeight = canvas.height;
  //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
  //       // Calculate the center position for the image on the PDF page
  //       const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //       //const imgY = 30;
  //       const imgY = (pdfHeight - imgHeight * ratio) / 2;
  
  //       pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  //     // pdf.addImage(imgData, 'JPEG', 0, 0, imgX, imgY);

  //       pdf.save('Resume.pdf');
  //     });
   
  // };
  
  const downloadPdf = async() =>{
    dispatch(openLoading());
    const resume = {
      userId,
      personalData,
      mainContents
    }

    const data = {
      url: `resume/download/${userId}`, 
      data: resume
    }

    try{

      // const downUrl = "https://firebasestorage.googleapis.com/v0/b/dps-cv-builder-01.appspot.com/o/dps-cv-builder%2FDULANJANA-WEERASINGHE-FlowCV-Resume-20240307.pdf?alt=media&token=a851b663-27a5-4595-876a-17e8e219af7d";
      // const down = downloadPdfFromFireBase(downUrl);
       const response = await processDownloadResume(data);
      // console.log(down);
      if(response.data.success){
        const bytesArray = response.data.result;
        const fileName = `${(personalData.name != null ? personalData.name : "resume") + ".pdf"}`;
        downloadResume(bytesArray, fileName);
        dispatch(closeLoading());
    }
  }catch(e){
      console.log(e.message)
      message.error("Error download resume! Try again later.");
      dispatch(closeLoading());
    }
  }

  return (
    <>
      <Spin spinning={loading}>
        
      <Row
     // gutter={20}
        style={{
          overflow: "hidden",
          display: "flex",
          height: "90%",
        }}
      >
        <Col
        //span={12}
        xl={12}
        md={10}
        sm={24}
        xs={18}
          // style={{
          //   overflowY: "auto",
          //   flex: 1,
          //  height: "100%",
          
          // }}
        >
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Row justify='end' gutter={10}>
                <Col>
                <Button 
                onClick={()=>navigate("/viewresumepage")}
                type="primary"
                size={{ xs: 'smaller', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
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
        //span={12}
        xl={12}
        md={14}
        sm={24}
          //   style={{
          //   overflowY: "auto",
          //   height: "100%",
          //   flex: 1,
          //   zIndex:2
          // }}
          >
          <EditingResume ref={pdfRef}/>
        </Col>
      </Row>
      </Spin>
    </>
  );
}