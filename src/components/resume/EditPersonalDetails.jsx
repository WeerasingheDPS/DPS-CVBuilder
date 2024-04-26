import {
  Card,
  Col,
  Input,
  Row,
  Typography,
  Upload,
  Image,
  Modal,
  Space,
  Button,
  message,
  Form
} from "antd";
import { useEffect, useState } from "react";
import { storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  CheckOutlined
} from "@ant-design/icons";
import { AiOutlineLink } from "react-icons/ai";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import { closeAddLink, closeLoading, closeViewEditDetails, openAddLink, openLoading } from "../../store/models/modelsSlice";
import { 
   postData } from "../../api/apiProviderService";
import { setAddress, setDiscode, setDiscodeLabel, setEmail, setGitHub, setGitHubLabel, setLinkedIn, setLinkedInLabel, setName, setPersonalData, setPhone, setProfilePicture, setTitle, setTwitter, setTwitterLabel, setWebsite, setWebsiteLabel } from "../../store/resume/resumeSclice";
const { Title, Text, Link } = Typography;
export default function EditPersonalDetails() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("USER_ID");
  const addLink = useSelector((state) => state.models.addLink);
  const personalData = useSelector((state)=>state.resume.personalData);
  const [imageUpload, setImageUpload] = useState(null);
  const [activeDetails, setActiveDetails] = useState([]);
  const [label, setLabel]= useState(null);
  const [active, setActive] = useState(0);
  const linksList = [ 
    {
      key: 1,
      label: "LinkedIn",
      icon: <LinkedinOutlined />,
      placeholder: "Enter LinkedIn",
    },
    {
      key: 2,
      label: "Twitter",
      icon: <LinkedinOutlined />,
      placeholder: "Enter LinkedIn",
    },
    {
      key: 3,
      label: "GitHub",
      icon: <LinkedinOutlined />,
      placeholder: "Enter Github",
    },
    {
      key: 4,
      label: "Website",
      icon: <LinkedinOutlined />,
      placeholder: "Enter Website",
    },
    {
      key: 5,
      label: "Discode",
      icon: <LinkedinOutlined />,
      placeholder: "Enter Discode",
    },
  ];

  const checkList = [
    {
      key:1,
      label: "linkedInLabel"
    },
    {
      key:2,
      label: "twitterLabel"
    },
    {
      key:3,
      label: "githubLabel"
    },
    {
      key:4,
      label: "websiteLabel"
    },
    {
      key:5,
      label: "discordLabel"
    },
  ]

  useEffect(() => {
    const existActiveList = [];
  
    checkList.forEach((item, index) => {
      // Use dynamic property access to check if personalData[item.label] is not null
      if (personalData[`${item.label}`] !== null) {
        const activeData = {
          key: item.key,
          label: null, // Replace this with the actual label logic
          icon: null, // Replace this with the actual icon logic
          placeholder: null, // Replace this with the actual placeholder logic
        };
  
        existActiveList.push(activeData);
      }
    });
  
    setActiveDetails(existActiveList);
  }, []);
  

  

  const handleFileChange = (info) => {
    setImageUpload(info.file.originFileObj);
    if (imageUpload) {
      info.file.status = "done";
      dispatch(setProfilePicture(URL.createObjectURL(imageUpload)));
    }
    console.log(info.file.originFileObj);
  };
  
  const uploadButton = (
    <div
      style={{
        marginTop: 8,
        borderRadius: "50%",
        backgroundColor: "rgba(243,244,246,255)",
      }}
    >
      Upload
    </div>
  );
  const handleChange =(id,value)=>{
      if(id===1){
        dispatch(setLinkedInLabel(value));
      }else if(id===2){
       dispatch( setTwitterLabel(value));
      }else if(id===3){
        dispatch(setGitHubLabel(value));
      }else if(id===4){
        dispatch(setWebsiteLabel(value));
      }else if(id===5){
        dispatch(setDiscodeLabel(value));
      }
  }

  const getValue = (id) =>{
    if(id===1){
     return  personalData.linkedInLabel;
    }else if(id===2){
      return  personalData.twitterLabel;
    }else if(id===3){
      return  personalData.githubLabel;
    }else if(id===4){
      return  personalData.websiteLabel;
    }else if(id===5){
      return  personalData.discodeLabel;
    }
  }
  const handleSubmit =async()=>{
    dispatch(openLoading());
    let temp = personalData.profilePicture;
    if (imageUpload) {
      const imageRef = ref(storage, `dps-cv-builder/profile-photos/${userId}`);
      await uploadBytes(imageRef, imageUpload)
        .then(() => {
          console.log(imageUpload);
        })
        .catch((error) => {
          console.log(error.message);
        });

      await getDownloadURL(imageRef)
        .then((url) => {
          temp = url;
          setProfilePicture(url);
          console.log(temp);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    let sendData ={
     name: personalData.name,
     profilePicture:temp,
     phone: personalData.phone,
     jobTitle: personalData.jobTitle,
     email: personalData.email,
     address: personalData.address,
     linkedInLabel:personalData.linkedInLabel,
     twitterLabel:personalData.twitterLabel,
     githubLabel:personalData.githubLabel,
     websiteLabel:personalData.websiteLabel,
     discordLabel:personalData.discodeLabel,
     linkedIn:personalData.linkedIn,
     twitter:personalData.twitter,
     github:personalData.github,
     website:personalData. website,
     discord:personalData.discode,
    }
    let data = {
      url: `resume/personal_data/${userId}`,
      data: sendData,
    };
    try {
      const response = await postData(data);
      if (response.status === 201) {
        dispatch(closeLoading());
        dispatch(closeViewEditDetails());
       // dispatch(setPersonalData(sendData));
        message.success("Successfully Updated");
      } else {
        dispatch(closeLoading());
        dispatch(closeViewEditDetails());
        message.error("Data is invalid! Try again!");
      }
    } catch (e) {
      dispatch(closeLoading());
      dispatch(closeViewEditDetails());
      console.log(e);
      message.error(e.message);
    }
  }

  const InputLink = ({id}) => {
    

    const getLinkValue =()=>{
      if(id===1){
        return personalData.linkedIn
    }else if(id===2){
        return personalData.twitter
    }else if(id===3){
      return personalData.github
    }else if(id===4){
      return personalData.website
    }else if(id===5){
      return personalData.discode
    }
    }

    const [linkValue, setLinkValue] = useState(getLinkValue(id));

 
    const setLinks =(e)=>{
      if(id===1){
        dispatch(setLinkedIn(e.target.value));
      }else if(id===2){
       dispatch( setTwitter(e.target.value));
      }else if(id===3){
        dispatch(setGitHub(e.target.value));
      }else if(id===4){
        dispatch(setWebsite(e.target.value));
      }else if(id===5){
        dispatch(setDiscode(e.target.value));
      }
  }

    const handleAdd =(id)=>{
      dispatch(closeAddLink());

        // if(id===1){
        //     dispatch(setLinkedIn(linkValue));
        //     setLinkValue("");
        //     dispatch(closeAddLink());
        // }else if(id===2){
        //     dispatch(setTwitter(linkValue));
        //     setLinkValue("");
        //     dispatch(closeAddLink());
        // }else if(id===3){
        //     dispatch(setGitHub(linkValue));
        //     setLinkValue("");
        //     dispatch(closeAddLink());
        // }else if(id===4){
        //     dispatch(setWebsite(linkValue));
        //     setLinkValue("");
        //     dispatch(closeAddLink());
        // }else if(id===5){
        //     dispatch(setDiscode(linkValue));
        //     setLinkValue("");
        //     dispatch(closeAddLink());
        // }else{
        //   dispatch(closeAddLink());
        // }
      }
     
    return (
     <Row style={{padding: '5%', position: 'absolute', backgroundColor: 'white', boxShadow:'0 0 20px rgba(0,0,0,.2)', zIndex: '5'}}>
        <Col span={24}>
            <Row gutter={[20,20]} justify='end'>
                <Col span={24}>
                    <Title level={5} style={{margin: '0'}}>
                        Link URL
                    </Title>
                </Col>
                <Col span={24}>
                    <Input 
                        onChange={setLinks}
                        value={getLinkValue()}
                        className="input-w" 
                        placeholder="Enter Link"/>
                </Col>
                <Col>
                    <Space>
                    <Button 
                        size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                        type="primary" 
                        style={{borderRadius: '0'}}
                        onClick={()=>dispatch(closeAddLink())}>
                            Cancel
                    </Button>
                    <Button 
                        onClick={()=>handleAdd(id)}
                        size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                        type="primary" 
                        style={{borderRadius: '0'}}>
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
      <Row className="edit-personal-details-w">
        <Col span={24}>
          <Form onFinish={handleSubmit}>
          <Card
            style={{
              boxShadow: "0 0 40px rgba(0,0,0,.1)",
              padding: "1% 2%",
              borderRadius: "15px",
            }}
            hoverable
          >
            <Row gutter={[20, 30]}>
              <Col span={24}>
                <Text
                  style={{ margin: 0, fontSize: "21px", fontWeight: "800" }}
                >
                  Edit Personal Details
                </Text>
              </Col>
              <Col span={16}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Full Name
                </Title>
                <Input
                  value={personalData.name}
                  onChange={(e)=>  dispatch(setName(e.target.value))}
                  className="input-w"
                  size="large"
                  placeholder="Enter your title, first-and lase name"
                />
              </Col>
              <Col span={8}>
                {personalData.profilePicture === null ? (
                  <>
                    <ImgCrop rotationSlider>
                      <Upload
                        style={{
                          marginTop: 8,
                          borderRadius: "50%",
                        }}
                        listType="picture-circle"
                        showUploadList={personalData.profilePicture === null ? true : false}
                        accept=".jpg,.jpeg,.png"
                        action=""
                        name="avatar"
                        onChange={handleFileChange}
                      >
                        {uploadButton}
                      </Upload>
                    </ImgCrop>
                    <Col
                      style={{ position: "absolute", bottom: 15, right: "30%" }}
                    >
                      <ImgCrop rotationSlider>
                        <Upload
                          showUploadList={
                            personalData.profilePicture === null ? true : false
                          }
                          onChange={handleFileChange}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              lineHeight: "18px",
                            }}
                          >
                            <CameraOutlined />
                          </span>
                        </Upload>
                      </ImgCrop>
                    </Col>
                  </>
                ) : (
                  <Row align="bottom">
                    <Col>
                      <Image
                        style={{
                          borderRadius: "50%",
                        }}
                        preview={false}
                        width={100}
                        height={100}
                        src={personalData.profilePicture}
                      />
                    </Col>
                    <Col
                     
                    >
                      <ImgCrop rotationSlider>
                        <Upload
                          showUploadList={
                            personalData.profilePicture === null ? true : false
                          }
                          onChange={handleFileChange}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              lineHeight: "18px",
                            }}
                          >
                            <CameraOutlined />
                          </span>
                        </Upload>
                      </ImgCrop>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col span={16}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Job Title{" "}
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
                  value={personalData.jobTitle}
                  onChange={(e)=>dispatch(setTitle(e.target.value))}
                  className="input-w"
                  size="large"
                  placeholder="Enter your job title"
                />
              </Col>
              <Col span={12}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Email{" "}
                  <Text
                    style={{
                      color: "rgba(0,0,0,.5)",
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                  >
                    recommended
                  </Text>
                </Title>
                <Input
                  value={personalData.email}
                  onChange={(e)=>dispatch(setEmail(e.target.value))}
                  className="input-w"
                  size="large"
                  placeholder="Enter your email"
                />
              </Col>
              <Col span={12}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Phone{" "}
                  <Text
                    style={{
                      color: "rgba(0,0,0,.5)",
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                  >
                    recommended
                  </Text>
                </Title>
                <Input
                  value={personalData.phone}
                  onChange={(e)=>dispatch(setPhone(e.target.value))}
                  className="input-w"
                  size="large"
                  placeholder="Enter your phone"
                />
              </Col>
              <Col span={24}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Address{" "}
                  <Text
                    style={{
                      color: "rgba(0,0,0,.5)",
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                  >
                    recommended
                  </Text>
                </Title>
                <Input
                  value={personalData.address}
                  onChange={(e)=>dispatch(setAddress(e.target.value))}
                  className="input-w"
                  size="large"
                  placeholder="City, Country"
                />
              </Col>
              <Col span={24}>
                <Text
                  style={{ margin: 0, fontSize: "22px", fontWeight: "800" }}
                >
                  Links
                </Text>
              </Col>
              <Col span={24}>
                <Row gutter={[25, 25]}>
                  <Col span={24}>
                    <Row align="middle" gutter={[0, 20]}>
                    
                      {activeDetails.map((items) => {
                        return (
                          <Col span={24}>
                            <Row gutter={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
                              <Col span={18}>
                                <Input
                                  value={getValue(items.key)}
                                  onChange={(e)=>{handleChange(items.key,e.target.value)}}
                                  className="input-w"
                                  placeholder={items.label}
                                />
                              </Col>
                              {(addLink && active === items.key) && <InputLink id={items.key}/>}
                              <Col span={6}>
                                <Space>
                                  <Button
                                    onClick={() => {
                                        dispatch(openAddLink());
                                        setActive(items.key);
                                    }}
                                    size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                                    icon={<AiOutlineLink />}
                                  >
                                    Link
                                  </Button>
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                      padding: " 5px",
                                      backgroundColor: "rgba(255,0,0,.1)",
                                      borderRadius: "6px",
                                    }}
                                    onClick={() => {
                                      setActiveDetails((prevArray) =>
                                        prevArray.filter(
                                          (item) => item !== items
                                        )
                                      );
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </span>
                                </Space>
                              </Col>
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>

                  {linksList.map((item) => {
                    return (
                      <Col key={item.key}>
                        <span
                          onClick={() =>
                            {
                              if(!activeDetails.some((activeItem) => activeItem.key === item.key)){
                                setActiveDetails([...activeDetails, item])
                              }                    
                            }
                          }
                          style={{ backgroundColor: "rgba(243,244,246,255)" }}
                        >
                          +{item.label}
                        </span>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col span={24}>
                <Row justify='end'> 
                  <Button 
                  onClick={()=>dispatch(closeViewEditDetails())}
                  size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                  style={{border: '0'}}>
                  Cancel
                </Button>
                <Button 
                  type="primary"
                  htmlType="submit"
                  icon={<CheckOutlined />}
                  size={{ xs: 'small', sm: 'small', md: 'middle', lg: 'large', xl: 'large', xxl: 'large' }}       
                  style={{
                    color: 'white',
                    }}> 
                  Save
                </Button>
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