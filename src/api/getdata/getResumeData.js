import { useDispatch } from "react-redux";
import { getData } from "../apiProviderService";
import { closeLoading, openLoading } from "../../store/models/modelsSlice";
import { setHasCv, setMainContents, setPersonalData } from "../../store/resume/resumeSclice";

export default async function GetResumeData (dispatch)  {
    dispatch(openLoading());
    const userId = localStorage.getItem("USER_ID");
    let url = `resume/${userId}` 
    try {
      const response = await getData(url);
      if (response.data.success && response.data.result != null) {
        console.log(response.data)
        dispatch(closeLoading());
        if(response.data.result.mainContents !== null){
          dispatch(setMainContents(response.data.result.mainContents));
        }
        if(response.data.result.personalData !== null){
          dispatch(setPersonalData(response.data.result.personalData));
        }
        dispatch(setHasCv((response.data.result.mainContents != null || response.data.result.personalData != null) ? true : false));
        if(response.data.result.mainContents != null || response.data.result.personalData != null){
          localStorage.setItem("HAS_RESUME", true);
        }
      }else {
        dispatch(closeLoading());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(closeLoading());
    }
  };