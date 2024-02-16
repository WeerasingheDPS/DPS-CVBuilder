import { jwtDecode } from "jwt-decode";

const refreshToken = localStorage.getItem('REFRESH_TOKEN');
let isRefreshing = false;

export const isRefreshTokenExpired=() =>{
    if (refreshToken) {
        const decodeRefreshToken = jwtDecode(refreshToken);
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        if (decodeRefreshToken.exp < currentTimestamp) {
          if (!isRefreshing) {
            isRefreshing = true;
            return true;
          }
        }
      }
}