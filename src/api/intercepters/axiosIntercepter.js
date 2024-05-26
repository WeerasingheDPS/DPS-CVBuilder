import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = "http://13.201.84.195:8090/";


// Function to refresh the token. Replace this with your actual token refresh logic.
const refreshToken = async () => {
  // Implement your token refresh logic here
  // Example:
  try {
    const response = await axios.post('auth/refresh_token', { refreshToken: localStorage.getItem("REFRESH_TOKEN") });
    return response.data.result;
  } catch (error) {
    // Handle token refresh failure, for example, by logging the user out
    logout();
    throw error;
  }
};

// Function to log out the user. Replace this with your actual logout logic.
const logout = () => {
  // Implement your logout logic here
  // Example:
  localStorage.clear();
  // Redirect to the login page or perform any other necessary actions
};

let isRefreshing = false;

// Axios request interceptor
axios.interceptors.request.use(
  async (config) => {
    // Check if the access token exists and is not expired
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    if (accessToken) {
      const accessTokenData = jwtDecode(accessToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (accessTokenData.exp < currentTimestamp) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // Access token is expired, refresh it
            const newAccessToken = await refreshToken(); // Implement refreshToken function
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            localStorage.setItem('ACCESS_TOKEN', newAccessToken);
          } catch (error) {
            // Handle error refreshing token (e.g., redirect to login)
            console.error('Error refreshing token:', error);
            // You may want to redirect to the login page or handle the error in some way
          } finally {
            isRefreshing = false;
          }
        }
      } else {
        // Access token is still valid, use it
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
