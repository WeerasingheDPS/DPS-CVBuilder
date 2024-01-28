import { jwtDecode } from "jwt-decode";

const isRefreshTokenExpired = () => {
    const refreshToken = localStorage.getItem('ACCESS_TOKEN');
  
    if (refreshToken) {
      const refreshTokenData = jwtDecode(refreshToken); 
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      return refreshTokenData.exp < currentTimestamp;
    }
      return true;
  };
  
  export default isRefreshTokenExpired;
  