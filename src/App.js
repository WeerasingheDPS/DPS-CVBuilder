import "./assests/styles/main.scss";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "./pages/layouts/MainLayout";
import ViewResume from "./components/resume/ViewResume";
import ShowResumePage from "./pages/resume/ShowResumePage";
import Login from "./pages/Login";
import LandingLayout from "./pages/layouts/LandingLayout";
import SignUp from "./pages/SignUp";
import ResumeViewPage from "./pages/resume/ResumeViewPage";
import ChangePassword from "./pages/ChangePassword";
import ResumeFullPage from "./pages/resume/ResumeFullPage";
import { isRefreshTokenExpired } from "./api/config/checkToken";
import { useEffect } from "react";


function App() {

  const isLogin = localStorage.getItem("IS_LOGGED_IN") === null ? false : localStorage.getItem("IS_LOGGED_IN");

  useEffect(() => {
    if(isRefreshTokenExpired()){
      localStorage.clear();
    }

  }, []);

  return (
   <>
   <BrowserRouter>
    
      <Routes>
      {isLogin &&
        <Route path="/"  element={<MainLayout/>} >
          <Route path="/resume" element={<ShowResumePage/>}/>
          <Route path="/createresume" element={<ViewResume/>}/>
          <Route path="/viewresume" element={<ViewResume/>}/>
          <Route path="/viewresumepage" element={<ResumeFullPage/>}/>
          <Route path="/changepassword" element={<ChangePassword/>}/>
        </Route>
        }

        {!isLogin && <>
          <Route path="/"   element={<LandingLayout/>}>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
        </Route>
        <Route>   
        </Route>
        </>
        
        }
        
      </Routes>
    </BrowserRouter>  
   </>
  );
}

export default App;
