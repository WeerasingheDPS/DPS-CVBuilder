import axios from "axios";

export const getToken = () => {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkcHN3ZWVyYXNpbmdoZUBnbWFpbC5jb20iLCJpYXQiOjE3MDU1MDUwNzMsImV4cCI6MTcwNjU0NDMwMn0.tDhMW60c7z-etqOe5WPsDcgfwwD3aTcrdbI0qpPEliE";
};

export const userRegister = (authRequest) => {
  return axios.post("api/v1/auth/register", authRequest);
};

export const userLogin = (authRequest) => {
  return axios.post("api/v1/auth/login", authRequest);
};

export const userChangePassword = (change) => {
  return axios.put("api/v1/systemUser/changePassword", change, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const updateProfileData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  }
}

export const getData = (url) => {
  return axios.get(url, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  })
};

export const postData = (authRequest) => {
  return axios.post(`${authRequest.url}`, authRequest.data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  })
};

export const updateData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  }
}


export const getAction = (url, data) => {
  return axios.post(`${url}`, data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  })
};


export const fetchUserData = (authRequest) => {
  if (authRequest.method === "post") {
    return axios.post(`${authRequest.url}`, authRequest.data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  } else if (authRequest.method === "put") {
    return axios.put(authRequest.url, authRequest.data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  } else if (authRequest.method === "get") {
    return axios.get(authRequest.url, authRequest.data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  }
  else if (authRequest.method === "delete") {
    return axios.delete(authRequest.url, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  }
};
