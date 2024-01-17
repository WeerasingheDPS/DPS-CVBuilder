import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Space,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Form,
  message,

} from "antd";
import moment from 'moment';
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from 'dayjs';
import {
  CameraOutlined,
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  UploadOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { AiOutlineLink } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAddContent,
  closeAddLink,
  closeLoading,
  openAddLink,
  openLoading,
} from "../../store/models/modelsSlice";
import { setMainContents, settitleForList } from "../../store/resume/resumeSclice";
import { postData } from "../../api/apiProviderService";
import {months} from "../../store/demo/months";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function AddContent() {
  const activeLink = useSelector((state) => state.models.addLink);
  const dispatch = useDispatch();
  const [isProfile, setIsProfile] = useState(false);


 

  const mainContents = useSelector((state)=>state.resume.mainContents);
  const activeContent = useSelector((state)=>state.resume.activeContent);


  const getValueById = (field, index, key) => {
    const conData = [...mainContents];
    let foundValue = null;
  
    conData.some((outerItem) => {
      if (outerItem.contentId === index) {
        const innerItem = outerItem.subContents.find((item) => item.subContentId === key);
  
        if (innerItem) {
          foundValue = innerItem[field];
          return true; // Stop the iteration once the inner item is found
        }
      }
  
      return false;
    });
  
    return foundValue;
  };


  const startDateValue = getValueById("startDate", activeContent.index, activeContent.key);
  const endDateValue = getValueById("endDate", activeContent.index, activeContent.key);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    if (activeContent.title === "Profile") {
      setIsProfile(true);
    }

  }, []);

  const updateValue = (index, key, field, data) => {
    let conData = [...mainContents];
    return conData.map((outerItem) => {
      if (outerItem.contentId === index) {
        // If the outer item ID matches, update the inner subContents
        return {
          ...outerItem,
          subContents: outerItem.subContents.map((innerItem) => {
            if (innerItem.subContentId === key) {
              // If the inner item subId matches, update the name
              return { ...innerItem, [field]: data };
            }
            return innerItem;
          }),
        };
      }
      return outerItem;
    });
  }

  const handleTitle = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "title", e.target.value);
    dispatch(setMainContents(updatedList));
  };

  const handleSubTitle = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "subTitle", e.target.value);
    dispatch(setMainContents(updatedList));
  };

  const handleCity = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "city", e.target.value);
    dispatch(setMainContents(updatedList));
  };

  const handleCountry = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "country", e.target.value);
    dispatch(setMainContents(updatedList));
  };

  const handleDescription = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "description", e.target.value);
    dispatch(setMainContents(updatedList));
  };

  const handleStartMonth = (date) => {

    let currentDateTime = null;
    if(getValueById("startDate", activeContent.index, activeContent.key) === null){
      currentDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    }else{
      currentDateTime = date != null ? moment(getValueById("startDate", activeContent.index, activeContent.key)).set({
        month: date.month()
       }).format('YYYY-MM-DD HH:mm:ss') : null;
    }

    let updatedList = updateValue(activeContent.index, activeContent.key, "startDate", new Date(currentDateTime));
    dispatch(setMainContents(updatedList));
  };

  const handleStartYear = (date) => {
    console.log(date);
    let currentDateTime = null;
    if(getValueById("startDate", activeContent.index, activeContent.key) === null){
      currentDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    }else{
      currentDateTime = date != null ? moment(getValueById("startDate", activeContent.index, activeContent.key)).set({
       year: date.year()
      }).format('YYYY-MM-DD HH:mm:ss') : null;
    }

    let updatedList = updateValue(activeContent.index, activeContent.key, "startDate", new Date(currentDateTime));
    dispatch(setMainContents(updatedList));
};

  const handleStartYearOnly = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "showStartYearOnly", e.target.checked);
    dispatch(setMainContents(updatedList));
  };

  const handleEndMonth = (date) => {
    let currentDateTime = null;
    if(getValueById("endDate", activeContent.index, activeContent.key) === null){
      currentDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    }else{
      currentDateTime = date != null ? moment(getValueById("endDate", activeContent.index, activeContent.key)).set({
        month: date.month()
       }).format('YYYY-MM-DD HH:mm:ss') : null;
    }
    let updatedList = updateValue(activeContent.index, activeContent.key, "endDate", new Date(currentDateTime));
    dispatch(setMainContents(updatedList));
  };

  const handleEndYear = (date) => {
    let currentDateTime = null;
    if(getValueById("endDate", activeContent.index, activeContent.key) === null){
      currentDateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    }else{
      currentDateTime = date != null ? moment(getValueById("endDate", activeContent.index, activeContent.key)).set({
       year: date.year()
      }).format('YYYY-MM-DD HH:mm:ss') : null;
    }

    let updatedList = updateValue(activeContent.index, activeContent.key, "endDate", new Date(currentDateTime));
    dispatch(setMainContents(updatedList));
  };

  const handleEndYearOnly = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "showEndYearOnly", e.target.checked);
    dispatch(setMainContents(updatedList));
  };

  const handlePresent = (e) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "present", e.target.checked);
    dispatch(setMainContents(updatedList));
    };

  const handleHtml = (html) => {
    let updatedList = updateValue(activeContent.index, activeContent.key, "description", html);
    dispatch(setMainContents(updatedList));
  };
  const userId = 2;
  const handleSubmit = async() =>{
    dispatch(openLoading());
    let data = {
      url: `resume/main_contents/${userId}`,
      data: mainContents,
    };
    try {
      const response = await postData(data);
      if (response.status === 201) {
        message.success("Succesfully updated");
        dispatch(closeLoading());
        dispatch(closeAddContent());
        //dispatch(setContentData(addContentData.contentData));
      } else {
        message.error("Invalid Data!Try Again!");
        dispatch(closeLoading());
        dispatch(closeAddContent());
      }
    } catch (e) {
      console.log(e);
      message.error(e.message);
      dispatch(closeLoading());
      dispatch(closeAddContent())
    }
  }
  const handleDelete = () =>{
    let conData = [...mainContents];
    let updatedList = [];

    if(conData.find(item=> item.contentId === activeContent.index).subContents.length === 1 ){
      console.log("length = 0")
      updatedList =  conData.filter((outerItem) => outerItem.contentId !== activeContent.index)
    }
      else{
      updatedList =  conData.map((outerItem) => {
        if (outerItem.contentId === activeContent.index) {
          // If the outer item ID matches, filter out the specified sub-item
          return {
            ...outerItem,
            subContents: outerItem.subContents.filter((innerItem) => innerItem.subContentId !== activeContent.key),
          };
        }
    
        return outerItem;
      });
    }
    dispatch(setMainContents(updatedList));
    dispatch(closeAddContent());
  }

 



  const InputLink = () => {
    let conData = [...mainContents];
    const [value, setValue] = useState(getValueById("link", activeContent.index, activeContent.key));
    const handleAddLink = () => {
      const updatedList = conData.map((outerItem) => {
        if (outerItem.contentId === activeContent.index) {
          // If the outer item ID matches, update the inner subContents
          return {
            ...outerItem,
            subContents: outerItem.subContents.map((innerItem) => {
              if (innerItem.subContentId === activeContent.key) {
                // If the inner item subId matches, update the name
                return { ...innerItem, link: value};
              }
              return innerItem;
            }),
          };
        }
        return outerItem;
      });
      dispatch(setMainContents(updatedList));
      dispatch(closeAddLink());
    };
    return (
      <Row
        style={{
          padding: "5%",
          position: "absolute",
          backgroundColor: "white",
          boxShadow: "0 0 20px rgba(0,0,0,.2)",
          zIndex: "5",
        }}
      >
        
        <Col span={24}>
          <Row gutter={[20, 20]} justify="end">
            <Col span={24}>
              <Title level={5} style={{ margin: "0" }}>
                Link URL
              </Title>
            </Col>
            <Col span={24}>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input-w"
                placeholder="Enter Link"
              />
            </Col>
            <Col>
              <Space>
                <Button
                  size="small"
                  type="primary"
                  style={{ borderRadius: "0" }}
                  onClick={() => dispatch(closeAddLink())}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddLink}
                  size="small"
                  type="primary"
                  style={{ borderRadius: "0" }}
                >
                  Add
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Row className="add-content-w">
        <Col span={24}>
          <Form onFinish={handleSubmit}>
          <Card
            title={
              <Text style={{ fontSize: "22px", fontWeight: "800" }}>
                Create {activeContent.title}
              </Text>
            }
            style={{ boxShadow: "0 0 30px rgba(0,0,0,.1)", padding: "3% 0" }}
            hoverable
          >
            {isProfile && (
              <Row>
                <Col span={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Description{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      {" "}
                    </Text>
                  </Title>
                  <TextArea
                    value={getValueById("description", activeContent.index, activeContent.key)}
                    onChange={(e) => handleDescription(e)}
                    allowClear
                    rows={4}
                    style={{
                      boxShadow: "0 0 8px 0 rgba(0,0,0,.05)",
                      borderRadius: "0",
                    }}
                  />
                </Col>
              </Row>
            )}
            {!isProfile && (
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Row gutter={10} align="bottom">
                    <Col span={18}>
                      <Title level={5} style={{ marginTop: 0 }}>
                        Title{" "}
                        <Text
                          style={{
                            color: "rgba(0,0,0,.5)",
                            fontSize: "14px",
                            fontWeight: "300",
                          }}
                        >
                          optional
                        </Text>
                      </Title>
                      {activeLink && <InputLink />}
                      <Input
                        value={getValueById("title", activeContent.index, activeContent.key)}
                        className="input-w"
                        size="large"
                        placeholder="Enter title"
                        onChange={(e) => handleTitle(e)}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        onClick={() => {
                          dispatch(openAddLink());
                        }}
                        size="large"
                        icon={<AiOutlineLink />}
                      >
                        Link
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Subtitle{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <Input
                    onChange={(e) => handleSubTitle(e)}
                    value={getValueById("subTitle", activeContent.index, activeContent.key)}
                    className="input-w"
                    size="large"
                    placeholder="Enter SubTitle"
                  />
                </Col>
                <Col span={12}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    City{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <Input
                   value={getValueById("city", activeContent.index, activeContent.key)}
                    onChange={(e) => handleCity(e)}
                    className="input-w"
                    size="large"
                    placeholder="Enter your job title"
                  />
                </Col>
                <Col span={12}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Country{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <Input
                    value={getValueById("country", activeContent.index, activeContent.key)}
                    onChange={(e) => handleCountry(e)}
                    className="input-w"
                    size="large"
                    placeholder="Enter your job title"
                  />
                </Col>
                <Col span={12}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Start Date{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <Row gutter={[5,15]}>
                  <Col span={10}>
                      <DatePicker
                    value={ startDateValue == null ? null : dayjs(startDateValue)}
                    onChange={handleStartYear}
                        size="large"
                        format="YYYY"
                        className="input-w"
                        placeholder="Year"
                        picker="year"
                      />
                    </Col>
                    <Col span={14}>
                    <DatePicker 
                    size="large" 
                    placeholder="Month" 
                    className="input-w" 
                    picker="month"
                    allowClear
                    onChange={handleStartMonth}
                    format={"MMMM"}
                    value={ startDateValue == null ? null : dayjs(startDateValue)}
                     />
                      {/* <Select
                      value={getValueById("startDate", activeContent.index, activeContent.key) === null ? null : (moment(getValueById("startDate", activeContent.index, activeContent.key)).month() === 0 ? 12 :moment(getValueById("startDate", activeContent.index, activeContent.key)).month()) }
                      size="large"
                        className="select-month-w"
                        placeholder="Month"
                        onChange={handleStartMonth}
                        options={months}
                        allowClear
                        maxTagCount={5}
                      /> */}
                    </Col>

                   
                    <Col span={24}>
                    <Checkbox
                        checked={getValueById("showStartYearOnly", activeContent.index, activeContent.key)}
                        onChange={handleStartYearOnly}>
                        <Text style={{fontSize: '16px', fontWeight:' 500'}}>
                          Only Year
                        </Text>
                      </Checkbox>                   
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    End Date{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <Row gutter={[5,15]}>
                  <Col span={10}>
                      <DatePicker
                   value={ endDateValue == null ? null : dayjs(endDateValue)}
                    size="large"
                        className="input-w"
                        placeholder="Year"
                        format="YYYY"
                        picker="year"
                        onChange={handleEndYear}
                      />
                    </Col>
                    
                    <Col span={14}>

                    <DatePicker 
                    size="large" 
                    placeholder="Month" 
                    className="input-w" 
                    picker="month"
                    allowClear
                    onChange={handleEndMonth}
                    format={"MMMM"}
                    value={ endDateValue == null ? null : dayjs(endDateValue)}

                     />
                      {/* <Select
                      value={getValueById("endDate", activeContent.index, activeContent.key) === null ? null : (moment(getValueById("endDate", activeContent.index, activeContent.key)).month() === 0 ? 12 :moment(getValueById("endDate", activeContent.index, activeContent.key)).month() ) }
                      size="large"
                        className="select-month-w"
                        placeholder="Month"
                        onChange={handleEndMonth}
                        options={months}
                        maxTagCount={5}
                        allowClear
                      /> */}
                    </Col>

                    
                    <Col span={24}>
                    <Checkbox
                        checked={getValueById("showEndYearOnly", activeContent.index, activeContent.key)}
                        onChange={handleEndYearOnly}>
                        <Text style={{fontSize: '16px', fontWeight:' 500'}}>
                          Only Year
                        </Text>
                      </Checkbox>                   
                    </Col>
                    <Col span={24}>
                    <Checkbox
                         checked={getValueById("present", activeContent.index, activeContent.key)}
                        onChange={handlePresent}>
                        <Text style={{fontSize: '16px', fontWeight:' 500'}}>
                          Present{" "}
                          <Text
                      style={{
                        color: "rgba(0,0,0,.6)",
                        fontSize: "15px",
                        fontWeight: "300",
                      }}
                    >
                     (current)
                    </Text>
                        </Text>
                      </Checkbox>                   
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Title level={5} style={{ marginTop: 0 }}>
                    Description{" "}
                    <Text
                      style={{
                        color: "rgba(0,0,0,.5)",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      optional
                    </Text>
                  </Title>
                  <ReactQuill
                  style={{ wordWrap: 'break-word',width:'100%'}}
                    theme="snow"
                    value={getValueById("description", activeContent.index, activeContent.key)}
                    onChange={handleHtml}
                  />
                </Col>
              </Row>
            )}
            <Row justify='space-between' style={{ marginTop: "5%" }}>
              <Col>
              <Button 
                onClick={handleDelete}
                icon={<DeleteOutlined />}
                style={{ borderRadius: "0", color: 'red' }}
                size="large">
                Delete
              </Button>
              </Col>
              <Col>
                <Row justify="end" gutter={20}>
                  <Col>
                    <Button
                      style={{ borderRadius: "0" }}
                      size="large"
                      onClick={()=> dispatch(closeAddContent())}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      htmlType="submit"
                      style={{ borderRadius: "0" }}
                      icon={<CheckOutlined />}
                      type="primary"
                      size="large"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
}