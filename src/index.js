import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgba(255, 116, 0, 1)",
            colorBgContainer: 'F9F9FD',
            colorBgTextHover: 'rgba(30,136,229,.1)',
            colorBgTextActive: 'rgba(30,136,229,1)',
            // colorBgTextActive:"rgb(30,136,229)",
          },}}
        >
      <App />
      </ConfigProvider>
  </React.StrictMode>
);



