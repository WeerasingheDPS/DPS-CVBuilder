import axios from "axios";
import { storage } from "./firebase";


export const userRegister = (authRequest) => {
  return axios.post("api/v1/auth/register", authRequest);
};

export const userLogin = (authRequest) => {
  return axios.post("api/v1/auth/login", authRequest);
};

export const userChangePassword = (change) => {
  return axios.post(`auth/change_password/${localStorage.getItem("USER_ID")}`, change);
};

export const updateProfileData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data);
  }
}

export const getData = (url) => {
  return axios.get(url)
};

export const postData = (authRequest) => {
  return axios.post(`${authRequest.url}`, authRequest.data)
};

export const processDownloadResume = (authRequest) => {
  return axios.post(`${authRequest.url}`, authRequest.data)
};

export const LogIn = (authRequest) => {
  return axios.post(`${authRequest.url}`, authRequest.data)
};

export const updateData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data);
  }
}


export const getAction = (url, data) => {
  return axios.post(`${url}`, data)
};


export const fetchUserData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data);
  } else if (authRequest.method === "put") {
    return axios.put(authRequest.url, authRequest.data);
  } else if (authRequest.method === "get") {
    return axios.get(authRequest.url, authRequest.data);
  }
  else if (authRequest.method === "delete") {
    return axios.delete(authRequest.url);
  }
};


export const downloadPdfFromFireBase = async(downUrl) =>{
  try {
  
    const fileRef = storage.refFromURL(downUrl); 
    const downloadURL = await fileRef.getDownloadURL();
    const response = await fetch(downloadURL);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'document.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error downloading PDF: ', error);
  }
}

