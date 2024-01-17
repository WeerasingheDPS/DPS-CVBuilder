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


function App() {

  const isLogin = true;
  return (
   <>
   <BrowserRouter>
    
      <Routes>
      {isLogin &&
        <Route path="/"  element={<MainLayout/>} >
          <Route path="/resume" element={<ShowResumePage/>}/>
          <Route path="/createresume" element={<ViewResume/>}/>
          <Route path="/viewresume" element={<ViewResume/>}/>
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
